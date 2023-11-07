import { Product } from "@prisma/client";

export  type SafeProduct = Omit<
  Product,
  "createdAt" | "updatedAt"
> & {
  createdAt: string;
  updatedAt: string;
}