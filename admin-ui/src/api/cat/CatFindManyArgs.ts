import { CatWhereInput } from "./CatWhereInput";
import { CatOrderByInput } from "./CatOrderByInput";

export type CatFindManyArgs = {
  where?: CatWhereInput;
  orderBy?: CatOrderByInput;
  skip?: number;
  take?: number;
};
