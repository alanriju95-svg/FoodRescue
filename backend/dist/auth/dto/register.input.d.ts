import { UserRole } from '../../common/enums/index.js';
export declare class RegisterInput {
    email: string;
    password: string;
    name: string;
    role: UserRole;
    phone?: string;
    organization?: string;
    address?: string;
    city?: string;
    vehicleType?: string;
}
