import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { Repository } from './repository.interface';
export declare class UserRepository implements Repository<string, Prisma.UserCreateInput, Prisma.UserUpdateInput, User> {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.UserCreateInput): Promise<User>;
    update(userId: string, data: Prisma.UserUpdateInput): Promise<User>;
    delete(userId: string): Promise<boolean>;
    findOne(id: string): Promise<User>;
    findAll(): Promise<User[]>;
    findForView(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    getById(id: string): Promise<User>;
    canRegister(email: string): Promise<boolean>;
}
