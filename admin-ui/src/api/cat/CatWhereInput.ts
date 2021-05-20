import { IntNullableFilter } from "../../util/IntNullableFilter";
import { CustomerWhereUniqueInput } from "../customer/CustomerWhereUniqueInput";
import { StringFilter } from "../../util/StringFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";

export type CatWhereInput = {
  age?: IntNullableFilter;
  customer?: CustomerWhereUniqueInput;
  id?: StringFilter;
  lastName?: StringNullableFilter;
  mothersName?: StringNullableFilter;
  name?: StringFilter;
  picture?: StringNullableFilter;
  tailSize?: StringNullableFilter;
  type?: "Large" | "Medium" | "Small";
};
