import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { Sort } from 'src/enums/sort.enum';
import { BucketRepository } from 'src/persistance/repository/bucket.repository';
import { OrderRepository } from 'src/persistance/repository/order.repository';
import { ProductRepository } from 'src/persistance/repository/product.repository';
import { ReviewRepository } from 'src/persistance/repository/review.repository';
import { ServiceRepository } from 'src/persistance/repository/service.repository';
import { UserRepository } from 'src/persistance/repository/user.repository';

@Injectable()
export class SearchService {
  constructor(
    private productRepository: ProductRepository,
    private serviceRepository: ServiceRepository,
  ) {}

  async findByFilters(filters: any, sort: Sort, sortby: string): Promise<any> {
    let arr;
    if (filters.name != null && filters.name != undefined) {
      arr = await this.productRepository.findByName(filters.name, sort);
    } else if (filters.text != null && filters.text != undefined)
      arr = await this.productRepository.findByText(filters.text, sort);
    else if (filters.producer != null && filters.producer != undefined)
      return await this.productRepository.findByProducer(
        filters.producer,
        sort,
        sortby,
      );
    else arr = await this.productRepository.findAll();
    if (!filters.min_price) filters.min_price = -1;
    if (!filters.max_price) filters.max_price = Number.MAX_VALUE / 2;
    if (filters.producer != null && filters.producer != undefined)
      arr = arr.map((i) => {
        if (i.producer.includes(filters.producer)) return i;
      });
    arr = arr.map((i) => {
      if (
        i.price > parseFloat(filters.min_price) &&
        i.price < parseFloat(filters.max_price)
      )
        return i;
    });

    let arrS;
    if (filters.name != null && filters.name != undefined) {
      arrS = await this.serviceRepository.findByName(filters.name, sort);
    } else if (filters.text != null && filters.text != undefined)
      arrS = await this.serviceRepository.findByText(filters.text, sort);
    else arrS = await this.serviceRepository.findAll();
    if (!filters.min_price) filters.min_price = -1;
    if (!filters.max_price) filters.max_price = Number.MAX_VALUE / 2;
    arrS = arrS.map((i) => {
      if (
        i.price > parseFloat(filters.min_price) &&
        i.price < parseFloat(filters.max_price)
      )
        return i;
    });
    return { products: arr, services: arrS };
  }
}
