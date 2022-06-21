import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { truncate } from 'fs/promises';
import { PrismaService } from 'nestjs-prisma';
import { NotFound } from 'src/errors/errors';
//import { PrismaService } from '../prisma.service';
import { Repository } from './repository.interface';

@Injectable()
export class UserRepository
  implements
    Repository<string, Prisma.UserCreateInput, Prisma.UserUpdateInput, User>
{
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await this.prisma.user.create({
      data,
    });

    return user;
  }

  async update(userId: string, data: Prisma.UserUpdateInput): Promise<User> {
    return (await this.prisma.user.update({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        birthDate: true,
        auth: true,
        role: true,
        phoneNumber: true,
        reviews: {
          select: {
            id: true,
            createdDate: true,
            raiting: true,
            authorName: true,
            text: true,
          },
        },
        orders: {
          select: {
            id: true,
            totalCost: true,
            date: true,
            status: true,
            buckets: {
              select: {
                id: true,
                quantity: true,
              },
            },
          },
        },
      },
      where: {
        id: Number(userId),
      },
      data,
    })) as unknown as User;
  }

  async delete(userId: string): Promise<boolean> {
    const user = await this.prisma.user.delete({
      where: {
        id: Number(userId),
      },
    });

    if (user) {
      return true;
    }

    throw new NotFound('Not found user for delte');
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (user) {
      return user;
    }

    throw new NotFound('Not found user');
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findForView(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        birthDate: true,
        phoneNumber: true,
        auth: true,
        role: true,
        reviews: {
          select: {
            id: true,
            createdDate: true,
            raiting: true,
            authorName: true,
            text: true,
          },
        },
        orders: {
          select: {
            id: true,
            totalCost: true,
            date: true,
            status: true,
            buckets: {
              select: {
                id: true,
                quantity: true,
              },
            },
          },
        },
      },
      where: {
        id: Number(id),
      },
    });

    if (user) {
      return user as unknown as User;
    }

    throw new NotFound('Not found user');
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (user) {
      return user;
    }

    throw new NotFound('Not found user with this email');
  }

  async getById(id: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (user) {
      return user;
    }
    throw new NotFound('Not found user by id');
  }

  async canRegister(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (user) {
      return false;
    }

    return true;
  }
}
