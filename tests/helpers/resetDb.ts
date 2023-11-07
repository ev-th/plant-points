import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const resetDb = async () => {
  await prisma.$transaction([
    prisma.meal.deleteMany(),
    prisma.user.deleteMany(),
    prisma.ingredient.deleteMany(),
  ]);
};

export default resetDb;
