import { CustomerWhereUniqueInput } from "../customer/CustomerWhereUniqueInput";
import { ProductWhereUniqueInput } from "../product/ProductWhereUniqueInput";

export type Order = {
  createdAt: Date;
  customer?: CustomerWhereUniqueInput | null;
  discount: number | null;
  id: string;
  product?: ProductWhereUniqueInput | null;
  quantity: number | null;
  totalPrice: number | null;
  updatedAt: Date;
};
