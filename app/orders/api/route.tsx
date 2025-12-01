import { prisma } from "@/src/generated/prisma/lib/prisma";

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
