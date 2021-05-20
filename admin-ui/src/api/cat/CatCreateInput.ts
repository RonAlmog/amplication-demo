export type CatCreateInput = {
  age?: number | null;
  lastName?: string | null;
  name: string;
  picture?: string | null;
  tailSize?: string | null;
  type?: "Large" | "Medium" | "Small" | null;
};
