import { PickupsService } from './pickups.service.js';
import { PickupTask } from './models/pickup-task.model.js';
import { Donation } from '../donations/models/donation.model.js';
import { VolunteerStats } from '../common/dto/stats.type.js';
import { PickupStatus } from '../common/enums/index.js';
export declare class PickupsResolver {
    private readonly pickupsService;
    constructor(pickupsService: PickupsService);
    availablePickupTasks(): Promise<Donation[]>;
    myTasks(user: any): Promise<PickupTask[]>;
    myTaskHistory(user: any): Promise<PickupTask[]>;
    pickupTask(id: string): Promise<PickupTask>;
    volunteerStats(user: any): Promise<VolunteerStats>;
    acceptPickup(user: any, donationId: string, notes?: string): Promise<PickupTask>;
    updatePickupStatus(user: any, taskId: string, status: PickupStatus): Promise<PickupTask>;
    confirmDelivery(user: any, taskId: string, proofNotes?: string): Promise<PickupTask>;
    confirmReceipt(user: any, donationId: string, notes?: string): Promise<Donation>;
}
