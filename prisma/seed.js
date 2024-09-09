const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

async function main() {
    const item1 = await prisma.item.create({
        data: {
          name: "Backend Book",
          description: "A book for learning backend development",
          quantity: 10,
        },
      });
    
    const item2 = await prisma.item.create({
        data: {
          name: "Frontend Book",
          description: "A book for learning frontend development",
          quantity: 10,
        },
      });
    

      console.log(item1, item2);
      
  }
  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })