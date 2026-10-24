function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
        r = Reflect.decorate(decorators, target, key, desc);
    } else {
        for(var i = decorators.length - 1; i >= 0; i--){
            if (d = decorators[i]) {
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            }
        }
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") {
        return Reflect.metadata(metadataKey, metadataValue);
    }
}
import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { DonationStatus, UserRole, RequestStatus } from '../common/enums/index.js';
export class DonationsService {
    constructor(prisma){
        this.prisma = prisma;
    }
    async create(donorId, input) {
        return this.prisma.donation.create({
            data: {
                donorId,
                foodName: input.foodName,
                description: input.description,
                category: input.category,
                quantity: input.quantity,
                unit: input.unit,
                pickupLocation: input.pickupLocation,
                pickupAvailableTime: input.pickupAvailableTime,
                pickupDeadline: input.pickupDeadline,
                expiryDeadline: input.expiryDeadline,
                status: DonationStatus.AVAILABLE,
                storageNotes: input.storageNotes,
                imageUrl: input.imageUrl
            },
            include: {
                donor: true
            }
        });
    }
    async findAll(filter) {
        const where = {};
        if (filter?.status) {
            where.status = filter.status;
        }
        if (filter?.category) {
            where.category = filter.category;
        }
        if (filter?.search) {
            where.OR = [
                {
                    foodName: {
                        contains: filter.search,
                        mode: 'insensitive'
                    }
                },
                {
                    description: {
                        contains: filter.search,
                        mode: 'insensitive'
                    }
                },
                {
                    pickupLocation: {
                        contains: filter.search,
                        mode: 'insensitive'
                    }
                }
            ];
        }
        const items = await this.prisma.donation.findMany({
            where,
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                donor: true,
                requests: {
                    include: {
                        receiver: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                },
                pickupTasks: {
                    include: {
                        volunteer: true,
                        delivery: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        });
        return items.map((item)=>this.attachActiveRelations(item));
    }
    async findAvailable() {
        const items = await this.prisma.donation.findMany({
            where: {
                status: DonationStatus.AVAILABLE,
                expiryDeadline: {
                    gt: new Date()
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                donor: true,
                requests: {
                    include: {
                        receiver: true
                    }
                },
                pickupTasks: {
                    include: {
                        volunteer: true,
                        delivery: true
                    }
                }
            }
        });
        return items.map((item)=>this.attachActiveRelations(item));
    }
    async findByDonor(donorId) {
        const items = await this.prisma.donation.findMany({
            where: {
                donorId
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                donor: true,
                requests: {
                    include: {
                        receiver: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                },
                pickupTasks: {
                    include: {
                        volunteer: true,
                        delivery: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        });
        return items.map((item)=>this.attachActiveRelations(item));
    }
    async findById(id) {
        const item = await this.prisma.donation.findUnique({
            where: {
                id
            },
            include: {
                donor: true,
                requests: {
                    include: {
                        receiver: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                },
                pickupTasks: {
                    include: {
                        volunteer: true,
                        delivery: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        });
        if (!item) {
            throw new NotFoundException(`Donation with ID ${id} not found`);
        }
        return this.attachActiveRelations(item);
    }
    async update(donorId, id, input) {
        const donation = await this.findById(id);
        if (donation.donorId !== donorId) {
            throw new ForbiddenException('You are not authorized to modify this donation');
        }
        if (donation.status === DonationStatus.COMPLETED || donation.status === DonationStatus.DELIVERED) {
            throw new BadRequestException('Cannot edit a delivered or completed donation');
        }
        const updated = await this.prisma.donation.update({
            where: {
                id
            },
            data: {
                ...input.foodName && {
                    foodName: input.foodName
                },
                ...input.description && {
                    description: input.description
                },
                ...input.category && {
                    category: input.category
                },
                ...input.quantity !== undefined && {
                    quantity: input.quantity
                },
                ...input.unit && {
                    unit: input.unit
                },
                ...input.pickupLocation && {
                    pickupLocation: input.pickupLocation
                },
                ...input.pickupAvailableTime && {
                    pickupAvailableTime: input.pickupAvailableTime
                },
                ...input.pickupDeadline && {
                    pickupDeadline: input.pickupDeadline
                },
                ...input.expiryDeadline && {
                    expiryDeadline: input.expiryDeadline
                },
                ...input.storageNotes !== undefined && {
                    storageNotes: input.storageNotes
                },
                ...input.imageUrl !== undefined && {
                    imageUrl: input.imageUrl
                }
            },
            include: {
                donor: true,
                requests: {
                    include: {
                        receiver: true
                    }
                },
                pickupTasks: {
                    include: {
                        volunteer: true,
                        delivery: true
                    }
                }
            }
        });
        return this.attachActiveRelations(updated);
    }
    async cancel(donorId, id) {
        const donation = await this.findById(id);
        if (donation.donorId !== donorId) {
            throw new ForbiddenException('You are not authorized to cancel this donation');
        }
        if (donation.status === DonationStatus.PICKED_UP || donation.status === DonationStatus.DELIVERED || donation.status === DonationStatus.COMPLETED) {
            throw new BadRequestException(`Cannot cancel donation that is currently ${donation.status}. The food has already been collected.`);
        }
        const updated = await this.prisma.donation.update({
            where: {
                id
            },
            data: {
                status: DonationStatus.CANCELLED
            },
            include: {
                donor: true,
                requests: {
                    include: {
                        receiver: true
                    }
                },
                pickupTasks: {
                    include: {
                        volunteer: true,
                        delivery: true
                    }
                }
            }
        });
        return this.attachActiveRelations(updated);
    }
    async getDonorStats(donorId) {
        const totalDonations = await this.prisma.donation.count({
            where: {
                donorId
            }
        });
        const activeDonations = await this.prisma.donation.count({
            where: {
                donorId,
                status: {
                    in: [
                        DonationStatus.AVAILABLE,
                        DonationStatus.REQUESTED,
                        DonationStatus.PICKUP_ASSIGNED,
                        DonationStatus.PICKED_UP
                    ]
                }
            }
        });
        const completedDonations = await this.prisma.donation.count({
            where: {
                donorId,
                status: DonationStatus.COMPLETED
            }
        });
        const pendingRequests = await this.prisma.donationRequest.count({
            where: {
                donation: {
                    donorId
                },
                status: RequestStatus.PENDING
            }
        });
        const completedItems = await this.prisma.donation.findMany({
            where: {
                donorId,
                status: DonationStatus.COMPLETED
            },
            select: {
                quantity: true
            }
        });
        const totalMealsSaved = Math.round(completedItems.reduce((acc, curr)=>acc + (curr.quantity || 0), 0));
        return {
            totalDonations,
            activeDonations,
            completedDonations,
            pendingRequests,
            totalMealsSaved
        };
    }
    async getPlatformStats() {
        const totalDonations = await this.prisma.donation.count();
        const completedItems = await this.prisma.donation.findMany({
            where: {
                status: DonationStatus.COMPLETED
            },
            select: {
                quantity: true
            }
        });
        const totalMealsRescued = Math.round(completedItems.reduce((acc, curr)=>acc + (curr.quantity || 0), 0));
        const activeVolunteers = await this.prisma.user.count({
            where: {
                role: UserRole.VOLUNTEER
            }
        });
        const communityPartners = await this.prisma.user.count({
            where: {
                role: {
                    in: [
                        UserRole.DONOR,
                        UserRole.RECEIVER
                    ]
                }
            }
        });
        return {
            totalDonations,
            totalMealsRescued,
            activeVolunteers,
            communityPartners
        };
    }
    attachActiveRelations(donation) {
        const activeRequest = donation.requests && donation.requests.length > 0 ? donation.requests[0] : null;
        const activeTask = donation.pickupTasks && donation.pickupTasks.length > 0 ? donation.pickupTasks[0] : null;
        return {
            ...donation,
            currentRequest: activeRequest,
            currentTask: activeTask
        };
    }
}
DonationsService = _ts_decorate([
    Injectable(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof PrismaService === "undefined" ? Object : PrismaService
    ])
], DonationsService);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kb25hdGlvbnMvZG9uYXRpb25zLnNlcnZpY2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBJbmplY3RhYmxlLFxyXG4gIE5vdEZvdW5kRXhjZXB0aW9uLFxyXG4gIEZvcmJpZGRlbkV4Y2VwdGlvbixcclxuICBCYWRSZXF1ZXN0RXhjZXB0aW9uLFxyXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcclxuaW1wb3J0IHsgUHJpc21hU2VydmljZSB9IGZyb20gJy4uL3ByaXNtYS9wcmlzbWEuc2VydmljZS5qcyc7XHJcbmltcG9ydCB7IENyZWF0ZURvbmF0aW9uSW5wdXQgfSBmcm9tICcuL2R0by9jcmVhdGUtZG9uYXRpb24uaW5wdXQuanMnO1xyXG5pbXBvcnQgeyBVcGRhdGVEb25hdGlvbklucHV0IH0gZnJvbSAnLi9kdG8vdXBkYXRlLWRvbmF0aW9uLmlucHV0LmpzJztcclxuaW1wb3J0IHtcclxuICBEb25hdGlvblN0YXR1cyxcclxuICBGb29kQ2F0ZWdvcnksXHJcbiAgVXNlclJvbGUsXHJcbiAgUmVxdWVzdFN0YXR1cyxcclxufSBmcm9tICcuLi9jb21tb24vZW51bXMvaW5kZXguanMnO1xyXG5pbXBvcnQgeyBEb25vclN0YXRzLCBQbGF0Zm9ybVN0YXRzIH0gZnJvbSAnLi4vY29tbW9uL2R0by9zdGF0cy50eXBlLmpzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIERvbmF0aW9uc1NlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgcHJpc21hOiBQcmlzbWFTZXJ2aWNlKSB7fVxyXG5cclxuICBhc3luYyBjcmVhdGUoZG9ub3JJZDogc3RyaW5nLCBpbnB1dDogQ3JlYXRlRG9uYXRpb25JbnB1dCkge1xyXG4gICAgcmV0dXJuIHRoaXMucHJpc21hLmRvbmF0aW9uLmNyZWF0ZSh7XHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBkb25vcklkLFxyXG4gICAgICAgIGZvb2ROYW1lOiBpbnB1dC5mb29kTmFtZSxcclxuICAgICAgICBkZXNjcmlwdGlvbjogaW5wdXQuZGVzY3JpcHRpb24sXHJcbiAgICAgICAgY2F0ZWdvcnk6IGlucHV0LmNhdGVnb3J5LFxyXG4gICAgICAgIHF1YW50aXR5OiBpbnB1dC5xdWFudGl0eSxcclxuICAgICAgICB1bml0OiBpbnB1dC51bml0LFxyXG4gICAgICAgIHBpY2t1cExvY2F0aW9uOiBpbnB1dC5waWNrdXBMb2NhdGlvbixcclxuICAgICAgICBwaWNrdXBBdmFpbGFibGVUaW1lOiBpbnB1dC5waWNrdXBBdmFpbGFibGVUaW1lLFxyXG4gICAgICAgIHBpY2t1cERlYWRsaW5lOiBpbnB1dC5waWNrdXBEZWFkbGluZSxcclxuICAgICAgICBleHBpcnlEZWFkbGluZTogaW5wdXQuZXhwaXJ5RGVhZGxpbmUsXHJcbiAgICAgICAgc3RhdHVzOiBEb25hdGlvblN0YXR1cy5BVkFJTEFCTEUsXHJcbiAgICAgICAgc3RvcmFnZU5vdGVzOiBpbnB1dC5zdG9yYWdlTm90ZXMsXHJcbiAgICAgICAgaW1hZ2VVcmw6IGlucHV0LmltYWdlVXJsLFxyXG4gICAgICB9LFxyXG4gICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgZG9ub3I6IHRydWUsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGZpbmRBbGwoZmlsdGVyPzoge1xyXG4gICAgc3RhdHVzPzogRG9uYXRpb25TdGF0dXM7XHJcbiAgICBjYXRlZ29yeT86IEZvb2RDYXRlZ29yeTtcclxuICAgIHNlYXJjaD86IHN0cmluZztcclxuICB9KSB7XHJcbiAgICBjb25zdCB3aGVyZTogYW55ID0ge307XHJcbiAgICBpZiAoZmlsdGVyPy5zdGF0dXMpIHtcclxuICAgICAgd2hlcmUuc3RhdHVzID0gZmlsdGVyLnN0YXR1cztcclxuICAgIH1cclxuICAgIGlmIChmaWx0ZXI/LmNhdGVnb3J5KSB7XHJcbiAgICAgIHdoZXJlLmNhdGVnb3J5ID0gZmlsdGVyLmNhdGVnb3J5O1xyXG4gICAgfVxyXG4gICAgaWYgKGZpbHRlcj8uc2VhcmNoKSB7XHJcbiAgICAgIHdoZXJlLk9SID0gW1xyXG4gICAgICAgIHsgZm9vZE5hbWU6IHsgY29udGFpbnM6IGZpbHRlci5zZWFyY2gsIG1vZGU6ICdpbnNlbnNpdGl2ZScgfSB9LFxyXG4gICAgICAgIHsgZGVzY3JpcHRpb246IHsgY29udGFpbnM6IGZpbHRlci5zZWFyY2gsIG1vZGU6ICdpbnNlbnNpdGl2ZScgfSB9LFxyXG4gICAgICAgIHsgcGlja3VwTG9jYXRpb246IHsgY29udGFpbnM6IGZpbHRlci5zZWFyY2gsIG1vZGU6ICdpbnNlbnNpdGl2ZScgfSB9LFxyXG4gICAgICBdO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGl0ZW1zID0gYXdhaXQgdGhpcy5wcmlzbWEuZG9uYXRpb24uZmluZE1hbnkoe1xyXG4gICAgICB3aGVyZSxcclxuICAgICAgb3JkZXJCeTogeyBjcmVhdGVkQXQ6ICdkZXNjJyB9LFxyXG4gICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgZG9ub3I6IHRydWUsXHJcbiAgICAgICAgcmVxdWVzdHM6IHtcclxuICAgICAgICAgIGluY2x1ZGU6IHsgcmVjZWl2ZXI6IHRydWUgfSxcclxuICAgICAgICAgIG9yZGVyQnk6IHsgY3JlYXRlZEF0OiAnZGVzYycgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBpY2t1cFRhc2tzOiB7XHJcbiAgICAgICAgICBpbmNsdWRlOiB7IHZvbHVudGVlcjogdHJ1ZSwgZGVsaXZlcnk6IHRydWUgfSxcclxuICAgICAgICAgIG9yZGVyQnk6IHsgY3JlYXRlZEF0OiAnZGVzYycgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGl0ZW1zLm1hcCgoaXRlbSkgPT4gdGhpcy5hdHRhY2hBY3RpdmVSZWxhdGlvbnMoaXRlbSkpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZmluZEF2YWlsYWJsZSgpIHtcclxuICAgIGNvbnN0IGl0ZW1zID0gYXdhaXQgdGhpcy5wcmlzbWEuZG9uYXRpb24uZmluZE1hbnkoe1xyXG4gICAgICB3aGVyZToge1xyXG4gICAgICAgIHN0YXR1czogRG9uYXRpb25TdGF0dXMuQVZBSUxBQkxFLFxyXG4gICAgICAgIGV4cGlyeURlYWRsaW5lOiB7IGd0OiBuZXcgRGF0ZSgpIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIG9yZGVyQnk6IHsgY3JlYXRlZEF0OiAnZGVzYycgfSxcclxuICAgICAgaW5jbHVkZToge1xyXG4gICAgICAgIGRvbm9yOiB0cnVlLFxyXG4gICAgICAgIHJlcXVlc3RzOiB7XHJcbiAgICAgICAgICBpbmNsdWRlOiB7IHJlY2VpdmVyOiB0cnVlIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwaWNrdXBUYXNrczoge1xyXG4gICAgICAgICAgaW5jbHVkZTogeyB2b2x1bnRlZXI6IHRydWUsIGRlbGl2ZXJ5OiB0cnVlIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBpdGVtcy5tYXAoKGl0ZW0pID0+IHRoaXMuYXR0YWNoQWN0aXZlUmVsYXRpb25zKGl0ZW0pKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGZpbmRCeURvbm9yKGRvbm9ySWQ6IHN0cmluZykge1xyXG4gICAgY29uc3QgaXRlbXMgPSBhd2FpdCB0aGlzLnByaXNtYS5kb25hdGlvbi5maW5kTWFueSh7XHJcbiAgICAgIHdoZXJlOiB7IGRvbm9ySWQgfSxcclxuICAgICAgb3JkZXJCeTogeyBjcmVhdGVkQXQ6ICdkZXNjJyB9LFxyXG4gICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgZG9ub3I6IHRydWUsXHJcbiAgICAgICAgcmVxdWVzdHM6IHtcclxuICAgICAgICAgIGluY2x1ZGU6IHsgcmVjZWl2ZXI6IHRydWUgfSxcclxuICAgICAgICAgIG9yZGVyQnk6IHsgY3JlYXRlZEF0OiAnZGVzYycgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBpY2t1cFRhc2tzOiB7XHJcbiAgICAgICAgICBpbmNsdWRlOiB7IHZvbHVudGVlcjogdHJ1ZSwgZGVsaXZlcnk6IHRydWUgfSxcclxuICAgICAgICAgIG9yZGVyQnk6IHsgY3JlYXRlZEF0OiAnZGVzYycgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGl0ZW1zLm1hcCgoaXRlbSkgPT4gdGhpcy5hdHRhY2hBY3RpdmVSZWxhdGlvbnMoaXRlbSkpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZmluZEJ5SWQoaWQ6IHN0cmluZykge1xyXG4gICAgY29uc3QgaXRlbSA9IGF3YWl0IHRoaXMucHJpc21hLmRvbmF0aW9uLmZpbmRVbmlxdWUoe1xyXG4gICAgICB3aGVyZTogeyBpZCB9LFxyXG4gICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgZG9ub3I6IHRydWUsXHJcbiAgICAgICAgcmVxdWVzdHM6IHtcclxuICAgICAgICAgIGluY2x1ZGU6IHsgcmVjZWl2ZXI6IHRydWUgfSxcclxuICAgICAgICAgIG9yZGVyQnk6IHsgY3JlYXRlZEF0OiAnZGVzYycgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBpY2t1cFRhc2tzOiB7XHJcbiAgICAgICAgICBpbmNsdWRlOiB7IHZvbHVudGVlcjogdHJ1ZSwgZGVsaXZlcnk6IHRydWUgfSxcclxuICAgICAgICAgIG9yZGVyQnk6IHsgY3JlYXRlZEF0OiAnZGVzYycgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCFpdGVtKSB7XHJcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbihgRG9uYXRpb24gd2l0aCBJRCAke2lkfSBub3QgZm91bmRgKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5hdHRhY2hBY3RpdmVSZWxhdGlvbnMoaXRlbSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyB1cGRhdGUoZG9ub3JJZDogc3RyaW5nLCBpZDogc3RyaW5nLCBpbnB1dDogVXBkYXRlRG9uYXRpb25JbnB1dCkge1xyXG4gICAgY29uc3QgZG9uYXRpb24gPSBhd2FpdCB0aGlzLmZpbmRCeUlkKGlkKTtcclxuICAgIGlmIChkb25hdGlvbi5kb25vcklkICE9PSBkb25vcklkKSB7XHJcbiAgICAgIHRocm93IG5ldyBGb3JiaWRkZW5FeGNlcHRpb24oJ1lvdSBhcmUgbm90IGF1dGhvcml6ZWQgdG8gbW9kaWZ5IHRoaXMgZG9uYXRpb24nKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIGRvbmF0aW9uLnN0YXR1cyA9PT0gRG9uYXRpb25TdGF0dXMuQ09NUExFVEVEIHx8XHJcbiAgICAgIGRvbmF0aW9uLnN0YXR1cyA9PT0gRG9uYXRpb25TdGF0dXMuREVMSVZFUkVEXHJcbiAgICApIHtcclxuICAgICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFeGNlcHRpb24oJ0Nhbm5vdCBlZGl0IGEgZGVsaXZlcmVkIG9yIGNvbXBsZXRlZCBkb25hdGlvbicpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHVwZGF0ZWQgPSBhd2FpdCB0aGlzLnByaXNtYS5kb25hdGlvbi51cGRhdGUoe1xyXG4gICAgICB3aGVyZTogeyBpZCB9LFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgLi4uKGlucHV0LmZvb2ROYW1lICYmIHsgZm9vZE5hbWU6IGlucHV0LmZvb2ROYW1lIH0pLFxyXG4gICAgICAgIC4uLihpbnB1dC5kZXNjcmlwdGlvbiAmJiB7IGRlc2NyaXB0aW9uOiBpbnB1dC5kZXNjcmlwdGlvbiB9KSxcclxuICAgICAgICAuLi4oaW5wdXQuY2F0ZWdvcnkgJiYgeyBjYXRlZ29yeTogaW5wdXQuY2F0ZWdvcnkgfSksXHJcbiAgICAgICAgLi4uKGlucHV0LnF1YW50aXR5ICE9PSB1bmRlZmluZWQgJiYgeyBxdWFudGl0eTogaW5wdXQucXVhbnRpdHkgfSksXHJcbiAgICAgICAgLi4uKGlucHV0LnVuaXQgJiYgeyB1bml0OiBpbnB1dC51bml0IH0pLFxyXG4gICAgICAgIC4uLihpbnB1dC5waWNrdXBMb2NhdGlvbiAmJiB7IHBpY2t1cExvY2F0aW9uOiBpbnB1dC5waWNrdXBMb2NhdGlvbiB9KSxcclxuICAgICAgICAuLi4oaW5wdXQucGlja3VwQXZhaWxhYmxlVGltZSAmJiB7IHBpY2t1cEF2YWlsYWJsZVRpbWU6IGlucHV0LnBpY2t1cEF2YWlsYWJsZVRpbWUgfSksXHJcbiAgICAgICAgLi4uKGlucHV0LnBpY2t1cERlYWRsaW5lICYmIHsgcGlja3VwRGVhZGxpbmU6IGlucHV0LnBpY2t1cERlYWRsaW5lIH0pLFxyXG4gICAgICAgIC4uLihpbnB1dC5leHBpcnlEZWFkbGluZSAmJiB7IGV4cGlyeURlYWRsaW5lOiBpbnB1dC5leHBpcnlEZWFkbGluZSB9KSxcclxuICAgICAgICAuLi4oaW5wdXQuc3RvcmFnZU5vdGVzICE9PSB1bmRlZmluZWQgJiYgeyBzdG9yYWdlTm90ZXM6IGlucHV0LnN0b3JhZ2VOb3RlcyB9KSxcclxuICAgICAgICAuLi4oaW5wdXQuaW1hZ2VVcmwgIT09IHVuZGVmaW5lZCAmJiB7IGltYWdlVXJsOiBpbnB1dC5pbWFnZVVybCB9KSxcclxuICAgICAgfSxcclxuICAgICAgaW5jbHVkZToge1xyXG4gICAgICAgIGRvbm9yOiB0cnVlLFxyXG4gICAgICAgIHJlcXVlc3RzOiB7IGluY2x1ZGU6IHsgcmVjZWl2ZXI6IHRydWUgfSB9LFxyXG4gICAgICAgIHBpY2t1cFRhc2tzOiB7IGluY2x1ZGU6IHsgdm9sdW50ZWVyOiB0cnVlLCBkZWxpdmVyeTogdHJ1ZSB9IH0sXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5hdHRhY2hBY3RpdmVSZWxhdGlvbnModXBkYXRlZCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBjYW5jZWwoZG9ub3JJZDogc3RyaW5nLCBpZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBkb25hdGlvbiA9IGF3YWl0IHRoaXMuZmluZEJ5SWQoaWQpO1xyXG4gICAgaWYgKGRvbmF0aW9uLmRvbm9ySWQgIT09IGRvbm9ySWQpIHtcclxuICAgICAgdGhyb3cgbmV3IEZvcmJpZGRlbkV4Y2VwdGlvbignWW91IGFyZSBub3QgYXV0aG9yaXplZCB0byBjYW5jZWwgdGhpcyBkb25hdGlvbicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChcclxuICAgICAgZG9uYXRpb24uc3RhdHVzID09PSBEb25hdGlvblN0YXR1cy5QSUNLRURfVVAgfHxcclxuICAgICAgZG9uYXRpb24uc3RhdHVzID09PSBEb25hdGlvblN0YXR1cy5ERUxJVkVSRUQgfHxcclxuICAgICAgZG9uYXRpb24uc3RhdHVzID09PSBEb25hdGlvblN0YXR1cy5DT01QTEVURURcclxuICAgICkge1xyXG4gICAgICB0aHJvdyBuZXcgQmFkUmVxdWVzdEV4Y2VwdGlvbihcclxuICAgICAgICBgQ2Fubm90IGNhbmNlbCBkb25hdGlvbiB0aGF0IGlzIGN1cnJlbnRseSAke2RvbmF0aW9uLnN0YXR1c30uIFRoZSBmb29kIGhhcyBhbHJlYWR5IGJlZW4gY29sbGVjdGVkLmBcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB1cGRhdGVkID0gYXdhaXQgdGhpcy5wcmlzbWEuZG9uYXRpb24udXBkYXRlKHtcclxuICAgICAgd2hlcmU6IHsgaWQgfSxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHN0YXR1czogRG9uYXRpb25TdGF0dXMuQ0FOQ0VMTEVELFxyXG4gICAgICB9LFxyXG4gICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgZG9ub3I6IHRydWUsXHJcbiAgICAgICAgcmVxdWVzdHM6IHsgaW5jbHVkZTogeyByZWNlaXZlcjogdHJ1ZSB9IH0sXHJcbiAgICAgICAgcGlja3VwVGFza3M6IHsgaW5jbHVkZTogeyB2b2x1bnRlZXI6IHRydWUsIGRlbGl2ZXJ5OiB0cnVlIH0gfSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmF0dGFjaEFjdGl2ZVJlbGF0aW9ucyh1cGRhdGVkKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGdldERvbm9yU3RhdHMoZG9ub3JJZDogc3RyaW5nKTogUHJvbWlzZTxEb25vclN0YXRzPiB7XHJcbiAgICBjb25zdCB0b3RhbERvbmF0aW9ucyA9IGF3YWl0IHRoaXMucHJpc21hLmRvbmF0aW9uLmNvdW50KHtcclxuICAgICAgd2hlcmU6IHsgZG9ub3JJZCB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgYWN0aXZlRG9uYXRpb25zID0gYXdhaXQgdGhpcy5wcmlzbWEuZG9uYXRpb24uY291bnQoe1xyXG4gICAgICB3aGVyZToge1xyXG4gICAgICAgIGRvbm9ySWQsXHJcbiAgICAgICAgc3RhdHVzOiB7XHJcbiAgICAgICAgICBpbjogW1xyXG4gICAgICAgICAgICBEb25hdGlvblN0YXR1cy5BVkFJTEFCTEUsXHJcbiAgICAgICAgICAgIERvbmF0aW9uU3RhdHVzLlJFUVVFU1RFRCxcclxuICAgICAgICAgICAgRG9uYXRpb25TdGF0dXMuUElDS1VQX0FTU0lHTkVELFxyXG4gICAgICAgICAgICBEb25hdGlvblN0YXR1cy5QSUNLRURfVVAsXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBjb21wbGV0ZWREb25hdGlvbnMgPSBhd2FpdCB0aGlzLnByaXNtYS5kb25hdGlvbi5jb3VudCh7XHJcbiAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgZG9ub3JJZCxcclxuICAgICAgICBzdGF0dXM6IERvbmF0aW9uU3RhdHVzLkNPTVBMRVRFRCxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHBlbmRpbmdSZXF1ZXN0cyA9IGF3YWl0IHRoaXMucHJpc21hLmRvbmF0aW9uUmVxdWVzdC5jb3VudCh7XHJcbiAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgZG9uYXRpb246IHsgZG9ub3JJZCB9LFxyXG4gICAgICAgIHN0YXR1czogUmVxdWVzdFN0YXR1cy5QRU5ESU5HLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgY29tcGxldGVkSXRlbXMgPSBhd2FpdCB0aGlzLnByaXNtYS5kb25hdGlvbi5maW5kTWFueSh7XHJcbiAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgZG9ub3JJZCxcclxuICAgICAgICBzdGF0dXM6IERvbmF0aW9uU3RhdHVzLkNPTVBMRVRFRCxcclxuICAgICAgfSxcclxuICAgICAgc2VsZWN0OiB7IHF1YW50aXR5OiB0cnVlIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCB0b3RhbE1lYWxzU2F2ZWQgPSBNYXRoLnJvdW5kKFxyXG4gICAgICBjb21wbGV0ZWRJdGVtcy5yZWR1Y2UoKGFjYywgY3VycikgPT4gYWNjICsgKGN1cnIucXVhbnRpdHkgfHwgMCksIDApXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRvdGFsRG9uYXRpb25zLFxyXG4gICAgICBhY3RpdmVEb25hdGlvbnMsXHJcbiAgICAgIGNvbXBsZXRlZERvbmF0aW9ucyxcclxuICAgICAgcGVuZGluZ1JlcXVlc3RzLFxyXG4gICAgICB0b3RhbE1lYWxzU2F2ZWQsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0UGxhdGZvcm1TdGF0cygpOiBQcm9taXNlPFBsYXRmb3JtU3RhdHM+IHtcclxuICAgIGNvbnN0IHRvdGFsRG9uYXRpb25zID0gYXdhaXQgdGhpcy5wcmlzbWEuZG9uYXRpb24uY291bnQoKTtcclxuICAgIGNvbnN0IGNvbXBsZXRlZEl0ZW1zID0gYXdhaXQgdGhpcy5wcmlzbWEuZG9uYXRpb24uZmluZE1hbnkoe1xyXG4gICAgICB3aGVyZTogeyBzdGF0dXM6IERvbmF0aW9uU3RhdHVzLkNPTVBMRVRFRCB9LFxyXG4gICAgICBzZWxlY3Q6IHsgcXVhbnRpdHk6IHRydWUgfSxcclxuICAgIH0pO1xyXG4gICAgY29uc3QgdG90YWxNZWFsc1Jlc2N1ZWQgPSBNYXRoLnJvdW5kKFxyXG4gICAgICBjb21wbGV0ZWRJdGVtcy5yZWR1Y2UoKGFjYywgY3VycikgPT4gYWNjICsgKGN1cnIucXVhbnRpdHkgfHwgMCksIDApXHJcbiAgICApO1xyXG4gICAgY29uc3QgYWN0aXZlVm9sdW50ZWVycyA9IGF3YWl0IHRoaXMucHJpc21hLnVzZXIuY291bnQoe1xyXG4gICAgICB3aGVyZTogeyByb2xlOiBVc2VyUm9sZS5WT0xVTlRFRVIgfSxcclxuICAgIH0pO1xyXG4gICAgY29uc3QgY29tbXVuaXR5UGFydG5lcnMgPSBhd2FpdCB0aGlzLnByaXNtYS51c2VyLmNvdW50KHtcclxuICAgICAgd2hlcmU6IHsgcm9sZTogeyBpbjogW1VzZXJSb2xlLkRPTk9SLCBVc2VyUm9sZS5SRUNFSVZFUl0gfSB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdG90YWxEb25hdGlvbnMsXHJcbiAgICAgIHRvdGFsTWVhbHNSZXNjdWVkLFxyXG4gICAgICBhY3RpdmVWb2x1bnRlZXJzLFxyXG4gICAgICBjb21tdW5pdHlQYXJ0bmVycyxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGF0dGFjaEFjdGl2ZVJlbGF0aW9ucyhkb25hdGlvbjogYW55KSB7XHJcbiAgICBjb25zdCBhY3RpdmVSZXF1ZXN0ID1cclxuICAgICAgZG9uYXRpb24ucmVxdWVzdHMgJiYgZG9uYXRpb24ucmVxdWVzdHMubGVuZ3RoID4gMFxyXG4gICAgICAgID8gZG9uYXRpb24ucmVxdWVzdHNbMF1cclxuICAgICAgICA6IG51bGw7XHJcbiAgICBjb25zdCBhY3RpdmVUYXNrID1cclxuICAgICAgZG9uYXRpb24ucGlja3VwVGFza3MgJiYgZG9uYXRpb24ucGlja3VwVGFza3MubGVuZ3RoID4gMFxyXG4gICAgICAgID8gZG9uYXRpb24ucGlja3VwVGFza3NbMF1cclxuICAgICAgICA6IG51bGw7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgLi4uZG9uYXRpb24sXHJcbiAgICAgIGN1cnJlbnRSZXF1ZXN0OiBhY3RpdmVSZXF1ZXN0LFxyXG4gICAgICBjdXJyZW50VGFzazogYWN0aXZlVGFzayxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJJbmplY3RhYmxlIiwiTm90Rm91bmRFeGNlcHRpb24iLCJGb3JiaWRkZW5FeGNlcHRpb24iLCJCYWRSZXF1ZXN0RXhjZXB0aW9uIiwiUHJpc21hU2VydmljZSIsIkRvbmF0aW9uU3RhdHVzIiwiVXNlclJvbGUiLCJSZXF1ZXN0U3RhdHVzIiwiRG9uYXRpb25zU2VydmljZSIsInByaXNtYSIsImNyZWF0ZSIsImRvbm9ySWQiLCJpbnB1dCIsImRvbmF0aW9uIiwiZGF0YSIsImZvb2ROYW1lIiwiZGVzY3JpcHRpb24iLCJjYXRlZ29yeSIsInF1YW50aXR5IiwidW5pdCIsInBpY2t1cExvY2F0aW9uIiwicGlja3VwQXZhaWxhYmxlVGltZSIsInBpY2t1cERlYWRsaW5lIiwiZXhwaXJ5RGVhZGxpbmUiLCJzdGF0dXMiLCJBVkFJTEFCTEUiLCJzdG9yYWdlTm90ZXMiLCJpbWFnZVVybCIsImluY2x1ZGUiLCJkb25vciIsImZpbmRBbGwiLCJmaWx0ZXIiLCJ3aGVyZSIsInNlYXJjaCIsIk9SIiwiY29udGFpbnMiLCJtb2RlIiwiaXRlbXMiLCJmaW5kTWFueSIsIm9yZGVyQnkiLCJjcmVhdGVkQXQiLCJyZXF1ZXN0cyIsInJlY2VpdmVyIiwicGlja3VwVGFza3MiLCJ2b2x1bnRlZXIiLCJkZWxpdmVyeSIsIm1hcCIsIml0ZW0iLCJhdHRhY2hBY3RpdmVSZWxhdGlvbnMiLCJmaW5kQXZhaWxhYmxlIiwiZ3QiLCJEYXRlIiwiZmluZEJ5RG9ub3IiLCJmaW5kQnlJZCIsImlkIiwiZmluZFVuaXF1ZSIsInVwZGF0ZSIsIkNPTVBMRVRFRCIsIkRFTElWRVJFRCIsInVwZGF0ZWQiLCJ1bmRlZmluZWQiLCJjYW5jZWwiLCJQSUNLRURfVVAiLCJDQU5DRUxMRUQiLCJnZXREb25vclN0YXRzIiwidG90YWxEb25hdGlvbnMiLCJjb3VudCIsImFjdGl2ZURvbmF0aW9ucyIsImluIiwiUkVRVUVTVEVEIiwiUElDS1VQX0FTU0lHTkVEIiwiY29tcGxldGVkRG9uYXRpb25zIiwicGVuZGluZ1JlcXVlc3RzIiwiZG9uYXRpb25SZXF1ZXN0IiwiUEVORElORyIsImNvbXBsZXRlZEl0ZW1zIiwic2VsZWN0IiwidG90YWxNZWFsc1NhdmVkIiwiTWF0aCIsInJvdW5kIiwicmVkdWNlIiwiYWNjIiwiY3VyciIsImdldFBsYXRmb3JtU3RhdHMiLCJ0b3RhbE1lYWxzUmVzY3VlZCIsImFjdGl2ZVZvbHVudGVlcnMiLCJ1c2VyIiwicm9sZSIsIlZPTFVOVEVFUiIsImNvbW11bml0eVBhcnRuZXJzIiwiRE9OT1IiLCJSRUNFSVZFUiIsImFjdGl2ZVJlcXVlc3QiLCJsZW5ndGgiLCJhY3RpdmVUYXNrIiwiY3VycmVudFJlcXVlc3QiLCJjdXJyZW50VGFzayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsU0FDRUEsVUFBVSxFQUNWQyxpQkFBaUIsRUFDakJDLGtCQUFrQixFQUNsQkMsbUJBQW1CLFFBQ2QsaUJBQWlCO0FBQ3hCLFNBQVNDLGFBQWEsUUFBUSw4QkFBOEI7QUFHNUQsU0FDRUMsY0FBYyxFQUVkQyxRQUFRLEVBQ1JDLGFBQWEsUUFDUiwyQkFBMkI7QUFJbEMsT0FBTyxNQUFNQztJQUNYLFlBQVksQUFBaUJDLE1BQXFCLENBQUU7YUFBdkJBLFNBQUFBO0lBQXdCO0lBRXJELE1BQU1DLE9BQU9DLE9BQWUsRUFBRUMsS0FBMEIsRUFBRTtRQUN4RCxPQUFPLElBQUksQ0FBQ0gsTUFBTSxDQUFDSSxRQUFRLENBQUNILE1BQU0sQ0FBQztZQUNqQ0ksTUFBTTtnQkFDSkg7Z0JBQ0FJLFVBQVVILE1BQU1HLFFBQVE7Z0JBQ3hCQyxhQUFhSixNQUFNSSxXQUFXO2dCQUM5QkMsVUFBVUwsTUFBTUssUUFBUTtnQkFDeEJDLFVBQVVOLE1BQU1NLFFBQVE7Z0JBQ3hCQyxNQUFNUCxNQUFNTyxJQUFJO2dCQUNoQkMsZ0JBQWdCUixNQUFNUSxjQUFjO2dCQUNwQ0MscUJBQXFCVCxNQUFNUyxtQkFBbUI7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