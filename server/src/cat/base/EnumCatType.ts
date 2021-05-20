import { registerEnumType } from "@nestjs/graphql";

export enum EnumCatType {
  Large = "Large",
  Medium = "Medium",
  Small = "Small",
}

registerEnumType(EnumCatType, {
  name: "EnumCatType",
});
