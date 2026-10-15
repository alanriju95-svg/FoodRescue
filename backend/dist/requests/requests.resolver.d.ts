import { RequestsService } from './requests.service.js';
import { DonationRequest } from './models/request.model.js';
import { CreateRequestInput } from './dto/create-request.input.js';
import { ReceiverStats } from '../common/dto/stats.type.js';
export declare class RequestsResolver {
    private readonly requestsService;
    constructor(requestsService: RequestsService);
    myRequests(user: any): Promise<DonationRequest[]>;
    donationRequest(id: string): Promise<DonationRequest>;
    receiverStats(user: any): Promise<ReceiverStats>;
    requestDonation(user: any, input: CreateRequestInput): Promise<DonationRequest>;
    cancelRequest(user: any, id: string): Promise<DonationRequest>;
}
