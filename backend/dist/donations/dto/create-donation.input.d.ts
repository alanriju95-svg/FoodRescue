import { FoodCategory } from '../../common/enums/index.js';
export declare class CreateDonationInput {
    foodName: string;
    description: string;
    category: FoodCategory;
    quantity: number;
    unit: string;
    pickupLocation: string;
    pickupAvailableTime: string;
    pickupDeadline: Date;
    expiryDeadline: Date;
    storageNotes?: string;
    imageUrl?: string;
}
