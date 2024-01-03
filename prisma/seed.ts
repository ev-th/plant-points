const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const ingredientData = require("./ingredients.json");

async function main() {
  const ingredients = await prisma.ingredient.createMany({
    data: ingredientData,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// Use `npx prisma db seed` to seed the database
