import { ArgsType, Field } from "@nestjs/graphql";
import { CatWhereUniqueInput } from "./CatWhereUniqueInput";
import { CatUpdateInput } from "./CatUpdateInput";

@ArgsType()
class UpdateCatArgs {
  @Field(() => CatWhereUniqueInput, { nullable: false })
  where!: CatWhereUniqueInput;
  @Field(() => CatUpdateInput, { nullable: false })
  data!: CatUpdateInput;
}

export { UpdateCatArgs };
