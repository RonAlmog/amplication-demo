import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../../auth/basicAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { CatService } from "../cat.service";
import { CatCreateInput } from "./CatCreateInput";
import { CatWhereInput } from "./CatWhereInput";
import { CatWhereUniqueInput } from "./CatWhereUniqueInput";
import { CatFindManyArgs } from "./CatFindManyArgs";
import { CatUpdateInput } from "./CatUpdateInput";
import { Cat } from "./Cat";

export class CatControllerBase {
  constructor(
    protected readonly service: CatService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Cat",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Cat })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: CatCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Cat> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Cat",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Cat"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: data,
      select: {
        age: true,
        createdAt: true,
        id: true,
        lastName: true,
        mothersName: true,
        name: true,
        picture: true,
        tailSize: true,
        type: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Cat",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Cat] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => CatFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Cat[]> {
    const args = plainToClass(CatFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Cat",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        age: true,
        createdAt: true,
        id: true,
        lastName: true,
        mothersName: true,
        name: true,
        picture: true,
        tailSize: true,
        type: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Cat",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Cat })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: CatWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Cat | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Cat",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        age: true,
        createdAt: true,
        id: true,
        lastName: true,
        mothersName: true,
        name: true,
        picture: true,
        tailSize: true,
        type: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "Cat",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Cat })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: CatWhereUniqueInput,
    @common.Body()
    data: CatUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Cat | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Cat",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Cat"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: data,
        select: {
          age: true,
          createdAt: true,
          id: true,
          lastName: true,
          mothersName: true,
          name: true,
          picture: true,
          tailSize: true,
          type: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "Cat",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Cat })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: CatWhereUniqueInput
  ): Promise<Cat | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          age: true,
          createdAt: true,
          id: true,
          lastName: true,
          mothersName: true,
          name: true,
          picture: true,
          tailSize: true,
          type: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
