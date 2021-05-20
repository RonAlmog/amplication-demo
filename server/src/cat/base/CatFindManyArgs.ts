import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CatWhereInput } from "./CatWhereInput";
import { Type } from "class-transformer";
import { CatOrderByInput } from "./CatOrderByInput";

@ArgsType()
class CatFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => CatWhereInput,
  })
  @Field(() => CatWhereInput, { nullable: true })
  @Type(() => CatWhereInput)
  where?: CatWhereInput;

  @ApiProperty({
    required: false,
    type: CatOrderByInput,
  })
  @Field(() => CatOrderByInput, { nullable: true })
  @Type(() => CatOrderByInput)
  orderBy?: CatOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { CatFindManyArgs };
