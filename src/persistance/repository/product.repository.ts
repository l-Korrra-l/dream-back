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
      include: {
        reviews: true,
        CharactValue: true,
        colors: true,
        Memory: true,
        materials: true,
        services: true,
      },
      data,
    });

    return await this.prisma.product.findFirst({
      include: {
        reviews: true,
        CharactValue: true,
        colors: true,
        Memory: true,
        materials: true,
        category: true,
        subcategory: true,
        services: true,
      },
      where: {
        id: product.id,
      },
    });
  }

  async update(id: string, data: Prisma.ProductUpdateInput): Promise<Product> {
    return await this.prisma.product.update({
      include: {
        reviews: true,
        CharactValue: true,
        colors: true,
        Memory: true,
        materials: true,
        services: true,
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

  async findOne(id: string): Promise<any> {
    const product = await this.prisma.product.findFirst({
      include: {
        services: true,
        reviews: {
          select: {
            body: true,
            createdDate: true,
            raiting: true,
            authorName: true,
            productName: true,
            text: true,
          },
        },
        colors: false,
        Memory: {
          select: {
            size: true,
          },
        },
        materials: {
          select: {
            material: true,
            img_path: true,
          },
        },
        category: {
          select: {
            categoryName: true,
          },
        },
        subcategory: {
          select: {
            name: true,
          },
        },
        Information: {
          select: {
            color: true,
            img_path: true,
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

  async findWithReviews(id: string): Promise<ProductWithReviews> {
    const product = await this.prisma.product.findFirst({
      include: {
        reviews: true,
        services: true,
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
      include: {
        reviews: true,
        CharactValue: true,
        colors: true,
        Memory: true,
        materials: true,
        category: true,
        subcategory: true,
        services: true,
      },
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
        services: true,
      },
    });
  }
  //asc, desc
  async findAllWithSorting(
    sort: Sort,
    sortby: string,
    page: string,
  ): Promise<Product[]> {
    if (sort == Sort.none) sort = Sort.asc;
    if (sortby == 'price' || sortby == undefined || sortby == null)
      return await this.prisma.product.findMany({
        take: 30,
        skip: 30 * (Number(page) - 1),
        orderBy: {
          price: sort,
        },
      });
    if (sortby == 'raiting')
      return await this.prisma.product.findMany({
        take: 30,
        skip: 30 * (Number(page) - 1),
        orderBy: {
          raiting: sort,
        },
      });
    if (sortby == 'name')
      return await this.prisma.product.findMany({
        take: 30,
        skip: 30 * (Number(page) - 1),
        orderBy: {
          name: sort,
        },
      });
  }

  async findByValue(name: string, author: string): Promise<Product[]> {
    return (await this.prisma.product.findMany({
      include: {
        reviews: true,
        CharactValue: true,
        colors: true,
        Memory: true,
        materials: true,
        category: true,
        subcategory: true,
        services: true,
      },
      where: {
        name: {
          contains: name,
        },
      },
    })) as unknown as Product[];
  }

  async findByName(name: string, sort: Sort): Promise<Product[]> {
    if (sort == Sort.none) sort = Sort.desc;
    return await this.prisma.product.findMany({
      include: {
        reviews: true,
        CharactValue: true,
        colors: true,
        Memory: true,
        materials: true,
        category: true,
        subcategory: true,
        services: true,
      },
      where: {
        name: name,
      },
      // orderBy: {
      //   _relevance: {
      //     fields: 'name',
      //     search: name,
      //     sort: sort,
      //   },
      // },
    });
  }

  async findByProducer(
    prod: string,
    sort: Sort,
    sortby: string,
  ): Promise<Product[]> {
    if (sort == Sort.none) sort = Sort.asc;
    if (sortby == 'price' || sortby == undefined || sortby == null)
      return await this.prisma.product.findMany({
        where: {
          producer: {
            search: prod,
          },
        },
        orderBy: {
          price: sort,
        },
      });
    if (sortby == 'raiting')
      return await this.prisma.product.findMany({
        where: {
          producer: {
            search: prod,
          },
        },
        orderBy: {
          raiting: sort,
        },
      });
    if (sortby == 'name')
      return await this.prisma.product.findMany({
        where: {
          producer: {
            search: prod,
          },
        },
        orderBy: {
          name: sort,
        },
      });
  }

  async findByText(text: string, sort: Sort): Promise<Product[]> {
    if (sort == Sort.none) sort = Sort.asc;
    return await this.prisma.product.findMany({
      orderBy: {
        _relevance: {
          fields: ['name', 'short_descr', 'description'],
          search: text,
          sort: sort,
        },
      },
    });
  }
}
