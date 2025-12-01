import { Product } from "@/src/generated/prisma/client"
import { Order, OrderProducts,  } from "../generated/prisma/browser"

export type OrderItem = Pick<Product, 'id' | 'name' | 'price'> & {
    quantity: number
    subTotal: number
}

export type OrderWithProducts = Order & {
    orderProducts: (OrderProducts & {
        product: Product
    })[]
}
