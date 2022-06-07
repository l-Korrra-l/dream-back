import { AdminService } from './admin.service';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    deleteUserByAdmin(userId: any): Promise<void>;
    deleteProductByAdmin(productId: any): Promise<void>;
    deleteReviewByAdmin(recordId: any): Promise<void>;
}
