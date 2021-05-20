import { AddressWhereUniqueInput } from "../address/AddressWhereUniqueInput";

export type Customer = {
  address?: AddressWhereUniqueInput | null;
  createdAt: Date;
  email: string | null;
  firstName: string | null;
  id: string;
  lastName: string | null;
  phone: string | null;
  updatedAt: Date;
};
