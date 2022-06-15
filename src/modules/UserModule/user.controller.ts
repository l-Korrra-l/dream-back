import {
  Body,
  Controller,
  Get,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/decorators/currentuser.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { CurrentUserInfo } from 'src/types/types';
import { JoiValidationPipe } from 'src/validation/joivalidation.pipe';
import { userForUpdateSchema } from 'src/validation/schemas/userForUpdate.schema';
import { JwtAuthGuard } from '../AuthModule/guards/jwt.guard';
import { UserForUpdate } from './dto/userforupdate.dto';
import { UserService } from './user.service';
import { diskStorage } from 'multer';
import { imageFileFilter } from 'src/helpers/imageFilter.helpers';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(Role.User, Role.Admin)
  @Get()
  async getUserProfile(@CurrentUser() user: CurrentUserInfo) {
    return await this.userService.getProfile(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.User, Role.Admin)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'src/images',
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @Patch()
  async updateuserProfile(
    @CurrentUser() currentUser: CurrentUserInfo,
    @Body(new JoiValidationPipe(userForUpdateSchema)) newUser: UserForUpdate,
    @UploadedFile() file: any,
  ) {
    newUser.img_path = file.path + '.' + file.originalname.split('.')[1];
    return await this.userService.updateProfile(currentUser.userId, newUser);
  }
}
