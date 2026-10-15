import { FoodCategory, DonationStatus } from '../../common/enums/index.js';
import { User } from '../../users/models/user.model.js';
import { DonationRequest } from '../../requests/models/request.model.js';
import { PickupTask } from '../../pickups/models/pickup-task.model.js';
export declare class Donation {
    id: string;
    donorId: string;
    foodName: string;
    description: string;
    category: FoodCategory;
    quantity: number;
    unit: string;
    pickupLocation: string;
    pickupAvailableTime: string;
    pickupDeadline: Date;
    expiryDeadline: Date;
    status: DonationStatus;
    storageNotes?: string | null;
    imageUrl?: string | null;
    donor?: User;
    requests?: DonationRequest[];
    pickupTasks?: PickupTask[];
    currentRequest?: DonationRequest | null;
    currentTask?: PickupTask | null;
    createdAt: Date;
    updatedAt: Date;
}
