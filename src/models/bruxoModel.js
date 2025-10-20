import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const encontreTodos = async () => {
  return await prisma.bruxo.findMany({
    orderBy: { name: 'asc' }
});
}

export const encontreUm = async (id) => {
  return await prisma.bruxo.findUnique({
    where: { id: Number(id) }
  });
}