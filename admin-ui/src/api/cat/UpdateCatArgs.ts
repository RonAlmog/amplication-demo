import { CatWhereUniqueInput } from "./CatWhereUniqueInput";
import { CatUpdateInput } from "./CatUpdateInput";

export type UpdateCatArgs = {
  where: CatWhereUniqueInput;
  data: CatUpdateInput;
};
