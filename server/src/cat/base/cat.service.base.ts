import { PrismaService } from "nestjs-prisma";
import { Prisma, Cat } from "@prisma/client";

export class CatServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.CatFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.CatFindManyArgs>
  ): Promise<number> {
    return this.prisma.cat.count(args);
  }

  async findMany<T extends Prisma.CatFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.CatFindManyArgs>
  ): Promise<Cat[]> {
    return this.prisma.cat.findMany(args);
  }
  async findOne<T extends Prisma.CatFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.CatFindUniqueArgs>
  ): Promise<Cat | null> {
    return this.prisma.cat.findUnique(args);
  }
  async create<T extends Prisma.CatCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.CatCreateArgs>
  ): Promise<Cat> {
    return this.prisma.cat.create<T>(args);
  }
  async update<T extends Prisma.CatUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.CatUpdateArgs>
  ): Promise<Cat> {
    return this.prisma.cat.update<T>(args);
  }
  async delete<T extends Prisma.CatDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.CatDeleteArgs>
  ): Promise<Cat> {
    return this.prisma.cat.delete(args);
  }
}
