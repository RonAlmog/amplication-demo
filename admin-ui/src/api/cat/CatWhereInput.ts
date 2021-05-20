import { IntNullableFilter } from "../../util/IntNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";

export type CatWhereInput = {
  age?: IntNullableFilter;
  id?: StringFilter;
  lastName?: StringNullableFilter;
  name?: StringFilter;
  picture?: StringNullableFilter;
  tailSize?: StringNullableFilter;
  type?: "Large" | "Medium" | "Small";
};
