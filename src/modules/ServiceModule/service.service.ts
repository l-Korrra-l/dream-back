import { ForbiddenException, Injectable } from '@nestjs/common';
import { ServiceForCreate } from './dto/serviceforcreate.dto';
import { Prisma, Service } from '@prisma/client';
import { SaveImageInfo, StatsInfo } from 'src/types/types';
import { Sort } from 'src/enums/sort.enum';
import { ReviewFromUser } from './dto/reviewformuser.dto';
import { ReviewRepository } from 'src/persistance/repository/review.repository';
import { ServiceForUpdate } from './dto/serviceforupdate.dto';
import { CategoryRepository } from 'src/persistance/repository/category.repository';
import { ServiceRepository } from 'src/persistance/repository/service.repository';

@Injectable()
export class ServiceService {
  constructor(
    private serviceRepository: ServiceRepository,
    private reviewRepository: ReviewRepository,
    private categoryRepository: CategoryRepository,
  ) {}

  async createService(inputService: ServiceForCreate): Promise<Service> {
    const service = await this.serviceRepository.create({
      raiting: 0,
      ...inputService,
    });

    return service;
  }

  async getOne(id: string): Promise<Service> {
    return await this.serviceRepository.findOne(id);
  }

  async getAll(sort: Sort, sortby: string): Promise<Service[]> {
    return await this.serviceRepository.findAllWithSorting(sort, sortby);
  }

  async findByFilters(
    filters: any,
    sort: Sort,
    sortby: string,
  ): Promise<Service[]> {
    let arr;
    if (filters.name != null && filters.name != undefined)
      arr = await this.serviceRepository.findByName(filters.name, sort);
    else if (filters.text != null && filters.text != undefined)
      arr = await this.serviceRepository.findByText(filters.text, sort);
    if (!filters.min_price) filters.min_price = -1;
    if (!filters.max_price) filters.max_price = Number.MAX_VALUE / 2;
    if (filters.producer != null && filters.producer != undefined)
      arr.map((i) => {
        if (i.producer.includes(filters.producer)) return i;
      });
    return arr.map((i) => {
      if (i.price > filters.min_price && i.price < filters.max_price) return i;
    });
  }

  async makeReview(
    userId: string,
    author: string,
    serviceId: string,
    review: ReviewFromUser,
  ) {
    const service = await this.serviceRepository.findWithReviews(serviceId);

    if (service.reviews.find((rec) => rec.userId == Number(userId))) {
      throw new ForbiddenException('Review for this service already exists');
    }

    const serviceStats: StatsInfo =
      await this.reviewRepository.getStatsOfService(serviceId);

    const newRaiting = (
      (serviceStats.sum + review.raiting) /
      (serviceStats.count + 1)
    ).toFixed(1);

    await this.serviceRepository.update(serviceId, {
      raiting: parseFloat(newRaiting),
    });

    return await this.reviewRepository.create({
      prodId: serviceId,
      userId: userId,
      authorName: author,
      productName: service.name,
      createdDate: new Date(),
      ...review,
    } as unknown as Prisma.ReviewCreateInput);
  }

  async updateService(
    serviceId: string,
    serviceForUpdate: ServiceForUpdate,
    newImage: string,
  ) {
    const service = await this.serviceRepository.findOne(serviceId);
    serviceForUpdate.img_path = newImage;
    return await this.serviceRepository.update(serviceId, serviceForUpdate);
  }
}
