export type UserRole = 'DONOR' | 'VOLUNTEER' | 'RECEIVER';

export type FoodCategory =
  | 'COOKED_MEALS'
  | 'BAKERY'
  | 'PRODUCE'
  | 'DAIRY_EGGS'
  | 'PACKAGED'
  | 'BEVERAGES'
  | 'OTHER';

export type DonationStatus =
  | 'AVAILABLE'
  | 'REQUESTED'
  | 'PICKUP_ASSIGNED'
  | 'PICKED_UP'
  | 'DELIVERED'
  | 'COMPLETED'
  | 'CANCELLED';

export type RequestStatus = 'PENDING' | 'APPROVED' | 'FULFILLED' | 'CANCELLED';

export type PickupStatus = 'ASSIGNED' | 'PICKED_UP' | 'DELIVERED' | 'CANCELLED';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string | null;
  role: UserRole;
  organization?: string | null;
  address?: string | null;
  city?: string | null;
  bio?: string | null;
  vehicleType?: string | null;
  createdAt: string;
}

export interface Delivery {
  id: string;
  taskId: string;
  recipientConfirmation: boolean;
  confirmedAt?: string | null;
  proofNotes?: string | null;
  createdAt: string;
}

export interface PickupTask {
  id: string;
  donationId: string;
  volunteerId: string;
  status: PickupStatus;
  notes?: string | null;
  pickedUpAt?: string | null;
  deliveredAt?: string | null;
  volunteer?: User;
  donation?: Donation;
  delivery?: Delivery | null;
  createdAt: string;
  updatedAt: string;
}

export interface DonationRequest {
  id: string;
  donationId: string;
  receiverId: string;
  deliveryAddress: string;
  status: RequestStatus;
  notes?: string | null;
  receiver?: User;
  donation?: Donation;
  createdAt: string;
  updatedAt: string;
}

export interface Donation {
  id: string;
  donorId: string;
  donor?: User;
  foodName: string;
  description: string;
  category: FoodCategory;
  quantity: number;
  unit: string;
  pickupLocation: string;
  pickupAvailableTime: string;
  pickupDeadline: string;
  expiryDeadline: string;
  status: DonationStatus;
  storageNotes?: string | null;
  imageUrl?: string | null;
  currentRequest?: DonationRequest | null;
  currentTask?: PickupTask | null;
  requests?: DonationRequest[];
  pickupTasks?: PickupTask[];
  createdAt: string;
  updatedAt: string;
}

export interface DonorStats {
  totalDonations: number;
  activeDonations: number;
  completedDonations: number;
  pendingRequests: number;
  totalMealsSaved: number;
}

export interface VolunteerStats {
  availableTasks: number;
  activeTasks: number;
  completedPickups: number;
  todayTasks: number;
}

export interface ReceiverStats {
  availableFood: number;
  pendingRequests: number;
  activeDeliveries: number;
  completedRequests: number;
}

export interface PlatformStats {
  totalDonations: number;
  totalMealsRescued: number;
  activeVolunteers: number;
  communityPartners: number;
}
