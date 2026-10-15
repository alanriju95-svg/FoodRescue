import { UserRole } from '../../common/enums/index.js';
export declare class User {
    id: string;
    email: string;
    name: string;
    phone?: string | null;
    role: UserRole;
    organization?: string | null;
    address?: string | null;
    city?: string | null;
    bio?: string | null;
    vehicleType?: string | null;
    createdAt: Date;
    updatedAt: Date;
}
