import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { GoogleUser } from './dto/googleuser.dto';
import { UserRepository } from 'src/persistance/repository/user.repository';
import { AuthorizationError, RegisterError } from 'src/errors/errors';
import { UserForRegister } from './dto/userforregister.dto';
// import { ImageService } from '../ImageModule/image.service';
import { Role } from 'src/enums/role.enum';
import { UserLogin } from './dto/userlogin.dto';
import { AuthType } from 'src/enums/authtype.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}
  // private imageService: ImageService,

  async registerUser(
    inputUser: UserForRegister | GoogleUser,
    authType: AuthType,
  ): Promise<User> {
    let userForCreate: Prisma.UserCreateInput;

    if (!(await this.userRepository.canRegister(inputUser.email))) {
      if (authType == AuthType.Google) {
        return this.userRepository.findByEmail(inputUser.email);
      }

      throw new RegisterError('user with this email already exist');
    }

    if (authType == AuthType.Google) {
      const { picture, ...googleUserForCreate } = inputUser as GoogleUser;

      userForCreate = {
        auth: authType,
        role: Role.User,
        avatar: picture,
        ...googleUserForCreate,
      } as unknown as Prisma.UserCreateInput;
    }

    if (authType == AuthType.Basic) {
      const { password, ...defaultUser } = inputUser as UserForRegister;

      // this.imageService.validateImage(avatar);

      // const savedImage = await this.imageService.createImage(avatar);

      userForCreate = {
        auth: authType,
        role: Role.User,
        // avatar: savedImage.imageUrl,
        // imageId: savedImage.imageId,
        password: await bcrypt.hash(password, 5),
        ...defaultUser,
      } as Prisma.UserCreateInput;
    }

    const user = await this.userRepository.create(userForCreate);

    return user;
  }

  async login(userLogin: UserLogin): Promise<User> {
    const user = await this.userRepository.findByEmail(userLogin.email);

    if (user.auth === AuthType.Google) {
      return user;
    }

    if (await bcrypt.compare(userLogin.password, user.password)) {
      return user;
    }

    throw new AuthorizationError('wrong password');
  }

  async genToken(user: any) {
    const payload = { email: user.email, role: user.role, userId: user.userId };
    return {
      access_token: `Bearer ${this.jwtService.sign(payload)}`,
    };
  }
}
