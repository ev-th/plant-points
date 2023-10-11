import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const resetDb =  async () => {
  await prisma.$transaction([
    prisma.user.deleteMany(),
    prisma.meal.deleteMany(),
    prisma.ingredient.deleteMany()
  ])
}

export default resetDb