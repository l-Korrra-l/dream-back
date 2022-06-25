import { CurrentUserInfo } from 'src/types/types';
import { UserForUpdate } from './dto/userforupdate.dto';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUserProfile(user: CurrentUserInfo): Promise<User>;
    updateuserProfile(currentUser: CurrentUserInfo, newUser: UserForUpdate, file: any): Promise<User>;
}
