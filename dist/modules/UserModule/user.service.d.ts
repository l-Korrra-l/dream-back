import { User } from '@prisma/client';
import { UserRepository } from 'src/persistance/repository/user.repository';
import { UserForUpdate } from './dto/userforupdate.dto';
export declare class UserService {
    private userRepository;
    constructor(userRepository: UserRepository);
    getProfile(id: string): Promise<User>;
    updateProfile(userId: string, inputUser: UserForUpdate): Promise<User>;
}
