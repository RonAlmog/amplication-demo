import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { CatService } from "./cat.service";
import { CatControllerBase } from "./base/cat.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("cats")
@common.Controller("cats")
export class CatController extends CatControllerBase {
  constructor(
    protected readonly service: CatService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
