import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { CatServiceBase } from "./base/cat.service.base";

@Injectable()
export class CatService extends CatServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
