import { Role } from 'src/enums/role.enum';
export declare type SaveImageInfo = {
    imageUrl: string;
    imageId: string;
};
export declare type CurrentUserInfo = {
    userId: string;
    email: string;
    role: Role;
};
export declare type StatsInfo = {
    count: number;
    sum: number;
};
