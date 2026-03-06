import {  Difficulty } from "@prisma/client";
import {prisma} from "@/lib/prisma";
function getRandomDifficulty(): Difficulty {
  const difficulties = [
    Difficulty.EASY,
    Difficulty.MEDIUM,
    Difficulty.HARD,
  ];
  return difficulties[Math.floor(Math.random() * difficulties.length)];
}

async function main() {
  console.log("🌱 Seeding database...");

  // Optional clean (dev only)
  // await prisma.option.deleteMany();
  // await prisma.question.deleteMany();
  // await prisma.tournament.deleteMany();
  // await prisma.subCategory.deleteMany();
  // await prisma.category.deleteMany();

  // 1️⃣ Create Category
  const category = await prisma.category.create({
    data: {
      name: "General Knowledge",
    },
  });

  // 2️⃣ Create SubCategory
  const subCategory = await prisma.subCategory.create({
    data: {
      name: "Mixed Trivia",
      categoryId: category.id,
    },
  });

  // 3️⃣ Create 15 Tournaments
  for (let i = 1; i <= 15; i++) {
    const startTime = new Date(Date.now() + i * 60 * 60 * 1000);
    const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 10000);

    const tournament = await prisma.tournament.create({
      data: {
        title: `Trivia Tournament ${i}`,
        description: `Exciting trivia challenge number ${i}`,
        categoryId: category.id,
        subCategoryId: subCategory.id,
        startTime,
        windowOpenTime: new Date(),
        endTime,
        durationPerQ: 30,
        totalQuestions: 5,
        difficulty: getRandomDifficulty(),
        totalSeats: 100 + i * 10,
        winningSeats: 10,
        entryFee: 5 + i,
        prizePool: 500 + i * 100,
        language: "ENGLISH",
      },
    });

    // 4️⃣ Add 5 Questions per Tournament
    for (let q = 1; q <= 5; q++) {
      await prisma.question.create({
        data: {
          tournamentId: tournament.id,
          text: `Question ${q} for Tournament ${i}?`,
          options: {
            create: [
              { text: "Option A", isCorrect: q % 4 === 0 },
              { text: "Option B", isCorrect: q % 4 === 1 },
              { text: "Option C", isCorrect: q % 4 === 2 },
              { text: "Option D", isCorrect: q % 4 === 3 },
            ],
          },
        },
      });
    }

    console.log(`✅ Tournament ${i} created`);
  }

  console.log("🎉 Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });