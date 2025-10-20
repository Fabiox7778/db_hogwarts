import { PrismaClient } from "@prisma/client";
const prisma = newClient();

export const encontreTodos = async () => {
  return await prisma.bruxo.findMany({
    orderBy: { nome: 'asc' }
});
}