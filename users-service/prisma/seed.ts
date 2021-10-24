import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();
async function main() {
  await prisma.user.create({
    data: {
      email: "mateuszpiorowski@gmail.com",
      password: bcryptjs.hashSync("pass"),
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
