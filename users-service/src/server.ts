console.log("users service says hi");

import { FastifyReply, FastifyRequest } from "fastify";
import userSessionsRoutes from "./user-sessions";
import usersRoutes from "./users";

export const CONFIG = {
  PORT: process.env["PORT"],
};

// fastify setup
const server = require("fastify")({ logger: true });
server.register(require("fastify-cors"), {
  credentials: true,
});

// error handler
server.setErrorHandler(function (
  error: unknown,
  _request: FastifyRequest,
  reply: FastifyReply
) {
  // Log error
  server.log.error(error);
  // Send error response
  reply.status(409).send(error);
});

// Declare routes
usersRoutes(server);
userSessionsRoutes(server);

// Run the server!
const start = async () => {
  try {
    await server.listen(CONFIG.PORT, "0.0.0.0");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();