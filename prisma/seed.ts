import {
  Role,
  UserStatus,
  PLAN_STATUS,
  Difficulty,
  TRANSACTION_STATUS,
  PAYMENT_TYPE,
  REGISTRATION_STATUS,
} from "@prisma/client"
import { prisma } from "@/lib/prisma"

/* ----------------------- */
/* SIMPLE RANDOM HELPERS   */
/* ----------------------- */

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const randomFloat = (min: number, max: number) =>
  Math.random() * (max - min) + min

const randomItem = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)]

const uuid = () => crypto.randomUUID()

const randomName = (i: number) => `User_${i}`
const randomEmail = (i: number) => `user${i}@example.com`

const countries = ["India", "USA", "UK", "Germany", "Canada"]
const difficulties = Object.values(Difficulty)
const paymentTypes = Object.values(PAYMENT_TYPE)

/* ----------------------- */
/* MAIN SEED FUNCTION      */
/* ----------------------- */

async function main() {
  console.log("🌱 Seeding started...")

  /* ---------------- USERS (220) ---------------- */

  const users = []

  for (let i = 1; i <= 220; i++) {
    users.push({
      id: uuid(),
      name: randomName(i),
      email: randomEmail(i),
      password: "$2b$10$hashedpasswordexample",
      role: i === 1 ? Role.ADMIN : Role.USER,
      status: UserStatus.ACTIVE,
      gender: i % 2 === 0 ? "Male" : "Female",
      username: `username_${i}`,
      phone: `90000000${i}`,
      country: randomItem(countries),
      age: randomInt(18, 40),
      isProfileComplete: true,
    })
  }

  await prisma.user.createMany({ data: users })

  /* ---------------- WALLETS ---------------- */

  await prisma.wallet.createMany({
    data: users.map((u) => ({
      userId: u.id,
      balance: randomInt(100, 10000),
    })),
  })

  const wallets = await prisma.wallet.findMany()

  /* ---------------- PLANS (25) ---------------- */

  const plans = []

  for (let i = 1; i <= 25; i++) {
    plans.push({
      title: `Plan ${i}`,
      description: `This is description for Plan ${i}`,
      tokens: randomInt(100, 5000),
      price: randomInt(99, 1999),
      status: PLAN_STATUS.ACTIVATED,
    })
  }

  await prisma.plan.createMany({ data: plans })

  /* ---------------- CATEGORIES (30) ---------------- */

  // const categories = []

  // for (let i = 1; i <= 30; i++) {
  //   categories.push({
  //     id: uuid(),
  //     name: `Category_${i}`,
  //     image: `https://picsum.photos/200?random=${i}`,
  //   })
  // }

  // await prisma.category.createMany({ data: categories })

  /* ---------------- SUBCATEGORIES (35) ---------------- */

  // const subCategories = []

  // for (let i = 1; i <= 35; i++) {
  //   subCategories.push({
  //     id: uuid(),
  //     name: `SubCategory_${i}`,
  //     categoryId: randomItem(categories).id,
  //   })
  // }

  // await prisma.subCategory.createMany({ data: subCategories })

  /* ---------------- TOURNAMENTS (220) ---------------- */

  // const tournaments = []

  // for (let i = 1; i <= 220; i++) {
  //   const start = new Date(Date.now() + randomInt(1, 10) * 86400000)
  //   const window = new Date(start.getTime() + 3600000)
  //   const end = new Date(window.getTime() + 7200000)

  //   tournaments.push({
  //     id: uuid(),
  //     title: `Tournament_${i}`,
  //     description: `This is tournament number ${i}`,
  //     categoryId: randomItem(categories).id,
  //     subCategoryId: randomItem(subCategories).id,
  //     startTime: start,
  //     windowOpenTime: window,
  //     endTime: end,
  //     durationPerQ: randomInt(10, 60),
  //     totalQuestions: randomInt(20, 40),
  //     difficulty: randomItem(difficulties),
  //     totalSeats: randomInt(50, 300),
  //     winningSeats: randomInt(5, 20),
  //     entryFee: randomFloat(10, 100),
  //     prizePool: randomFloat(500, 5000),
  //   })
  // }

  // await prisma.tournament.createMany({ data: tournaments })

  /* ---------------- QUESTIONS + OPTIONS ---------------- */

  // for (const tournament of tournaments) {
  //   const questionCount = randomInt(20, 40)

  //   for (let i = 1; i <= questionCount; i++) {
  //     const question = await prisma.question.create({
  //       data: {
  //         tournamentId: tournament.id,
  //         text: `Question ${i} for ${tournament.title}`,
  //       },
  //     })

  //     const correctIndex = randomInt(0, 3)

  //     await prisma.option.createMany({
  //       data: Array.from({ length: 4 }).map((_, idx) => ({
  //         questionId: question.id,
  //         text: `Option ${idx + 1}`,
  //         isCorrect: idx === correctIndex,
  //       })),
  //     })
  //   }
  // }

  /* ---------------- REGISTRATIONS ---------------- */

  // for (const tournament of tournaments) {
  //   const participantCount = randomInt(20, 40)
  //   const selectedUsers = users.slice(0, participantCount)

  //   await prisma.registration.createMany({
  //     data: selectedUsers.map((user) => ({
  //       userId: user.id,
  //       tournamentId: tournament.id,
  //       score: randomInt(0, 100),
  //       totalTime: randomFloat(30, 600),
  //       prize: randomInt(0, 1000),
  //       hasPaid: true,
  //       status: REGISTRATION_STATUS.PLAYED,
  //     })),
  //     skipDuplicates: true,
  //   })
  // }

  /* ---------------- TRANSACTIONS + TOKEN HISTORY ---------------- */

  for (const wallet of wallets) {
    await prisma.transactionHistory.createMany({
      data: Array.from({ length: 5 }).map(() => ({
        walletId: wallet.id,
        paymentId: uuid(),
        amount: randomFloat(50, 500),
        tokens: randomInt(50, 500),
        status: TRANSACTION_STATUS.DONE,
        type: randomItem(paymentTypes),
      })),
    })

    await prisma.tokenHistory.createMany({
      data: Array.from({ length: 5 }).map(() => ({
        walletId: wallet.id,
        amount: randomInt(10, 200),
        type: "DEPOSIT",
        description: "Initial token deposit",
      })),
    })
  }

  console.log("✅ Seeding completed successfully")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })