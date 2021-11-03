import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { helperPasswordCompare } from "../helpers/passwordCompareSync";

export default function userSessionsRoutes(server: FastifyInstance): void {
  const userSessionExpireInHours = process.env["USER_SESSION_EXPIRE_IN_HOURS"];

  server.get(
    "/sessions/:sessionId",
    async (request: FastifyRequest, _reply: FastifyReply) => {
      const params = request.params as { sessionId: string };
      const prisma = new PrismaClient();
      const userSession = await prisma.userSession.findUnique({
        where: { id: params.sessionId },
      });

      if (!userSession?.expiredAt) {
        throw Error("User session not found");
      }

      if (userSession?.expiredAt < new Date()) {
        throw Error("User session expired");
      }

      await prisma.$disconnect();
      return userSession;
    }
  );

  server.post(
    "/sessions",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            email: { type: "string", minLength: 1, maxLength: 1000 },
            password: { type: "string", minLength: 1, maxLength: 1000 },
          },
          required: ["email", "password"],
        },
      },
    },
    async (request: FastifyRequest, _reply: FastifyReply) => {
      const body = request.body as { email: string; password: string };
      const prisma = new PrismaClient();
      const user = await prisma.user.findUnique({
        where: { email: body.email },
      });

      if (!user) {
        throw Error("User not found");
      }
      if (!helperPasswordCompare(body.password, user.password)) {
        throw Error("Wrong password");
      }

      const userSession = await prisma.userSession.create({
        data: {
          userId: user.id,
          expiredAt: dayjs()
            .add(Number(userSessionExpireInHours), "hours")
            .toISOString(),
        },
      });

      await prisma.$disconnect();
      return userSession;
    }
  );

  server.delete(
    "/sessions/:sessionId",
    async (request: FastifyRequest, _reply: FastifyReply) => {
      const params = request.params as { sessionId: string };
      const prisma = new PrismaClient();
      await prisma.userSession.delete({
        where: { id: params.sessionId },
      });

      await prisma.$disconnect();
      return { ok: true };
    }
  );
}
