import { PrismaClient, UserRole, FoodCategory, DonationStatus, RequestStatus, PickupStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting FoodRescue database seeding...');

  // Hash password
  const passwordHash = await bcrypt.hash('password123', 10);

  // 1. Create Users
  const donor1 = await prisma.user.upsert({
    where: { email: 'donor@foodrescue.org' },
    update: { passwordHash, role: UserRole.DONOR },
    create: {
      email: 'donor@foodrescue.org',
      passwordHash,
      name: 'Elena Rostova',
      role: UserRole.DONOR,
      organization: 'Green Leaf Bistro & Catering',
      phone: '+1 (555) 234-5678',
      address: '742 Evergreen Terrace, Downtown',
      city: 'Metro City',
      bio: 'Farm-to-table organic restaurant committed to zero food waste.',
    },
  });

  const donor2 = await prisma.user.upsert({
    where: { email: 'bakery@foodrescue.org' },
    update: { passwordHash, role: UserRole.DONOR },
    create: {
      email: 'bakery@foodrescue.org',
      passwordHash,
      name: 'Marco Bellini',
      role: UserRole.DONOR,
      organization: 'Artisan Crust Bakery',
      phone: '+1 (555) 345-6789',
      address: '120 Baker Street, Old Quarter',
      city: 'Metro City',
      bio: 'Daily fresh sourdough, pastries, and bread handcrafted with love.',
    },
  });

  const volunteer = await prisma.user.upsert({
    where: { email: 'volunteer@foodrescue.org' },
    update: { passwordHash, role: UserRole.VOLUNTEER },
    create: {
      email: 'volunteer@foodrescue.org',
      passwordHash,
      name: 'Alex Rivera',
      role: UserRole.VOLUNTEER,
      phone: '+1 (555) 456-7890',
      address: '88 Velocity Way, Westside',
      city: 'Metro City',
      vehicleType: 'Car (Honda Civic with thermal bags)',
      bio: 'Passionate food rescue champion and community driver.',
    },
  });

  const receiver = await prisma.user.upsert({
    where: { email: 'receiver@foodrescue.org' },
    update: { passwordHash, role: UserRole.RECEIVER },
    create: {
      email: 'receiver@foodrescue.org',
      passwordHash,
      name: 'Sarah Jenkins',
      role: UserRole.RECEIVER,
      organization: 'Hope Community Shelter & Kitchen',
      phone: '+1 (555) 567-8901',
      address: '450 Compassion Blvd, North District',
      city: 'Metro City',
      bio: 'Non-profit shelter serving 200+ warm meals daily to vulnerable families.',
    },
  });

  console.log('✅ Users created:');
  console.log('   Donor:     donor@foodrescue.org / password123');
  console.log('   Bakery:    bakery@foodrescue.org / password123');
  console.log('   Volunteer: volunteer@foodrescue.org / password123');
  console.log('   Receiver:  receiver@foodrescue.org / password123');

  // Clear previous donation items to re-seed cleanly
  await prisma.delivery.deleteMany();
  await prisma.pickupTask.deleteMany();
  await prisma.donationRequest.deleteMany();
  await prisma.donation.deleteMany();

  const now = new Date();
  const todayAtHours = (h: number) => {
    const d = new Date();
    d.setHours(d.getHours() + h);
    return d;
  };

  // 2. Donation 1: AVAILABLE - Fresh Sourdough & Pastries
  await prisma.donation.create({
    data: {
      donorId: donor2.id,
      foodName: 'Fresh Sourdough Loaves & Croissants',
      description: 'End-of-day artisanal sourdough batards, baguettes, and assorted almond croissants baked this morning.',
      category: FoodCategory.BAKERY,
      quantity: 35,
      unit: 'loaves & pastries',
      pickupLocation: '120 Baker Street (Back Alley Entrance)',
      pickupAvailableTime: '6:00 PM - 8:30 PM Today',
      pickupDeadline: todayAtHours(6),
      expiryDeadline: todayAtHours(24),
      status: DonationStatus.AVAILABLE,
      storageNotes: 'Store in dry place, consume or freeze within 2 days.',
    },
  });

  // 3. Donation 2: AVAILABLE - Organic Mediterranean Bowls
  await prisma.donation.create({
    data: {
      donorId: donor1.id,
      foodName: 'Organic Mediterranean Grain Bowls',
      description: 'Pre-packaged catering bowls with quinoa, roasted chickpeas, feta cheese, kale, and lemon tahini dressing.',
      category: FoodCategory.COOKED_MEALS,
      quantity: 25,
      unit: 'bowls',
      pickupLocation: '742 Evergreen Terrace (Kitchen Door)',
      pickupAvailableTime: '3:00 PM - 5:00 PM Today',
      pickupDeadline: todayAtHours(4),
      expiryDeadline: todayAtHours(18),
      status: DonationStatus.AVAILABLE,
      storageNotes: 'Keep chilled under 4°C. Contains sesame & dairy.',
    },
  });

  // 4. Donation 3: REQUESTED - Fresh Organic Produce Crates
  const donationReq = await prisma.donation.create({
    data: {
      donorId: donor1.id,
      foodName: 'Fresh Organic Produce Crates',
      description: 'Surplus heirloom tomatoes, bell peppers, cucumbers, and fresh herbs from morning farm delivery.',
      category: FoodCategory.PRODUCE,
      quantity: 40,
      unit: 'kg',
      pickupLocation: '742 Evergreen Terrace (Loading Dock B)',
      pickupAvailableTime: '1:00 PM - 4:00 PM Today',
      pickupDeadline: todayAtHours(5),
      expiryDeadline: todayAtHours(48),
      status: DonationStatus.REQUESTED,
      storageNotes: 'Cool dry area. Excellent crisp condition.',
    },
  });

  await prisma.donationRequest.create({
    data: {
      donationId: donationReq.id,
      receiverId: receiver.id,
      deliveryAddress: '450 Compassion Blvd, North District Kitchen',
      status: RequestStatus.PENDING,
      notes: 'Needed for our evening community dinner prep. Thanks so much!',
    },
  });

  // 5. Donation 4: PICKUP_ASSIGNED - Roasted Chicken & Rice
  const donationAssigned = await prisma.donation.create({
    data: {
      donorId: donor1.id,
      foodName: 'Herb-Roasted Chicken & Saffron Rice',
      description: 'Freshly prepared hot trays from corporate lunch banquet. Untouched, hygienically hot-held.',
      category: FoodCategory.COOKED_MEALS,
      quantity: 45,
      unit: 'portions',
      pickupLocation: '742 Evergreen Terrace (Front Desk)',
      pickupAvailableTime: '2:00 PM - 4:00 PM',
      pickupDeadline: todayAtHours(3),
      expiryDeadline: todayAtHours(12),
      status: DonationStatus.PICKUP_ASSIGNED,
      storageNotes: 'Keep hot or refrigerate immediately upon collection.',
    },
  });

  await prisma.donationRequest.create({
    data: {
      donationId: donationAssigned.id,
      receiverId: receiver.id,
      deliveryAddress: '450 Compassion Blvd, North District Kitchen',
      status: RequestStatus.APPROVED,
      notes: 'Urgent need for shelter residents.',
    },
  });

  await prisma.pickupTask.create({
    data: {
      donationId: donationAssigned.id,
      volunteerId: volunteer.id,
      status: PickupStatus.ASSIGNED,
      notes: 'En route with insulated thermal food containers.',
    },
  });

  // 6. Donation 5: PICKED_UP - Dairy & Greek Yogurt
  const donationPickedUp = await prisma.donation.create({
    data: {
      donorId: donor2.id,
      foodName: 'Organic Whole Milk & Greek Yogurt Pails',
      description: 'Pasteurized whole milk gallons and unopened plain Greek yogurt buckets from supplier surplus.',
      category: FoodCategory.DAIRY_EGGS,
      quantity: 30,
      unit: 'liters/kg',
      pickupLocation: '120 Baker Street, Cold Storage',
      pickupAvailableTime: 'Morning Window',
      pickupDeadline: todayAtHours(2),
      expiryDeadline: todayAtHours(72),
      status: DonationStatus.PICKED_UP,
      storageNotes: 'Must be transported in cooler with ice packs.',
    },
  });

  await prisma.donationRequest.create({
    data: {
      donationId: donationPickedUp.id,
      receiverId: receiver.id,
      deliveryAddress: '450 Compassion Blvd, North District Kitchen',
      status: RequestStatus.APPROVED,
    },
  });

  await prisma.pickupTask.create({
    data: {
      donationId: donationPickedUp.id,
      volunteerId: volunteer.id,
      status: PickupStatus.PICKED_UP,
      pickedUpAt: new Date(Date.now() - 25 * 60 * 1000), // 25 mins ago
      notes: 'Collected from bakery cold room. Currently in transit to shelter.',
    },
  });

  // 7. Donation 6: DELIVERED - Gourmet Deli Sandwiches
  const donationDelivered = await prisma.donation.create({
    data: {
      donorId: donor1.id,
      foodName: 'Assorted Gourmet Deli Sandwiches & Wraps',
      description: 'Turkey avocado, smoked mozzarella & basil, and grilled vegetable wraps individually wrapped.',
      category: FoodCategory.COOKED_MEALS,
      quantity: 50,
      unit: 'sandwiches',
      pickupLocation: '742 Evergreen Terrace',
      pickupAvailableTime: '11:00 AM',
      pickupDeadline: todayAtHours(1),
      expiryDeadline: todayAtHours(10),
      status: DonationStatus.DELIVERED,
      storageNotes: 'Keep cool.',
    },
  });

  await prisma.donationRequest.create({
    data: {
      donationId: donationDelivered.id,
      receiverId: receiver.id,
      deliveryAddress: '450 Compassion Blvd, North District Kitchen',
      status: RequestStatus.APPROVED,
    },
  });

  const taskDelivered = await prisma.pickupTask.create({
    data: {
      donationId: donationDelivered.id,
      volunteerId: volunteer.id,
      status: PickupStatus.DELIVERED,
      pickedUpAt: new Date(Date.now() - 60 * 60 * 1000),
      deliveredAt: new Date(Date.now() - 10 * 60 * 1000),
      notes: 'Handed off to shelter intake staff at loading dock.',
    },
  });

  await prisma.delivery.create({
    data: {
      taskId: taskDelivered.id,
      recipientConfirmation: false,
      proofNotes: 'Delivered 50 sandwich boxes in clean insulated bins.',
    },
  });

  // 8. Donation 7: COMPLETED - Hearty Vegetable Minestrone & Focaccia
  const donationCompleted = await prisma.donation.create({
    data: {
      donorId: donor2.id,
      foodName: 'Hearty Vegetable Minestrone & Herb Focaccia',
      description: '60 portions of slow-simmered vegetable bean soup with fresh rosemary focaccia squares.',
      category: FoodCategory.COOKED_MEALS,
      quantity: 60,
      unit: 'portions',
      pickupLocation: '120 Baker Street',
      pickupAvailableTime: 'Yesterday 5:00 PM',
      pickupDeadline: new Date(Date.now() - 24 * 3600 * 1000),
      expiryDeadline: new Date(Date.now() + 12 * 3600 * 1000),
      status: DonationStatus.COMPLETED,
      storageNotes: 'Reheated and distributed.',
    },
  });

  await prisma.donationRequest.create({
    data: {
      donationId: donationCompleted.id,
      receiverId: receiver.id,
      deliveryAddress: '450 Compassion Blvd, North District Kitchen',
      status: RequestStatus.FULFILLED,
    },
  });

  const taskCompleted = await prisma.pickupTask.create({
    data: {
      donationId: donationCompleted.id,
      volunteerId: volunteer.id,
      status: PickupStatus.DELIVERED,
      pickedUpAt: new Date(Date.now() - 22 * 3600 * 1000),
      deliveredAt: new Date(Date.now() - 20 * 3600 * 1000),
      notes: 'Delivered successfully.',
    },
  });

  await prisma.delivery.create({
    data: {
      taskId: taskCompleted.id,
      recipientConfirmation: true,
      confirmedAt: new Date(Date.now() - 19 * 3600 * 1000),
      proofNotes: 'Confirmed received by Sarah Jenkins, distributed at dinner service.',
    },
  });

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
