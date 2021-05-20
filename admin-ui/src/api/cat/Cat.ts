export type Cat = {
  age: number | null;
  createdAt: Date;
  id: string;
  lastName: string | null;
  mothersName: string | null;
  name: string;
  picture: string | null;
  tailSize: string | null;
  type?: "Large" | "Medium" | "Small" | null;
  updatedAt: Date;
};
