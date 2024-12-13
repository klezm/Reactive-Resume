import { PrismaClient, Provider } from '@prisma/client'

// https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding

const prisma = new PrismaClient()

async function main() {
  const dummyu = await prisma.user.upsert({
    where: { username: 'un' },
    update: {},
    create: {
      email: 'dummy@dummy.com',
      username: 'un',
      name: 'Dummy',
      secrets: {
        create: {
            password: 'asdasd'
        },
      },
      provider: Provider.email,
    },
  })

  // const secret = await prisma.secrets.findFirst({
  // })

  console.log({ dummyu })
}

// Seeding your database via raw SQL queries
// async function rawSql() {
//   const result = await prisma.$executeRaw`INSERT INTO "User" ("id", "email", "name") VALUES (3, 'foo@example.com', 'Foo') ON CONFLICT DO NOTHING;`
//   console.log({ result })
// }

main()
  // .then(rawSql)
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
