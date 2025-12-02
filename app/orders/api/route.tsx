import { prisma } from "@/src/lib/prisma";

export const runtime = 'nodejs'


export async function GET() {
  const orders = await prisma.order.findMany({
    where: {
      orderReadyAt: {
        not: null,
      },
    },
    orderBy: {
      orderReadyAt: "desc",
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });
  return Response.json(orders);
}
