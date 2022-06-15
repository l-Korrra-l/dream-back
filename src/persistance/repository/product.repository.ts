import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { Sort } from 'src/enums/sort.enum';
import { PrismaService } from 'nestjs-prisma';
import { Repository } from './repository.interface';
import { NotFound } from 'src/errors/errors';
import { ProductWithReviews } from 'src/types/prismatypes';

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
        description: true,
        img_path: true,
        price: true,
        raiting: true,
        in_stock: true,
        categoryId: true,
        short_descr: true,
        html_descr: true,
        category: {
          select: {
            id: true,
            categoryName: true,
            img_path: true,
          },
        },
        reviews: {
          select: {
            id: true,
            createdDate: true,
            raiting: true,
            authorName: true,
            productdName: true,
            text: true,
          },
        },
        buckets: {
          select: {
            id: true,
            quantity: true,
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

  async findWithReviews(id: string): Promise<ProductWithReviews> {
    const product = await this.prisma.product.findFirst({
      include: {
        reviews: true,
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

  async getById(id: number): Promise<Product> {
    const product = await this.prisma.product.findFirst({
      where: {
        id: id,
      },
    });

    if (product) {
      return product;
    }

    throw new NotFound('Not found product');
  }

  async findAll(): Promise<Product[]> {
    return await this.prisma.product.findMany({
      include: {
        reviews: true,
      },
    });
  }
  //asc, desc
  async findAllWithSorting(sort: Sort): Promise<Product[]> {
    if (sort != Sort.none) {
      return (await this.prisma.product.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          img_path: true,
          price: true,
          raiting: true,
          in_stock: true,
          categoryId: true,
          reviews: {
            select: {
              id: true,
              createdDate: true,
              raiting: true,
              authorName: true,
              productdName: true,
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
        description: true,
        img_path: true,
        price: true,
        raiting: true,
        in_stock: true,
        categoryId: true,
        reviews: {
          select: {
            id: true,
            createdDate: true,
            raiting: true,
            authorName: true,
            productdName: true,
            text: true,
          },
        },
      },
    })) as unknown as Product[];
  }

  async findByValue(name: string, author: string): Promise<Product[]> {
    return (await this.prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        img_path: true,
        price: true,
        raiting: true,
        in_stock: true,
        categoryId: true,
        reviews: {
          select: {
            id: true,
            createdDate: true,
            raiting: true,
            authorName: true,
            productdName: true,
            text: true,
          },
        },
      },
      where: {
        name: {
          contains: name,
        },
      },
    })) as unknown as Product[];
  }
}
