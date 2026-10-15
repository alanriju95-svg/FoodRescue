import { RequestStatus } from '../../common/enums/index.js';
import { User } from '../../users/models/user.model.js';
export declare class DonationRequest {
    id: string;
    donationId: string;
    receiverId: string;
    deliveryAddress: string;
    status: RequestStatus;
    notes?: string | null;
    receiver?: User;
    createdAt: Date;
    updatedAt: Date;
}
