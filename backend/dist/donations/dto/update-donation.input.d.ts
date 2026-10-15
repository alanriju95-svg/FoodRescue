import { FoodCategory, DonationStatus } from '../../common/enums/index.js';
export declare class UpdateDonationInput {
    foodName?: string;
    description?: string;
    category?: FoodCategory;
    quantity?: number;
    unit?: string;
    pickupLocation?: string;
    pickupAvailableTime?: string;
    pickupDeadline?: Date;
    expiryDeadline?: Date;
    storageNotes?: string;
    imageUrl?: string;
    status?: DonationStatus;
}
