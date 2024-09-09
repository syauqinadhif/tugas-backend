const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Seeder untuk user
  const user1 = await prisma.user.create({
    data: {
      username: "admin_user",
      email: "admin@example.com",
      password: "password123", // Pastikan ini dienkripsi jika password asli
      role: "ADMIN",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: "normal_user",
      email: "user@example.com",
      password: "password123", // Pastikan ini dienkripsi jika password asli
      role: "USER",
    },
  });

  // Seeder untuk item
  const item1 = await prisma.item.create({
    data: {
      name: "Item 1",
      description: "Description of Item 1",
      quantity: 10,
    },
  });

  const item2 = await prisma.item.create({
    data: {
      name: "Item 2",
      description: "Description of Item 2",
      quantity: 20,
    },
  });

  // Seeder untuk transaksi
  await prisma.transaction.create({
    data: {
      userId: user1.id,
      itemId: item1.id,
      quantityBorrowed: 1,
      status: "BORROWED",
    },
  });

  await prisma.transaction.create({
    data: {
      userId: user2.id,
      itemId: item2.id,
      quantityBorrowed: 2,
      status: "PENDING",
    },
  });

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
