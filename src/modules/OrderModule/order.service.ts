import { ForbiddenException, Injectable } from '@nestjs/common';
import { Order, Prisma, Product } from '@prisma/client';
import { SaveImageInfo, StatsInfo } from 'src/types/types';
import { Sort } from 'src/enums/sort.enum';
import { ReviewRepository } from 'src/persistance/repository/review.repository';
import { OrderRepository } from 'src/persistance/repository/order.repository';
import { BucketRepository } from 'src/persistance/repository/bucket.repository';
import { BucketForCreate } from '../BucketModule/dto/bucketforcreate.dto';
import { OrderForCreate } from './dto/OrderForCreate';
import { UserRepository } from 'src/persistance/repository/user.repository';
import { ProductRepository } from 'src/persistance/repository/product.repository';
import { Decimal } from '@prisma/client/runtime';
import { CurrentUserInfo } from 'src/types/types';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private bucketRepository: BucketRepository,
    private userRepository: UserRepository,
    private productRepository: ProductRepository,
  ) {}

  async createOrder(
    inputOrder: OrderForCreate,
    userId: string,
  ): Promise<Order> {
    let user;
    if (userId) {
      user = await this.userRepository.getById(userId);
      if (
        user.phoneNumber == null ||
        user.phoneNumber == undefined ||
        user.phoneNumber == ''
      )
        user = await this.userRepository.update(userId, {
          phoneNumber: inputOrder.phoneNumber,
        });
    } else
      user = await this.userRepository.create({
        firstName: inputOrder.firstName,
        lastName: inputOrder.lastname,
        role: Role.Guest,
        phoneNumber: inputOrder.phoneNumber,
        email: '',
      });
    let newOrder = await this.orderRepository.create({
      date: new Date(),
      userId: user.id,
      // user: user,
      status: 'оформлен',
    } as Prisma.OrderUncheckedCreateInput);
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    let cost: number = 0;
    await Promise.all(
      inputOrder.cartItems.map(async (buck) => {
        let prod = await this.productRepository.getById(buck.prodId);
        prod = await this.productRepository.update(buck.prodId.toString(), {
          in_stock: prod.in_stock - buck.quantity,
        });
        await this.bucketRepository.create({
          orderId: newOrder.id,
          prodId: prod.id,
          quantity: buck.quantity,
          equipment: buck.equipment,
        } as Prisma.BucketUncheckedCreateInput);
        cost += Number(prod.price) * buck.quantity;
      }),
    ).then(async () => {
      newOrder = await this.orderRepository.updateNumId(newOrder.id, {
        totalCost: cost,
      });
    });
    return newOrder;
  }

  async getOne(id: string): Promise<Order> {
    return await this.orderRepository.findOne(id);
  }

  async getAll(user: CurrentUserInfo): Promise<Order[]> {
    if (user.role == Role.User)
      return await this.orderRepository.findByUser(user.userId);
    else return await this.orderRepository.findAll();
  }

  // async findByValue(name: string, author: string) {
  //   return await this.orderRepository.findByValue(name, author);
  // }

  async updateOrder() {
    // newImage: string, // productForUpdate: ProductForUpdate, // productId: string,
    // const product = await this.orderRepository.findOne(productId);
    // productForUpdate.img_path = newImage;
    // return await this.orderRepository.update(productId, productForUpdate);
  }
}
