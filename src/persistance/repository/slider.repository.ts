import { Injectable } from '@nestjs/common';
import { Prisma, Product, Slider } from '@prisma/client';
import { Sort } from 'src/enums/sort.enum';
import { PrismaService } from 'nestjs-prisma';
import { Repository } from './repository.interface';
import { NotFound } from 'src/errors/errors';
import { ProductWithReviews } from 'src/types/prismatypes';

@Injectable()
export class SliderRepository
  implements
    Repository<
      string,
      Prisma.SliderCreateInput,
      Prisma.SliderUpdateInput,
      Slider
    >
{
  constructor(private prisma: PrismaService) {}
  async create(data: Prisma.SliderCreateInput): Promise<Slider> {
      const slider = await this.prisma.slider.create({
        data,
      });

    return slider;
  }

  async update(id: string, data: Prisma.SliderUpdateInput): Promise<Slider> {
    return await this.prisma.slider.update({
      where: {
        id: Number(id),
      },
      data,
    });
  }

  async updateN(id: number, data: Prisma.SliderUpdateInput): Promise<Slider> {
    return await this.prisma.slider.update({
      where: {
        id: id,
      },
      data,
    });
  }

  async findOne(id: string): Promise<Slider> {
    const slider = await this.prisma.slider.findFirst({
      select: {
        id: true,
        prodId: true,
        product: true,
        title: true,
        description: true,
        img_path: true,
      },
      where: {
        id: Number(id),
      },
    });

    if (slider) {
      return slider;
    }

    throw new NotFound('Not found slider');
  }

  async findAll(): Promise<Slider[]> {
    return await this.prisma.slider.findMany();
  }

  async delete(id: string): Promise<boolean> {
    const slider = await this.prisma.slider.delete({
      where: {
        id: Number(id),
      },
    });

    if (slider) {
      return true;
    }

    throw new NotFound('Not found slider for delete');
  }
}
