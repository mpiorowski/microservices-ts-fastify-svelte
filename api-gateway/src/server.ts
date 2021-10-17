import { FastifyReply } from "fastify";
import cookie, { FastifyCookieOptions } from "fastify-cookie";
import { FastifyRequest } from "fastify/types/request";
import mercurius from "mercurius";
import { UserSession } from "./@types/Users";
import { loaders } from "./loaders";
import { resolvers } from "./resolvers";
import { schema } from "./schema";
import { getSession } from "./sessions/api";

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

app.addHook(
  "onRequest",
  async (request: FastifyRequest, reply: FastifyReply) => {
    console.dir("onRequest");
    try {
      if ("sessionId" in request.cookies && request.cookies["sessionId"]) {
        const userSession = await getSession(request.cookies["sessionId"]);
        if (userSession.id) {
          return (request.userSession = userSession);
        }
      }
      throw Error();
    } catch (error: unknown) {
      app.log.error(error);
      return reply.status(401).send({ message: "Not logged in" });
    }
  }
);

// error handler
app.setErrorHandler(function (
  error: unknown,
  _request: FastifyRequest,
  reply: FastifyReply
) {
  app.log.error(error);
  reply.send("Something went wrong");
});

app.register(mercurius, {
  schema,
  resolvers,
  loaders,
  graphiql: true,
  context: (request: FastifyRequest, _reply: FastifyReply) => {
    // Return an object that will be available in your GraphQL resolvers
    return {
      userSession: request.userSession,
    };
  },
});

// function fastifyAppClosePlugin(app: FastifyInstance) {
//   return {
//     async serverWillStart() {
//       return {
//         async drainServer() {
//           await app.close();
//         },
//       };
//     },
//   };
// }

// // apollo server
// const apolloServer = new ApolloServer({
//   typeDefs: schema,
//   resolvers,
//   plugins: [
//     fastifyAppClosePlugin(app),
//     ApolloServerPluginDrainHttpServer({ httpServer: app.server }),
//   ],
// });

// Run the server!
const start = async () => {
  try {
    // await apolloServer.start();
    // app.register(apolloServer.createHandler());
    await app.listen(CONFIG.PORT, "0.0.0.0");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
