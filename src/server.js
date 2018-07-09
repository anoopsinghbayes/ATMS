import express from "express";
import { schemaComposer } from "graphql-compose";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { GraphQLSchema } from "graphql";
import bodyParser from "body-parser";
import cors from "cors";
import { createServer } from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { printSchema } from "graphql/utilities/schemaPrinter";
import mongoose from "mongoose";
import { tenantGqlSchemas } from "./connection";
const GRAPHQL_PORT = 8080;
const WS_PORT = 8090;
const graphQLServer = express().use("*", cors());
const DB_USER_NAME = "admin";
const DB_PASSWORD = "admin";
const return_tenant = () => {
  const ramdom = Math.floor(Math.random() * 2) + 1;
  console.log("DB name", ramdom);
  return ramdom;
};
graphQLServer.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress(req => ({
    schema: tenantGqlSchemas[`t${return_tenant()}`],
    graphiql: process.env.NODE_ENV !== "production",
    pretty: process.env.NODE_ENV !== "production"
  }))
);
graphQLServer.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
);
graphQLServer.use("/schema", (req, res) => {
  res.set("Content-Type", "text/plain");
  res.send(printSchema(tenantGqlSchemas[`t${return_tenant()}`]));
});

graphQLServer.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
  )
);

// WebSocket server for subscriptions
const websocketServer = createServer((request, response) => {
  response.writeHead(404);
  response.end();
});

websocketServer.listen(WS_PORT, () =>
  console.log(
    // eslint-disable-line no-console
    `Websocket Server is now running on http://localhost:${WS_PORT}`
  )
);

// eslint-disable-next-line
// new SubscriptionServer({ subscriptionManager }, websocketServer);
