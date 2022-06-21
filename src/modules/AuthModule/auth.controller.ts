import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Redirect,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { AuthorizationError } from 'src/errors/errors';
import { GoogleUser } from './dto/googleuser.dto';
import { UserForRegister } from './dto/userforregister.dto';
import { AuthService } from './auth.service';
import { UserLogin } from './dto/userlogin.dto';
import { CurrentUser } from 'src/decorators/currentuser.decorator';
import { AuthType } from 'src/enums/authtype.enum';
import { JoiValidationPipe } from 'src/validation/joivalidation.pipe';
import { userForRegisterSchema } from 'src/validation/schemas/userForRegister.schema';
import { userLoginSchema } from 'src/validation/schemas/userLogin.schema';
import { diskStorage } from 'multer';
import { imageFileFilter } from 'src/helpers/imageFilter.helpers';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async userRegistration(
    @Body(new JoiValidationPipe(userForRegisterSchema))
    userForRegister: UserForRegister,
  ) {
    const user: User = await this.authService.registerUser(
      userForRegister,
      AuthType.Basic,
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userForView } = user;
    return userForView;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new JoiValidationPipe(userLoginSchema))
  async userLogin(@Body() userLogin: UserLogin, @Res() res) {
    const user = await this.authService.login(userLogin);

    if (user.auth === AuthType.Google) {
      Redirect('/auth/googlelogin', 301);
    }

    const token = await this.authService.genToken({
      email: user.email,
      role: user.role,
      userId: user.id,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userForView } = user;

    res.set('Authorization', token.access_token);
    res.json(userForView);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@CurrentUser() googleUser: GoogleUser, @Res() res) {
    if (!googleUser) {
      throw new AuthorizationError('Failed google authorization');
    }
    const user: User = await this.authService.registerUser(
      googleUser as GoogleUser,
      AuthType.Google,
    );
    const token = await this.authService.genToken({
      email: googleUser.email,
      role: user.role,
      userId: user.id,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userForView } = user;

    res.set('Authorization', token.access_token);
    res.json({ user: userForView, token: token });
  }
}
