import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, IsEnum } from "class-validator";
import { EnumCatType } from "./EnumCatType";
@InputType()
class CatCreateInput {
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  age?: number | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  lastName?: string | null;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  name!: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  picture?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  tailSize?: string | null;

  @ApiProperty({
    required: false,
    enum: EnumCatType,
  })
  @IsEnum(EnumCatType)
  @IsOptional()
  @Field(() => EnumCatType, {
    nullable: true,
  })
  type?: "Large" | "Medium" | "Small" | null;
}
export { CatCreateInput };
