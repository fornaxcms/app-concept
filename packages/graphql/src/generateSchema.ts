import { GraphQLSchema } from "graphql";
import { schemaComposer } from "graphql-compose";
import { filter, find } from "lodash";

// Requests which read data put into Query
schemaComposer.Query.addFields({
  helloWorld: {
    type: "String",
    resolve: () => "Hello World",
  },
});

// After Root type definition, you are ready to build Schema
// which should be passed to `express-graphql` or `apollo-server`
export const schema = schemaComposer.buildSchema() as unknown as GraphQLSchema;
