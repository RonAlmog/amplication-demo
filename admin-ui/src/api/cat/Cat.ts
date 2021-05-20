import { CustomerWhereUniqueInput } from "../customer/CustomerWhereUniqueInput";

export type Cat = {
  age: number | null;
  createdAt: Date;
  customer?: CustomerWhereUniqueInput | null;
  id: string;
  lastName: string | null;
  mothersName: string | null;
  name: string;
  picture: string | null;
  tailSize: string | null;
  type?: "Large" | "Medium" | "Small" | null;
  updatedAt: Date;
};
