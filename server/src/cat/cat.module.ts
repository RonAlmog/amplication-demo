import { Module } from "@nestjs/common";
import { CatModuleBase } from "./base/cat.module.base";
import { CatService } from "./cat.service";
import { CatController } from "./cat.controller";
import { CatResolver } from "./cat.resolver";

@Module({
  imports: [CatModuleBase],
  controllers: [CatController],
  providers: [CatService, CatResolver],
  exports: [CatService],
})
export class CatModule {}
