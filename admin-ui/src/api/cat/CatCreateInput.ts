import { CustomerWhereUniqueInput } from "../customer/CustomerWhereUniqueInput";

export type CatCreateInput = {
  age?: number | null;
  customer?: CustomerWhereUniqueInput | null;
  lastName?: string | null;
  mothersName?: string | null;
  name: string;
  picture?: string | null;
  tailSize?: string | null;
  type?: "Large" | "Medium" | "Small" | null;
};
