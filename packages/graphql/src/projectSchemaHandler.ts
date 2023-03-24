import { schemaComposer } from "graphql-compose";
import composeWithJson from "graphql-compose-json";
import { GraphQLSchema } from "graphql-compose/lib/graphql";
import { Project, prisma } from "@acme/db";

export const projectSchemaHandler = async (): Promise<GraphQLSchema> => {
  schemaComposer.Query.addFields({
    helloWorld: {
      type: "String",
      resolve: () => "Hello World",
    },
  });

  const schema = schemaComposer.buildSchema() as unknown as GraphQLSchema;
  return schema;
};
