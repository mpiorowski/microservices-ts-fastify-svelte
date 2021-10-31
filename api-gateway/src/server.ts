import { FastifyReply } from "fastify";
import cookie, { FastifyCookieOptions } from "fastify-cookie";
import { FastifyRequest } from "fastify/types/request";
import mercurius from "mercurius";
import { UserSession } from "./@types/Users";
import { loaders } from "./loaders";
import { resolvers } from "./resolvers";
import { schema } from "./schema";

console.log("api gateway says hi");
require("dotenv").config();
export const CONFIG = {
  PORT: process.env["PORT"],
  USERS_SERVICE_URI: process.env["USERS_SERVICE_URI"] as string,
};

declare module "fastify" {
  interface FastifyRequest {
    userSession: UserSession;
  }
}

// fastify setup
const app = require("fastify")({ logger: true });
app.register(cookie, {
  secret: "my-secret", // for cookies signature
  parseOptions: {}, // options for parsing cookies
} as FastifyCookieOptions);
app.register(require("fastify-cors"), {
  // put your options here
});

// error handler
app.setErrorHandler(function (
  error: unknown,
  _request: FastifyRequest,
  reply: FastifyReply
) {
  app.log.error(error);
  reply.status(400).send("Something went wrong");
});

export type Context = {
  request: FastifyRequest;
  reply: FastifyReply;
  userSession: UserSession;
};

app.register(mercurius, {
  schema,
  resolvers,
  loaders,
  graphiql: true,
  context: (request: FastifyRequest, reply: FastifyReply) => {
    return {
      request: request,
      reply: reply,
      userSession: request.userSession,
    };
  },
});

app.get("/", (_request: FastifyRequest, reply: FastifyReply) => {
  reply.send({ hello: "world" });
});

// Run the server!
const start = async () => {
  try {
    await app.listen(CONFIG.PORT, "0.0.0.0");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
