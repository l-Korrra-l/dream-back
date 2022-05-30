import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserRepository } from 'src/persistance/repository/user.repository';
import { UserForUpdate } from './dto/userforupdate.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getProfile(id: string): Promise<User> {
    return await this.userRepository.findForView(id);
  }

  async updateProfile(userId: string, inputUser: UserForUpdate): Promise<User> {
    const user = await this.userRepository.findOne(userId);

    const updatedUser = await this.userRepository.update(
      userId,
      inputUser as Prisma.UserUpdateInput,
    );

    return updatedUser;
  }
}
