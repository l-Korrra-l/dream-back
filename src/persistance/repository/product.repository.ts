import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { Sort } from 'src/enums/sort.enum';
import { PrismaService } from 'nestjs-prisma';
import { Repository } from './repository.interface';
import { NotFound } from 'src/errors/errors';
// import { ProductWithreviewss } from 'src/types/prismatypes';

@Injectable()
export class ProductRepository
  implements
    Repository<
      string,
      Prisma.ProductCreateInput,
      Prisma.ProductUpdateInput,
      Product
    >
{
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    const product = await this.prisma.product.create({
      data,
    });

    return product;
  }

  async update(id: string, data: Prisma.ProductUpdateInput): Promise<Product> {
    return await this.prisma.product.update({
      include: {
        reviews: true,
      },
      where: {
        id: Number(id),
      },
      data,
    });
  }

  async delete(id: string): Promise<boolean> {
    const product = await this.prisma.product.delete({
      where: {
        id: Number(id),
      },
    });

    if (product) {
      return true;
    }

    throw new NotFound('Not found product for delete');
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.prisma.product.findFirst({
      select: {
        id: true,
        name: true,
        // author: true,
        description: true,
        img_path: true,
        // imageId: true,
        price: true,
        raiting: true,
        in_stock: true,
        categoryId: true,
        reviews: {
          select: {
            createdDate: true,
            raiting: true,
            authorName: true,
            // productName: true,
            text: true,
          },
        },
      },
      where: {
        id: Number(id),
      },
    });

    if (product) {
      return product;
    }

    throw new NotFound('Not found product');
  }

  // async findWithreviewss(id: string): Promise<productWithreviewss> {
  //   const product = await this.prisma.product.findFirst({
  //     include: {
  //       reviewss: true,
  //     },
  //     where: {
  //       id: id,
  //     },
  //   });

  //   if (product) {
  //     return product;
  //   }

  //   throw new NotFound('Not found product');
  // }

  async findAll(): Promise<Product[]> {
    return await this.prisma.product.findMany({
      include: {
        reviews: true,
      },
    });
  }

  async findAllWithSorting(sort: Sort): Promise<Product[]> {
    if (sort != Sort.none) {
      return (await this.prisma.product.findMany({
        select: {
          id: true,
          name: true,
          // description: true,
          img_path: true,
          // imageId: false,
          price: true,
          reviews: {
            select: {
              createdDate: true,
              raiting: true,
              authorName: true,
              // productName: true,
              text: true,
            },
          },
        },
        orderBy: {
          price: sort,
        },
      })) as unknown as Product[];
    }

    return (await this.prisma.product.findMany({
      select: {
        id: true,
        name: true,
        // description: true,
        img_path: true,
        // imageId: false,
        price: true,
        reviews: {
          select: {
            createdDate: true,
            raiting: true,
            authorName: true,
            // productName: true,
            text: true,
          },
        },
      },
    })) as unknown as Product[];
  }

  // async findByValue(name: string, author: string): Promise<Product[]> {
  //   return (await this.prisma.product.findMany({
  //     select: {
  //       id: true,
  //       name: true,
  //       description: true,
  //       img_path: true,
  //       imageId: false,
  //       price: true,
  //       reviews: {
  //         select: {
  //           createdDate: true,
  //           raiting: true,
  //           authorName: true,
  //           productName: true,
  //           text: true,
  //         },
  //       },
  //     },
  //     where: {
  //         {
  //           name: {
  //             contains: name,
  //           },
  //         },
  //     },
  //   })) as unknown as Product[];
  // }
}
