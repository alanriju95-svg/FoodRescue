import { DonationsService } from './donations.service.js';
import { Donation } from './models/donation.model.js';
import { CreateDonationInput } from './dto/create-donation.input.js';
import { UpdateDonationInput } from './dto/update-donation.input.js';
import { DonationStatus, FoodCategory } from '../common/enums/index.js';
import { DonorStats, PlatformStats } from '../common/dto/stats.type.js';
export declare class DonationsResolver {
    private readonly donationsService;
    constructor(donationsService: DonationsService);
    donations(status?: DonationStatus, category?: FoodCategory, search?: string): Promise<Donation[]>;
    availableDonations(): Promise<Donation[]>;
    donation(id: string): Promise<Donation>;
    myDonations(user: any): Promise<Donation[]>;
    donorStats(user: any): Promise<DonorStats>;
    platformStats(): Promise<PlatformStats>;
    createDonation(user: any, input: CreateDonationInput): Promise<Donation>;
    updateDonation(user: any, id: string, input: UpdateDonationInput): Promise<Donation>;
    cancelDonation(user: any, id: string): Promise<Donation>;
}
