import { Injectable } from '@nestjs/common';
import { Prisma, Service } from '@prisma/client';
import { Sort } from 'src/enums/sort.enum';
import { PrismaService } from 'nestjs-prisma';
import { Repository } from './repository.interface';
import { NotFound } from 'src/errors/errors';
import { ServiceWithReviews } from 'src/types/prismatypes';

@Injectable()
export class ServiceRepository
  implements
    Repository<
      string,
      Prisma.ServiceCreateInput,
      Prisma.ServiceUpdateInput,
      Service
    >
{
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ServiceCreateInput): Promise<Service> {
    const service = await this.prisma.service.create({
      data,
    });

    return service;
  }

  async update(id: string, data: Prisma.ServiceUpdateInput): Promise<Service> {
    return await this.prisma.service.update({
      include: {
        reviews: true,
        products: true,
      },
      where: {
        id: Number(id),
      },
      data,
    });
  }

  async connectProduct(serv_id: number, id: number): Promise<Service> {
    return await this.prisma.service.update({
      where: {
        id: serv_id,
      },
      include: {
        reviews: true,
        products: true,
      },
      data: {
        products: {
          connect: {
            id: id,
          },
        },
      },
    });
  }

  async delete(id: string): Promise<boolean> {
    const service = await this.prisma.service.delete({
      where: {
        id: Number(id),
      },
    });

    if (service) {
      return true;
    }

    throw new NotFound('Not found service for delete');
  }

  async findOne(id: string): Promise<ServiceWithReviews> {
    const service = await this.prisma.service.findFirst({
      include: {
        reviews: true,
        products: true,
      },
      where: {
        id: Number(id),
      },
    });

    if (service) {
      return service;
    }

    throw new NotFound('Not found service');
  }

  async getById(id: number): Promise<Service> {
    const service = await this.prisma.service.findFirst({
      include: {
        reviews: true,
        products: true,
      },
      where: {
        id: id,
      },
    });

    if (service) {
      return service;
    }

    throw new NotFound('Not found service');
  }

  async findAll(): Promise<Service[]> {
    return await this.prisma.service.findMany({
      include: {
        reviews: true,
        products: true,
      },
    });
  }
  //asc, desc
  async findAllWithSorting(sort: Sort, sortby: string): Promise<Service[]> {
    if (sort == Sort.none) sort = Sort.asc;
    if (sortby == 'price' || sortby == undefined || sortby == null)
      return await this.prisma.service.findMany({
        orderBy: {
          price: sort,
        },
      });
    if (sortby == 'raiting')
      return await this.prisma.service.findMany({
        orderBy: {
          raiting: sort,
        },
      });
    if (sortby == 'name')
      return await this.prisma.service.findMany({
        orderBy: {
          name: sort,
        },
      });
  }

  async findByValue(name: string, author: string): Promise<Service[]> {
    return (await this.prisma.service.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        img_path: true,
        price: true,
        raiting: true,
        products: true,
        reviews: {
          select: {
            id: true,
            createdDate: true,
            raiting: true,
            authorName: true,
            productName: true,
            text: true,
          },
        },
      },
      where: {
        name: {
          contains: name,
        },
      },
    })) as unknown as Service[];
  }

  async findByName(name: string, sort: Sort): Promise<Service[]> {
    if (sort == Sort.none) sort = Sort.asc;
    return await this.prisma.service.findMany({
      orderBy: {
        _relevance: {
          fields: 'name',
          search: name,
          sort: sort,
        },
      },
    });
  }

  async findWithReviews(id: string): Promise<ServiceWithReviews> {
    const service = await this.prisma.service.findFirst({
      include: {
        reviews: true,
      },
      where: {
        id: Number(id),
      },
    });

    if (service) {
      return service;
    }

    throw new NotFound('Not found service');
  }

  async findByText(text: string, sort: Sort): Promise<Service[]> {
    if (sort == Sort.none) sort = Sort.asc;
    return await this.prisma.service.findMany({
      orderBy: {
        _relevance: {
          fields: ['description', 'name', 'short_descr'],
          search: text,
          sort: sort,
        },
      },
    });
  }
}
