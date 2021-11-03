console.log("users service says hi");

import { FastifyReply, FastifyRequest } from "fastify";
import userSessionsRoutes from "./routes/user-sessions";
import usersRoutes from "./routes/users";

require("dotenv").config();
export const CONFIG = {
  PORT: process.env["PORT"],
};

// fastify setup
const app = require("fastify")({ logger: true });
app.register(require("fastify-cors"), {
  credentials: true,
});

// error handler
app.setErrorHandler(async function (
  error: { message: string },
  _request: FastifyRequest,
  reply: FastifyReply
) {
  // Log error
  app.log.error(error);
  // Send error response
  await reply.status(409).send(error.message);
});

// Declare routes
usersRoutes(app);
userSessionsRoutes(app);

// Run the app!
const start = async () => {
  try {
    await app.listen(CONFIG.PORT, "0.0.0.0");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
