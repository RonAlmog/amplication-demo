import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { CreateCatArgs } from "./CreateCatArgs";
import { UpdateCatArgs } from "./UpdateCatArgs";
import { DeleteCatArgs } from "./DeleteCatArgs";
import { CatFindManyArgs } from "./CatFindManyArgs";
import { CatFindUniqueArgs } from "./CatFindUniqueArgs";
import { Cat } from "./Cat";
import { Customer } from "../../customer/base/Customer";
import { CatService } from "../cat.service";

@graphql.Resolver(() => Cat)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class CatResolverBase {
  constructor(
    protected readonly service: CatService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Cat",
    action: "read",
    possession: "any",
  })
  async _catsMeta(
    @graphql.Args() args: CatFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [Cat])
  @nestAccessControl.UseRoles({
    resource: "Cat",
    action: "read",
    possession: "any",
  })
  async cats(
    @graphql.Args() args: CatFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Cat[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Cat",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Cat, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Cat",
    action: "read",
    possession: "own",
  })
  async cat(
    @graphql.Args() args: CatFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Cat | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Cat",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Cat)
  @nestAccessControl.UseRoles({
    resource: "Cat",
    action: "create",
    possession: "any",
  })
  async createCat(
    @graphql.Args() args: CreateCatArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Cat> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Cat",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Cat"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        customer: args.data.customer
          ? {
              connect: args.data.customer,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => Cat)
  @nestAccessControl.UseRoles({
    resource: "Cat",
    action: "update",
    possession: "any",
  })
  async updateCat(
    @graphql.Args() args: UpdateCatArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Cat | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Cat",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Cat"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          customer: args.data.customer
            ? {
                connect: args.data.customer,
              }
            : undefined,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Cat)
  @nestAccessControl.UseRoles({
    resource: "Cat",
    action: "delete",
    possession: "any",
  })
  async deleteCat(@graphql.Args() args: DeleteCatArgs): Promise<Cat | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => Customer, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Cat",
    action: "read",
    possession: "any",
  })
  async customer(
    @graphql.Parent() parent: Cat,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Customer | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Customer",
    });
    const result = await this.service.getCustomer(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
