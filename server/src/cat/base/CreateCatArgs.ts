import { ArgsType, Field } from "@nestjs/graphql";
import { CatCreateInput } from "./CatCreateInput";

@ArgsType()
class CreateCatArgs {
  @Field(() => CatCreateInput, { nullable: false })
  data!: CatCreateInput;
}

export { CreateCatArgs };
