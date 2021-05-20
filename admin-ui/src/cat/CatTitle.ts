import { Cat as TCat } from "../api/cat/Cat";

export const CAT_TITLE_FIELD = "lastName";

export const CatTitle = (record: TCat) => {
  return record.lastName;
};
