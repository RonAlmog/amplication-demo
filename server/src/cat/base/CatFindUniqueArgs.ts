import { ArgsType, Field } from "@nestjs/graphql";
import { CatWhereUniqueInput } from "./CatWhereUniqueInput";

@ArgsType()
class CatFindUniqueArgs {
  @Field(() => CatWhereUniqueInput, { nullable: false })
  where!: CatWhereUniqueInput;
}

export { CatFindUniqueArgs };
