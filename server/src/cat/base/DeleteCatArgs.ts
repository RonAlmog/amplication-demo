import { ArgsType, Field } from "@nestjs/graphql";
import { CatWhereUniqueInput } from "./CatWhereUniqueInput";

@ArgsType()
class DeleteCatArgs {
  @Field(() => CatWhereUniqueInput, { nullable: false })
  where!: CatWhereUniqueInput;
}

export { DeleteCatArgs };
