import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConfigAsync } from 'src/config/jwt.config';
import { passportConfigAsync } from 'src/config/passport.config';
import { DbModule } from 'src/persistance/dbmodule.module';
import { ImageModule } from '../ImageModule/image.modue';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RolesGuard } from './guards/roles.guard';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.registerAsync(passportConfigAsync),
    JwtModule.registerAsync(jwtConfigAsync),
    DbModule,
    ImageModule,
  ],
  controllers: [AuthController],
  providers: [GoogleStrategy, JwtStrategy, AuthService, RolesGuard],
})
export class AuthModule {}
