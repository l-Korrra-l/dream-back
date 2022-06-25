import { GoogleUser } from './dto/googleuser.dto';
import { UserForRegister } from './dto/userforregister.dto';
import { AuthService } from './auth.service';
import { UserLogin } from './dto/userlogin.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    userRegistration(userForRegister: UserForRegister): Promise<User>;
    userLogin(userLogin: UserLogin, res: any): Promise<void>;
    userLoging(res: any): Promise<void>;
    userLoginrg(req: any, res: any): Promise<void>;
    googleAuth(req: any): Promise<void>;
    googleAuthRedirect(googleUser: GoogleUser, res: any): Promise<void>;
}
