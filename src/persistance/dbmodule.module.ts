import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { prismaConfigAsync } from 'src/config/prisma.config';

@Module({
  imports: [PrismaModule.forRootAsync(prismaConfigAsync)],
  providers: [
    // UserRepository,
    // RecordRepository,
    // ReviewRepository,
    // OrderRepository,
    // StorageService,
  ],
  exports: [
    // UserRepository,
    // RecordRepository,
    // ReviewRepository,
    // OrderRepository,
    // StorageService,
  ],
})
export class DbModule {}
