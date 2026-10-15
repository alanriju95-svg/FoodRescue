import { PickupStatus } from '../../common/enums/index.js';
import { User } from '../../users/models/user.model.js';
import { Delivery } from '../../deliveries/models/delivery.model.js';
export declare class PickupTask {
    id: string;
    donationId: string;
    volunteerId: string;
    status: PickupStatus;
    notes?: string | null;
    pickedUpAt?: Date | null;
    deliveredAt?: Date | null;
    volunteer?: User;
    delivery?: Delivery | null;
    createdAt: Date;
    updatedAt: Date;
}
