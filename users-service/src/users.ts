import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export default function usersRoutes(server: FastifyInstance): void {
  server.get(
    "/users",
    async (_request: FastifyRequest, _reply: FastifyReply) => {
      const prisma = new PrismaClient();
      const allUsers = await prisma.user.findMany();
      await prisma.$disconnect();
      return allUsers;
    }
  );

  server.post(
    "/users",
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
    async (request: FastifyRequest, reply: FastifyReply) => {
      const body = request.body as {
        username: string;
        email: string;
        password: string;
      };
      const prisma = new PrismaClient();
      const newUser = await prisma.user.create({
        data: {
          email: body.email,
          password: bcryptjs.hashSync(body.password),
        },
      });
      await prisma.$disconnect();
      return reply.send({ ...newUser, password: undefined });
    }
  );
}
