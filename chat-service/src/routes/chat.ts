import { PrismaClient } from "@prisma/client";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export default function chatRoutes(server: FastifyInstance): void {
  server.get(
    "/chat",
    async (request: FastifyRequest, _reply: FastifyReply) => {
      const query = request.query as { userId: string };
      const prisma = new PrismaClient();
      const chat = await prisma.chat.findMany({
        where: { userId: query.userId },
      });
      await prisma.$disconnect();
      return chat;
    }
  );

  server.get(
    "/chat/:chatId",
    async (request: FastifyRequest, _reply: FastifyReply) => {
      const params = request.params as { chatId: string };
      const prisma = new PrismaClient();
      const chat = await prisma.chat.findUnique({
        where: { id: params.chatId },
      });
      await prisma.$disconnect();
      return chat;
    }
  );

  server.post(
    "/chat",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            userId: { type: "string", minLength: 1, maxLength: 1000 },
            message: { type: "string", minLength: 1, maxLength: 1000 },
          },
          required: ["message", "userId"],
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const body = request.body as {
        userId: string;
        message: string;
      };
      const prisma = new PrismaClient();
      const newChat = await prisma.chat.create({
        data: {
          userId: body.userId,
          message: body.message,
        },
      });
      await prisma.$disconnect();
      return reply.send(newChat);
    }
  );
}
