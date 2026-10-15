export declare class Delivery {
    id: string;
    taskId: string;
    recipientConfirmation: boolean;
    confirmedAt?: Date | null;
    proofNotes?: string | null;
    createdAt: Date;
}
