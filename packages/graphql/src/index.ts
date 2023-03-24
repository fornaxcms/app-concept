import { createServer } from "http";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { prisma } from "@acme/db";

import { projectSchemaHandler } from "./projectSchemaHandler";

const main = async () => {
  const PORT = 4000;
  const app = express();
  const httpServer = createServer(app);

  app.set("trust proxy", 1);

  app.use(
    cors({
      credentials: true,
      origin: ["*"],
    }),
  );

  app.use(cookieParser());

  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  //   app.use("/:projectId/graphql");

  const server = new ApolloServer({
    schema: await projectSchemaHandler(),
    csrfPrevention: true,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  });

  await server.start();

  server.applyMiddleware({ app, cors: false });

  httpServer.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}/`);
  });
};

main();
