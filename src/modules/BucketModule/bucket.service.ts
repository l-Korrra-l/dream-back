import { ForbiddenException, Injectable } from '@nestjs/common';
// import { BucketForCreate, ProductForCreate } from './dto/bucketforcreate.dto';
import { Bucket, Prisma, Product } from '@prisma/client';
import { SaveImageInfo, StatsInfo } from 'src/types/types';
import { Sort } from 'src/enums/sort.enum';
import { ReviewFromUser } from './dto/reviewformuser.dto';
import { ReviewRepository } from 'src/persistance/repository/review.repository';
import { ProductForUpdate } from './dto/productforupdate.dto';
import { BucketRepository } from 'src/persistance/repository/bucket.repository';

@Injectable()
export class BucketService {
  constructor(private bucketRepository: BucketRepository) {}

  // async createBucket(inputBucket: BucketForCreate): Promise<Bucket> {
  //   const bucket = await this.bucketRepository.create({
  //     inputBucket,
  //   } as Prisma.BucketCreateInput);

  //   return bucket;
  // }

  // async getOne(id: string): Promise<Bucket> {
  //   return await this.bucketRepository.findOne(id);
  // }

  // async getAll(): Promise<Bucket[]> {
  //   return await this.bucketRepository.findAll();
  // }

  // async findByValue(orderId: string) {
  //   return await this.bucketRepository.findByOrder(orderId);
  // }

  // async updateBucket(
  //   productId: string,
  //   productForUpdate: ProductForUpdate,
  //   newImage: string,
  // ) {
  //   const product = await this.bucketRepository.findOne(productId);
  //   productForUpdate.img_path = newImage;
  //   return await this.bucketRepository.update(productId, productForUpdate);
  // }
}
