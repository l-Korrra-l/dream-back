import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { GoogleUser } from './dto/googleuser.dto';
import { UserRepository } from 'src/persistance/repository/user.repository';
import { UserForRegister } from './dto/userforregister.dto';
import { UserLogin } from './dto/userlogin.dto';
import { AuthType } from 'src/enums/authtype.enum';
export declare class AuthService {
    private jwtService;
    private userRepository;
    constructor(jwtService: JwtService, userRepository: UserRepository);
    registerUser(inputUser: UserForRegister | GoogleUser, authType: AuthType): Promise<User>;
    login(userLogin: UserLogin): Promise<User>;
    genToken(user: any): Promise<{
        access_token: string;
    }>;
}
