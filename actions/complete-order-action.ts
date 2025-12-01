"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/src/generated/prisma/lib/prisma";

export async function completeOrder(formData: FormData) {
  const orderId = formData.get("order_id")!;
  try {
    await prisma.order.update({
      where: {
        id: Number(orderId),
      },
      data: {
        status: true,
        orderReadyAt: new Date(Date.now()),
      },
    });
    revalidatePath("/admin/orders");
  } catch (error) {
    console.log(error);
  }
}
