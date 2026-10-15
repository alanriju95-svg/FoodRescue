import { registerEnumType } from '@nestjs/graphql';
import { UserRole, FoodCategory, DonationStatus, RequestStatus, PickupStatus, } from '@prisma/client';
export { UserRole, FoodCategory, DonationStatus, RequestStatus, PickupStatus, };
registerEnumType(UserRole, {
    name: 'UserRole',
    description: 'User access role: DONOR, VOLUNTEER, or RECEIVER',
});
registerEnumType(FoodCategory, {
    name: 'FoodCategory',
    description: 'Category of surplus food item',
});
registerEnumType(DonationStatus, {
    name: 'DonationStatus',
    description: 'Lifecycle status of a food donation',
});
registerEnumType(RequestStatus, {
    name: 'RequestStatus',
    description: 'Status of a food donation request',
});
registerEnumType(PickupStatus, {
    name: 'PickupStatus',
    description: 'Status of a volunteer pickup task',
});
//# sourceMappingURL=index.js.map