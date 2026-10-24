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
import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { DonationStatus, PickupStatus, RequestStatus } from '../common/enums/index.js';
export class PickupsService {
    constructor(prisma){
        this.prisma = prisma;
    }
    async getAvailableTasks() {
        // Donations that are REQUESTED and need a volunteer to transport,
        // or donations that are AVAILABLE for direct volunteer pickup
        return this.prisma.donation.findMany({
            where: {
                status: {
                    in: [
                        DonationStatus.REQUESTED,
                        DonationStatus.AVAILABLE
                    ]
                },
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
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                },
                pickupTasks: {
                    include: {
                        volunteer: true
                    }
                }
            }
        });
    }
    async getMyTasks(volunteerId) {
        return this.prisma.pickupTask.findMany({
            where: {
                volunteerId,
                status: {
                    in: [
                        PickupStatus.ASSIGNED,
                        PickupStatus.PICKED_UP
                    ]
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                volunteer: true,
                delivery: true,
                donation: {
                    include: {
                        donor: true,
                        requests: {
                            include: {
                                receiver: true
                            },
                            orderBy: {
                                createdAt: 'desc'
                            }
                        }
                    }
                }
            }
        });
    }
    async getMyHistory(volunteerId) {
        return this.prisma.pickupTask.findMany({
            where: {
                volunteerId,
                status: {
                    in: [
                        PickupStatus.DELIVERED
                    ]
                }
            },
            orderBy: {
                deliveredAt: 'desc'
            },
            include: {
                volunteer: true,
                delivery: true,
                donation: {
                    include: {
                        donor: true,
                        requests: {
                            include: {
                                receiver: true
                            },
                            orderBy: {
                                createdAt: 'desc'
                            }
                        }
                    }
                }
            }
        });
    }
    async getTaskById(id) {
        const task = await this.prisma.pickupTask.findUnique({
            where: {
                id
            },
            include: {
                volunteer: true,
                delivery: true,
                donation: {
                    include: {
                        donor: true,
                        requests: {
                            include: {
                                receiver: true
                            },
                            orderBy: {
                                createdAt: 'desc'
                            }
                        }
                    }
                }
            }
        });
        if (!task) {
            throw new NotFoundException(`Pickup task with ID ${id} not found`);
        }
        return task;
    }
    async acceptPickup(volunteerId, donationId, notes) {
        const donation = await this.prisma.donation.findUnique({
            where: {
                id: donationId
            },
            include: {
                pickupTasks: true
            }
        });
        if (!donation) {
            throw new NotFoundException('Donation not found');
        }
        if (donation.status !== DonationStatus.REQUESTED && donation.status !== DonationStatus.AVAILABLE) {
            throw new BadRequestException(`Cannot accept pickup task: donation is currently ${donation.status}`);
        }
        // Check if task already active
        const activeTask = donation.pickupTasks.find((t)=>t.status === PickupStatus.ASSIGNED || t.status === PickupStatus.PICKED_UP);
        if (activeTask) {
            throw new BadRequestException('A volunteer has already been assigned to this donation');
        }
        const [task] = await this.prisma.$transaction([
            this.prisma.pickupTask.create({
                data: {
                    donationId,
                    volunteerId,
                    status: PickupStatus.ASSIGNED,
                    notes
                },
                include: {
                    volunteer: true,
                    donation: {
                        include: {
                            donor: true,
                            requests: {
                                include: {
                                    receiver: true
                                }
                            }
                        }
                    }
                }
            }),
            this.prisma.donation.update({
                where: {
                    id: donationId
                },
                data: {
                    status: DonationStatus.PICKUP_ASSIGNED
                }
            })
        ]);
        return task;
    }
    async updatePickupStatus(volunteerId, taskId, status) {
        const task = await this.getTaskById(taskId);
        if (task.volunteerId !== volunteerId) {
            throw new ForbiddenException('You are not assigned to this pickup task');
        }
        if (status === PickupStatus.PICKED_UP) {
            if (task.donation.status !== DonationStatus.PICKUP_ASSIGNED) {
                throw new BadRequestException(`Invalid state transition: Cannot mark food PICKED_UP when current state is ${task.donation.status}`);
            }
            const [updatedTask] = await this.prisma.$transaction([
                this.prisma.pickupTask.update({
                    where: {
                        id: taskId
                    },
                    data: {
                        status: PickupStatus.PICKED_UP,
                        pickedUpAt: new Date()
                    },
                    include: {
                        volunteer: true,
                        delivery: true,
                        donation: {
                            include: {
                                donor: true,
                                requests: {
                                    include: {
                                        receiver: true
                                    }
                                }
                            }
                        }
                    }
                }),
                this.prisma.donation.update({
                    where: {
                        id: task.donationId
                    },
                    data: {
                        status: DonationStatus.PICKED_UP
                    }
                })
            ]);
            return updatedTask;
        }
        throw new BadRequestException(`Direct transition to status ${status} is not supported via this mutation`);
    }
    async confirmDelivery(volunteerId, taskId, proofNotes) {
        const task = await this.getTaskById(taskId);
        if (task.volunteerId !== volunteerId) {
            throw new ForbiddenException('You are not assigned to this pickup task');
        }
        if (task.donation.status !== DonationStatus.PICKED_UP) {
            throw new BadRequestException(`Invalid state transition: Cannot confirm delivery before food has been marked PICKED_UP. Current status: ${task.donation.status}`);
        }
        const now = new Date();
        const [updatedTask] = await this.prisma.$transaction([
            this.prisma.pickupTask.update({
                where: {
                    id: taskId
                },
                data: {
                    status: PickupStatus.DELIVERED,
                    deliveredAt: now
                },
                include: {
                    volunteer: true,
                    donation: {
                        include: {
                            donor: true,
                            requests: {
                                include: {
                                    receiver: true
                                }
                            }
                        }
                    }
                }
            }),
            this.prisma.donation.update({
                where: {
                    id: task.donationId
                },
                data: {
                    status: DonationStatus.DELIVERED
                }
            }),
            this.prisma.delivery.upsert({
                where: {
                    taskId
                },
                create: {
                    taskId,
                    proofNotes,
                    recipientConfirmation: false
                },
                update: {
                    proofNotes
                }
            })
        ]);
        return this.getTaskById(taskId);
    }
    async confirmReceipt(receiverId, donationId, notes) {
        const donation = await this.prisma.donation.findUnique({
            where: {
                id: donationId
            },
            include: {
                requests: {
                    where: {
                        receiverId
                    }
                },
                pickupTasks: {
                    include: {
                        delivery: true
                    }
                }
            }
        });
        if (!donation) {
            throw new NotFoundException('Donation not found');
        }
        if (donation.requests.length === 0) {
            throw new ForbiddenException('You have not requested this donation');
        }
        if (donation.status !== DonationStatus.DELIVERED) {
            throw new BadRequestException(`Cannot confirm receipt: food has not been delivered yet. Current status is ${donation.status}`);
        }
        const activeTask = donation.pickupTasks[0];
        const requestId = donation.requests[0].id;
        const now = new Date();
        const ops = [
            this.prisma.donation.update({
                where: {
                    id: donationId
                },
                data: {
                    status: DonationStatus.COMPLETED
                }
            }),
            this.prisma.donationRequest.update({
                where: {
                    id: requestId
                },
                data: {
                    status: RequestStatus.FULFILLED
                }
            })
        ];
        if (activeTask) {
            ops.push(this.prisma.delivery.upsert({
                where: {
                    taskId: activeTask.id
                },
                create: {
                    taskId: activeTask.id,
                    recipientConfirmation: true,
                    confirmedAt: now,
                    proofNotes: notes
                },
                update: {
                    recipientConfirmation: true,
                    confirmedAt: now,
                    proofNotes: notes
                }
            }));
        }
        await this.prisma.$transaction(ops);
        return this.prisma.donation.findUnique({
            where: {
                id: donationId
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
    }
    async getVolunteerStats(volunteerId) {
        const availableTasks = await this.prisma.donation.count({
            where: {
                status: {
                    in: [
                        DonationStatus.REQUESTED,
                        DonationStatus.AVAILABLE
                    ]
                },
                expiryDeadline: {
                    gt: new Date()
                }
            }
        });
        const activeTasks = await this.prisma.pickupTask.count({
            where: {
                volunteerId,
                status: {
                    in: [
                        PickupStatus.ASSIGNED,
                        PickupStatus.PICKED_UP
                    ]
                }
            }
        });
        const completedPickups = await this.prisma.pickupTask.count({
            where: {
                volunteerId,
                status: PickupStatus.DELIVERED
            }
        });
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayTasks = await this.prisma.pickupTask.count({
            where: {
                volunteerId,
                createdAt: {
                    gte: today
                }
            }
        });
        return {
            availableTasks,
            activeTasks,
            completedPickups,
            todayTasks
        };
    }
}
PickupsService = _ts_decorate([
    Injectable(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof PrismaService === "undefined" ? Object : PrismaService
    ])
], PickupsService);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9waWNrdXBzL3BpY2t1cHMuc2VydmljZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEluamVjdGFibGUsXHJcbiAgTm90Rm91bmRFeGNlcHRpb24sXHJcbiAgQmFkUmVxdWVzdEV4Y2VwdGlvbixcclxuICBGb3JiaWRkZW5FeGNlcHRpb24sXHJcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xyXG5pbXBvcnQgeyBQcmlzbWFTZXJ2aWNlIH0gZnJvbSAnLi4vcHJpc21hL3ByaXNtYS5zZXJ2aWNlLmpzJztcclxuaW1wb3J0IHtcclxuICBEb25hdGlvblN0YXR1cyxcclxuICBQaWNrdXBTdGF0dXMsXHJcbiAgUmVxdWVzdFN0YXR1cyxcclxufSBmcm9tICcuLi9jb21tb24vZW51bXMvaW5kZXguanMnO1xyXG5pbXBvcnQgeyBWb2x1bnRlZXJTdGF0cyB9IGZyb20gJy4uL2NvbW1vbi9kdG8vc3RhdHMudHlwZS5qcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBQaWNrdXBzU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBwcmlzbWE6IFByaXNtYVNlcnZpY2UpIHt9XHJcblxyXG4gIGFzeW5jIGdldEF2YWlsYWJsZVRhc2tzKCkge1xyXG4gICAgLy8gRG9uYXRpb25zIHRoYXQgYXJlIFJFUVVFU1RFRCBhbmQgbmVlZCBhIHZvbHVudGVlciB0byB0cmFuc3BvcnQsXHJcbiAgICAvLyBvciBkb25hdGlvbnMgdGhhdCBhcmUgQVZBSUxBQkxFIGZvciBkaXJlY3Qgdm9sdW50ZWVyIHBpY2t1cFxyXG4gICAgcmV0dXJuIHRoaXMucHJpc21hLmRvbmF0aW9uLmZpbmRNYW55KHtcclxuICAgICAgd2hlcmU6IHtcclxuICAgICAgICBzdGF0dXM6IHsgaW46IFtEb25hdGlvblN0YXR1cy5SRVFVRVNURUQsIERvbmF0aW9uU3RhdHVzLkFWQUlMQUJMRV0gfSxcclxuICAgICAgICBleHBpcnlEZWFkbGluZTogeyBndDogbmV3IERhdGUoKSB9LFxyXG4gICAgICB9LFxyXG4gICAgICBvcmRlckJ5OiB7IGNyZWF0ZWRBdDogJ2Rlc2MnIH0sXHJcbiAgICAgIGluY2x1ZGU6IHtcclxuICAgICAgICBkb25vcjogdHJ1ZSxcclxuICAgICAgICByZXF1ZXN0czoge1xyXG4gICAgICAgICAgaW5jbHVkZTogeyByZWNlaXZlcjogdHJ1ZSB9LFxyXG4gICAgICAgICAgb3JkZXJCeTogeyBjcmVhdGVkQXQ6ICdkZXNjJyB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGlja3VwVGFza3M6IHtcclxuICAgICAgICAgIGluY2x1ZGU6IHsgdm9sdW50ZWVyOiB0cnVlIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0TXlUYXNrcyh2b2x1bnRlZXJJZDogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wcmlzbWEucGlja3VwVGFzay5maW5kTWFueSh7XHJcbiAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgdm9sdW50ZWVySWQsXHJcbiAgICAgICAgc3RhdHVzOiB7IGluOiBbUGlja3VwU3RhdHVzLkFTU0lHTkVELCBQaWNrdXBTdGF0dXMuUElDS0VEX1VQXSB9LFxyXG4gICAgICB9LFxyXG4gICAgICBvcmRlckJ5OiB7IGNyZWF0ZWRBdDogJ2Rlc2MnIH0sXHJcbiAgICAgIGluY2x1ZGU6IHtcclxuICAgICAgICB2b2x1bnRlZXI6IHRydWUsXHJcbiAgICAgICAgZGVsaXZlcnk6IHRydWUsXHJcbiAgICAgICAgZG9uYXRpb246IHtcclxuICAgICAgICAgIGluY2x1ZGU6IHtcclxuICAgICAgICAgICAgZG9ub3I6IHRydWUsXHJcbiAgICAgICAgICAgIHJlcXVlc3RzOiB7XHJcbiAgICAgICAgICAgICAgaW5jbHVkZTogeyByZWNlaXZlcjogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgIG9yZGVyQnk6IHsgY3JlYXRlZEF0OiAnZGVzYycgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0TXlIaXN0b3J5KHZvbHVudGVlcklkOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLnByaXNtYS5waWNrdXBUYXNrLmZpbmRNYW55KHtcclxuICAgICAgd2hlcmU6IHtcclxuICAgICAgICB2b2x1bnRlZXJJZCxcclxuICAgICAgICBzdGF0dXM6IHsgaW46IFtQaWNrdXBTdGF0dXMuREVMSVZFUkVEXSB9LFxyXG4gICAgICB9LFxyXG4gICAgICBvcmRlckJ5OiB7IGRlbGl2ZXJlZEF0OiAnZGVzYycgfSxcclxuICAgICAgaW5jbHVkZToge1xyXG4gICAgICAgIHZvbHVudGVlcjogdHJ1ZSxcclxuICAgICAgICBkZWxpdmVyeTogdHJ1ZSxcclxuICAgICAgICBkb25hdGlvbjoge1xyXG4gICAgICAgICAgaW5jbHVkZToge1xyXG4gICAgICAgICAgICBkb25vcjogdHJ1ZSxcclxuICAgICAgICAgICAgcmVxdWVzdHM6IHtcclxuICAgICAgICAgICAgICBpbmNsdWRlOiB7IHJlY2VpdmVyOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgb3JkZXJCeTogeyBjcmVhdGVkQXQ6ICdkZXNjJyB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRUYXNrQnlJZChpZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCB0YXNrID0gYXdhaXQgdGhpcy5wcmlzbWEucGlja3VwVGFzay5maW5kVW5pcXVlKHtcclxuICAgICAgd2hlcmU6IHsgaWQgfSxcclxuICAgICAgaW5jbHVkZToge1xyXG4gICAgICAgIHZvbHVudGVlcjogdHJ1ZSxcclxuICAgICAgICBkZWxpdmVyeTogdHJ1ZSxcclxuICAgICAgICBkb25hdGlvbjoge1xyXG4gICAgICAgICAgaW5jbHVkZToge1xyXG4gICAgICAgICAgICBkb25vcjogdHJ1ZSxcclxuICAgICAgICAgICAgcmVxdWVzdHM6IHtcclxuICAgICAgICAgICAgICBpbmNsdWRlOiB7IHJlY2VpdmVyOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgb3JkZXJCeTogeyBjcmVhdGVkQXQ6ICdkZXNjJyB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCF0YXNrKSB7XHJcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbihgUGlja3VwIHRhc2sgd2l0aCBJRCAke2lkfSBub3QgZm91bmRgKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGFzaztcclxuICB9XHJcblxyXG4gIGFzeW5jIGFjY2VwdFBpY2t1cCh2b2x1bnRlZXJJZDogc3RyaW5nLCBkb25hdGlvbklkOiBzdHJpbmcsIG5vdGVzPzogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBkb25hdGlvbiA9IGF3YWl0IHRoaXMucHJpc21hLmRvbmF0aW9uLmZpbmRVbmlxdWUoe1xyXG4gICAgICB3aGVyZTogeyBpZDogZG9uYXRpb25JZCB9LFxyXG4gICAgICBpbmNsdWRlOiB7IHBpY2t1cFRhc2tzOiB0cnVlIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIWRvbmF0aW9uKSB7XHJcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbignRG9uYXRpb24gbm90IGZvdW5kJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICBkb25hdGlvbi5zdGF0dXMgIT09IERvbmF0aW9uU3RhdHVzLlJFUVVFU1RFRCAmJlxyXG4gICAgICBkb25hdGlvbi5zdGF0dXMgIT09IERvbmF0aW9uU3RhdHVzLkFWQUlMQUJMRVxyXG4gICAgKSB7XHJcbiAgICAgIHRocm93IG5ldyBCYWRSZXF1ZXN0RXhjZXB0aW9uKFxyXG4gICAgICAgIGBDYW5ub3QgYWNjZXB0IHBpY2t1cCB0YXNrOiBkb25hdGlvbiBpcyBjdXJyZW50bHkgJHtkb25hdGlvbi5zdGF0dXN9YFxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENoZWNrIGlmIHRhc2sgYWxyZWFkeSBhY3RpdmVcclxuICAgIGNvbnN0IGFjdGl2ZVRhc2sgPSBkb25hdGlvbi5waWNrdXBUYXNrcy5maW5kKFxyXG4gICAgICAodCkgPT4gdC5zdGF0dXMgPT09IFBpY2t1cFN0YXR1cy5BU1NJR05FRCB8fCB0LnN0YXR1cyA9PT0gUGlja3VwU3RhdHVzLlBJQ0tFRF9VUFxyXG4gICAgKTtcclxuICAgIGlmIChhY3RpdmVUYXNrKSB7XHJcbiAgICAgIHRocm93IG5ldyBCYWRSZXF1ZXN0RXhjZXB0aW9uKCdBIHZvbHVudGVlciBoYXMgYWxyZWFkeSBiZWVuIGFzc2lnbmVkIHRvIHRoaXMgZG9uYXRpb24nKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBbdGFza10gPSBhd2FpdCB0aGlzLnByaXNtYS4kdHJhbnNhY3Rpb24oW1xyXG4gICAgICB0aGlzLnByaXNtYS5waWNrdXBUYXNrLmNyZWF0ZSh7XHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgZG9uYXRpb25JZCxcclxuICAgICAgICAgIHZvbHVudGVlcklkLFxyXG4gICAgICAgICAgc3RhdHVzOiBQaWNrdXBTdGF0dXMuQVNTSUdORUQsXHJcbiAgICAgICAgICBub3RlcyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluY2x1ZGU6IHtcclxuICAgICAgICAgIHZvbHVudGVlcjogdHJ1ZSxcclxuICAgICAgICAgIGRvbmF0aW9uOiB7XHJcbiAgICAgICAgICAgIGluY2x1ZGU6IHtcclxuICAgICAgICAgICAgICBkb25vcjogdHJ1ZSxcclxuICAgICAgICAgICAgICByZXF1ZXN0czogeyBpbmNsdWRlOiB7IHJlY2VpdmVyOiB0cnVlIH0gfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSksXHJcbiAgICAgIHRoaXMucHJpc21hLmRvbmF0aW9uLnVwZGF0ZSh7XHJcbiAgICAgICAgd2hlcmU6IHsgaWQ6IGRvbmF0aW9uSWQgfSxcclxuICAgICAgICBkYXRhOiB7IHN0YXR1czogRG9uYXRpb25TdGF0dXMuUElDS1VQX0FTU0lHTkVEIH0sXHJcbiAgICAgIH0pLFxyXG4gICAgXSk7XHJcblxyXG4gICAgcmV0dXJuIHRhc2s7XHJcbiAgfVxyXG5cclxuICBhc3luYyB1cGRhdGVQaWNrdXBTdGF0dXModm9sdW50ZWVySWQ6IHN0cmluZywgdGFza0lkOiBzdHJpbmcsIHN0YXR1czogUGlja3VwU3RhdHVzKSB7XHJcbiAgICBjb25zdCB0YXNrID0gYXdhaXQgdGhpcy5nZXRUYXNrQnlJZCh0YXNrSWQpO1xyXG4gICAgaWYgKHRhc2sudm9sdW50ZWVySWQgIT09IHZvbHVudGVlcklkKSB7XHJcbiAgICAgIHRocm93IG5ldyBGb3JiaWRkZW5FeGNlcHRpb24oJ1lvdSBhcmUgbm90IGFzc2lnbmVkIHRvIHRoaXMgcGlja3VwIHRhc2snKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc3RhdHVzID09PSBQaWNrdXBTdGF0dXMuUElDS0VEX1VQKSB7XHJcbiAgICAgIGlmICh0YXNrLmRvbmF0aW9uLnN0YXR1cyAhPT0gRG9uYXRpb25TdGF0dXMuUElDS1VQX0FTU0lHTkVEKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFeGNlcHRpb24oXHJcbiAgICAgICAgICBgSW52YWxpZCBzdGF0ZSB0cmFuc2l0aW9uOiBDYW5ub3QgbWFyayBmb29kIFBJQ0tFRF9VUCB3aGVuIGN1cnJlbnQgc3RhdGUgaXMgJHt0YXNrLmRvbmF0aW9uLnN0YXR1c31gXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgW3VwZGF0ZWRUYXNrXSA9IGF3YWl0IHRoaXMucHJpc21hLiR0cmFuc2FjdGlvbihbXHJcbiAgICAgICAgdGhpcy5wcmlzbWEucGlja3VwVGFzay51cGRhdGUoe1xyXG4gICAgICAgICAgd2hlcmU6IHsgaWQ6IHRhc2tJZCB9LFxyXG4gICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBzdGF0dXM6IFBpY2t1cFN0YXR1cy5QSUNLRURfVVAsXHJcbiAgICAgICAgICAgIHBpY2tlZFVwQXQ6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgaW5jbHVkZToge1xyXG4gICAgICAgICAgICB2b2x1bnRlZXI6IHRydWUsXHJcbiAgICAgICAgICAgIGRlbGl2ZXJ5OiB0cnVlLFxyXG4gICAgICAgICAgICBkb25hdGlvbjoge1xyXG4gICAgICAgICAgICAgIGluY2x1ZGU6IHtcclxuICAgICAgICAgICAgICAgIGRvbm9yOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdHM6IHsgaW5jbHVkZTogeyByZWNlaXZlcjogdHJ1ZSB9IH0sXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgdGhpcy5wcmlzbWEuZG9uYXRpb24udXBkYXRlKHtcclxuICAgICAgICAgIHdoZXJlOiB7IGlkOiB0YXNrLmRvbmF0aW9uSWQgfSxcclxuICAgICAgICAgIGRhdGE6IHsgc3RhdHVzOiBEb25hdGlvblN0YXR1cy5QSUNLRURfVVAgfSxcclxuICAgICAgICB9KSxcclxuICAgICAgXSk7XHJcblxyXG4gICAgICByZXR1cm4gdXBkYXRlZFRhc2s7XHJcbiAgICB9XHJcblxyXG4gICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFeGNlcHRpb24oYERpcmVjdCB0cmFuc2l0aW9uIHRvIHN0YXR1cyAke3N0YXR1c30gaXMgbm90IHN1cHBvcnRlZCB2aWEgdGhpcyBtdXRhdGlvbmApO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgY29uZmlybURlbGl2ZXJ5KHZvbHVudGVlcklkOiBzdHJpbmcsIHRhc2tJZDogc3RyaW5nLCBwcm9vZk5vdGVzPzogc3RyaW5nKSB7XHJcbiAgICBjb25zdCB0YXNrID0gYXdhaXQgdGhpcy5nZXRUYXNrQnlJZCh0YXNrSWQpO1xyXG4gICAgaWYgKHRhc2sudm9sdW50ZWVySWQgIT09IHZvbHVudGVlcklkKSB7XHJcbiAgICAgIHRocm93IG5ldyBGb3JiaWRkZW5FeGNlcHRpb24oJ1lvdSBhcmUgbm90IGFzc2lnbmVkIHRvIHRoaXMgcGlja3VwIHRhc2snKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGFzay5kb25hdGlvbi5zdGF0dXMgIT09IERvbmF0aW9uU3RhdHVzLlBJQ0tFRF9VUCkge1xyXG4gICAgICB0aHJvdyBuZXcgQmFkUmVxdWVzdEV4Y2VwdGlvbihcclxuICAgICAgICBgSW52YWxpZCBzdGF0ZSB0cmFuc2l0aW9uOiBDYW5ub3QgY29uZmlybSBkZWxpdmVyeSBiZWZvcmUgZm9vZCBoYXMgYmVlbiBtYXJrZWQgUElDS0VEX1VQLiBDdXJyZW50IHN0YXR1czogJHt0YXNrLmRvbmF0aW9uLnN0YXR1c31gXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuXHJcbiAgICBjb25zdCBbdXBkYXRlZFRhc2tdID0gYXdhaXQgdGhpcy5wcmlzbWEuJHRyYW5zYWN0aW9uKFtcclxuICAgICAgdGhpcy5wcmlzbWEucGlja3VwVGFzay51cGRhdGUoe1xyXG4gICAgICAgIHdoZXJlOiB7IGlkOiB0YXNrSWQgfSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBzdGF0dXM6IFBpY2t1cFN0YXR1cy5ERUxJVkVSRUQsXHJcbiAgICAgICAgICBkZWxpdmVyZWRBdDogbm93LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5jbHVkZToge1xyXG4gICAgICAgICAgdm9sdW50ZWVyOiB0cnVlLFxyXG4gICAgICAgICAgZG9uYXRpb246IHtcclxuICAgICAgICAgICAgaW5jbHVkZToge1xyXG4gICAgICAgICAgICAgIGRvbm9yOiB0cnVlLFxyXG4gICAgICAgICAgICAgIHJlcXVlc3RzOiB7IGluY2x1ZGU6IHsgcmVjZWl2ZXI6IHRydWUgfSB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9KSxcclxuICAgICAgdGhpcy5wcmlzbWEuZG9uYXRpb24udXBkYXRlKHtcclxuICAgICAgICB3aGVyZTogeyBpZDogdGFzay5kb25hdGlvbklkIH0sXHJcbiAgICAgICAgZGF0YTogeyBzdGF0dXM6IERvbmF0aW9uU3RhdHVzLkRFTElWRVJFRCB9LFxyXG4gICAgICB9KSxcclxuICAgICAgdGhpcy5wcmlzbWEuZGVsaXZlcnkudXBzZXJ0KHtcclxuICAgICAgICB3aGVyZTogeyB0YXNrSWQgfSxcclxuICAgICAgICBjcmVhdGU6IHtcclxuICAgICAgICAgIHRhc2tJZCxcclxuICAgICAgICAgIHByb29mTm90ZXMsXHJcbiAgICAgICAgICByZWNpcGllbnRDb25maXJtYXRpb246IGZhbHNlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdXBkYXRlOiB7XHJcbiAgICAgICAgICBwcm9vZk5vdGVzLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pLFxyXG4gICAgXSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZ2V0VGFza0J5SWQodGFza0lkKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGNvbmZpcm1SZWNlaXB0KHJlY2VpdmVySWQ6IHN0cmluZywgZG9uYXRpb25JZDogc3RyaW5nLCBub3Rlcz86IHN0cmluZykge1xyXG4gICAgY29uc3QgZG9uYXRpb24gPSBhd2FpdCB0aGlzLnByaXNtYS5kb25hdGlvbi5maW5kVW5pcXVlKHtcclxuICAgICAgd2hlcmU6IHsgaWQ6IGRvbmF0aW9uSWQgfSxcclxuICAgICAgaW5jbHVkZToge1xyXG4gICAgICAgIHJlcXVlc3RzOiB7IHdoZXJlOiB7IHJlY2VpdmVySWQgfSB9LFxyXG4gICAgICAgIHBpY2t1cFRhc2tzOiB7IGluY2x1ZGU6IHsgZGVsaXZlcnk6IHRydWUgfSB9LFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCFkb25hdGlvbikge1xyXG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oJ0RvbmF0aW9uIG5vdCBmb3VuZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkb25hdGlvbi5yZXF1ZXN0cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgdGhyb3cgbmV3IEZvcmJpZGRlbkV4Y2VwdGlvbignWW91IGhhdmUgbm90IHJlcXVlc3RlZCB0aGlzIGRvbmF0aW9uJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRvbmF0aW9uLnN0YXR1cyAhPT0gRG9uYXRpb25TdGF0dXMuREVMSVZFUkVEKSB7XHJcbiAgICAgIHRocm93IG5ldyBCYWRSZXF1ZXN0RXhjZXB0aW9uKFxyXG4gICAgICAgIGBDYW5ub3QgY29uZmlybSByZWNlaXB0OiBmb29kIGhhcyBub3QgYmVlbiBkZWxpdmVyZWQgeWV0LiBDdXJyZW50IHN0YXR1cyBpcyAke2RvbmF0aW9uLnN0YXR1c31gXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWN0aXZlVGFzayA9IGRvbmF0aW9uLnBpY2t1cFRhc2tzWzBdO1xyXG4gICAgY29uc3QgcmVxdWVzdElkID0gZG9uYXRpb24ucmVxdWVzdHNbMF0uaWQ7XHJcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAgIGNvbnN0IG9wczogYW55W10gPSBbXHJcbiAgICAgIHRoaXMucHJpc21hLmRvbmF0aW9uLnVwZGF0ZSh7XHJcbiAgICAgICAgd2hlcmU6IHsgaWQ6IGRvbmF0aW9uSWQgfSxcclxuICAgICAgICBkYXRhOiB7IHN0YXR1czogRG9uYXRpb25TdGF0dXMuQ09NUExFVEVEIH0sXHJcbiAgICAgIH0pLFxyXG4gICAgICB0aGlzLnByaXNtYS5kb25hdGlvblJlcXVlc3QudXBkYXRlKHtcclxuICAgICAgICB3aGVyZTogeyBpZDogcmVxdWVzdElkIH0sXHJcbiAgICAgICAgZGF0YTogeyBzdGF0dXM6IFJlcXVlc3RTdGF0dXMuRlVMRklMTEVEIH0sXHJcbiAgICAgIH0pLFxyXG4gICAgXTtcclxuXHJcbiAgICBpZiAoYWN0aXZlVGFzaykge1xyXG4gICAgICBvcHMucHVzaChcclxuICAgICAgICB0aGlzLnByaXNtYS5kZWxpdmVyeS51cHNlcnQoe1xyXG4gICAgICAgICAgd2hlcmU6IHsgdGFza0lkOiBhY3RpdmVUYXNrLmlkIH0sXHJcbiAgICAgICAgICBjcmVhdGU6IHtcclxuICAgICAgICAgICAgdGFza0lkOiBhY3RpdmVUYXNrLmlkLFxyXG4gICAgICAgICAgICByZWNpcGllbnRDb25maXJtYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgIGNvbmZpcm1lZEF0OiBub3csXHJcbiAgICAgICAgICAgIHByb29mTm90ZXM6IG5vdGVzLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHVwZGF0ZToge1xyXG4gICAgICAgICAgICByZWNpcGllbnRDb25maXJtYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgIGNvbmZpcm1lZEF0OiBub3csXHJcbiAgICAgICAgICAgIHByb29mTm90ZXM6IG5vdGVzLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGF3YWl0IHRoaXMucHJpc21hLiR0cmFuc2FjdGlvbihvcHMpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLnByaXNtYS5kb25hdGlvbi5maW5kVW5pcXVlKHtcclxuICAgICAgd2hlcmU6IHsgaWQ6IGRvbmF0aW9uSWQgfSxcclxuICAgICAgaW5jbHVkZToge1xyXG4gICAgICAgIGRvbm9yOiB0cnVlLFxyXG4gICAgICAgIHJlcXVlc3RzOiB7IGluY2x1ZGU6IHsgcmVjZWl2ZXI6IHRydWUgfSB9LFxyXG4gICAgICAgIHBpY2t1cFRhc2tzOiB7IGluY2x1ZGU6IHsgdm9sdW50ZWVyOiB0cnVlLCBkZWxpdmVyeTogdHJ1ZSB9IH0sXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGdldFZvbHVudGVlclN0YXRzKHZvbHVudGVlcklkOiBzdHJpbmcpOiBQcm9taXNlPFZvbHVudGVlclN0YXRzPiB7XHJcbiAgICBjb25zdCBhdmFpbGFibGVUYXNrcyA9IGF3YWl0IHRoaXMucHJpc21hLmRvbmF0aW9uLmNvdW50KHtcclxuICAgICAgd2hlcmU6IHtcclxuICAgICAgICBzdGF0dXM6IHsgaW46IFtEb25hdGlvblN0YXR1cy5SRVFVRVNURUQsIERvbmF0aW9uU3RhdHVzLkFWQUlMQUJMRV0gfSxcclxuICAgICAgICBleHBpcnlEZWFkbGluZTogeyBndDogbmV3IERhdGUoKSB9LFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgYWN0aXZlVGFza3MgPSBhd2FpdCB0aGlzLnByaXNtYS5waWNrdXBUYXNrLmNvdW50KHtcclxuICAgICAgd2hlcmU6IHtcclxuICAgICAgICB2b2x1bnRlZXJJZCxcclxuICAgICAgICBzdGF0dXM6IHsgaW46IFtQaWNrdXBTdGF0dXMuQVNTSUdORUQsIFBpY2t1cFN0YXR1cy5QSUNLRURfVVBdIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBjb21wbGV0ZWRQaWNrdXBzID0gYXdhaXQgdGhpcy5wcmlzbWEucGlja3VwVGFzay5jb3VudCh7XHJcbiAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgdm9sdW50ZWVySWQsXHJcbiAgICAgICAgc3RhdHVzOiBQaWNrdXBTdGF0dXMuREVMSVZFUkVELFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG4gICAgdG9kYXkuc2V0SG91cnMoMCwgMCwgMCwgMCk7XHJcblxyXG4gICAgY29uc3QgdG9kYXlUYXNrcyA9IGF3YWl0IHRoaXMucHJpc21hLnBpY2t1cFRhc2suY291bnQoe1xyXG4gICAgICB3aGVyZToge1xyXG4gICAgICAgIHZvbHVudGVlcklkLFxyXG4gICAgICAgIGNyZWF0ZWRBdDogeyBndGU6IHRvZGF5IH0sXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBhdmFpbGFibGVUYXNrcyxcclxuICAgICAgYWN0aXZlVGFza3MsXHJcbiAgICAgIGNvbXBsZXRlZFBpY2t1cHMsXHJcbiAgICAgIHRvZGF5VGFza3MsXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiSW5qZWN0YWJsZSIsIk5vdEZvdW5kRXhjZXB0aW9uIiwiQmFkUmVxdWVzdEV4Y2VwdGlvbiIsIkZvcmJpZGRlbkV4Y2VwdGlvbiIsIlByaXNtYVNlcnZpY2UiLCJEb25hdGlvblN0YXR1cyIsIlBpY2t1cFN0YXR1cyIsIlJlcXVlc3RTdGF0dXMiLCJQaWNrdXBzU2VydmljZSIsInByaXNtYSIsImdldEF2YWlsYWJsZVRhc2tzIiwiZG9uYXRpb24iLCJmaW5kTWFueSIsIndoZXJlIiwic3RhdHVzIiwiaW4iLCJSRVFVRVNURUQiLCJBVkFJTEFCTEUiLCJleHBpcnlEZWFkbGluZSIsImd0IiwiRGF0ZSIsIm9yZGVyQnkiLCJjcmVhdGVkQXQiLCJpbmNsdWRlIiwiZG9ub3IiLCJyZXF1ZXN0cyIsInJlY2VpdmVyIiwicGlja3VwVGFza3MiLCJ2b2x1bnRlZXIiLCJnZXRNeVRhc2tzIiwidm9sdW50ZWVySWQiLCJwaWNrdXBUYXNrIiwiQVNTSUdORUQiLCJQSUNLRURfVVAiLCJkZWxpdmVyeSIsImdldE15SGlzdG9yeSIsIkRFTElWRVJFRCIsImRlbGl2ZXJlZEF0IiwiZ2V0VGFza0J5SWQiLCJpZCIsInRhc2siLCJmaW5kVW5pcXVlIiwiYWNjZXB0UGlja3VwIiwiZG9uYXRpb25JZCIsIm5vdGVzIiwiYWN0aXZlVGFzayIsImZpbmQiLCJ0IiwiJHRyYW5zYWN0aW9uIiwiY3JlYXRlIiwiZGF0YSIsInVwZGF0ZSIsIlBJQ0tVUF9BU1NJR05FRCIsInVwZGF0ZVBpY2t1cFN0YXR1cyIsInRhc2tJZCIsInVwZGF0ZWRUYXNrIiwicGlja2VkVXBBdCIsImNvbmZpcm1EZWxpdmVyeSIsInByb29mTm90ZXMiLCJub3ciLCJ1cHNlcnQiLCJyZWNpcGllbnRDb25maXJtYXRpb24iLCJjb25maXJtUmVjZWlwdCIsInJlY2VpdmVySWQiLCJsZW5ndGgiLCJyZXF1ZXN0SWQiLCJvcHMiLCJDT01QTEVURUQiLCJkb25hdGlvblJlcXVlc3QiLCJGVUxGSUxMRUQiLCJwdXNoIiwiY29uZmlybWVkQXQiLCJnZXRWb2x1bnRlZXJTdGF0cyIsImF2YWlsYWJsZVRhc2tzIiwiY291bnQiLCJhY3RpdmVUYXNrcyIsImNvbXBsZXRlZFBpY2t1cHMiLCJ0b2RheSIsInNldEhvdXJzIiwidG9kYXlUYXNrcyIsImd0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsU0FDRUEsVUFBVSxFQUNWQyxpQkFBaUIsRUFDakJDLG1CQUFtQixFQUNuQkMsa0JBQWtCLFFBQ2IsaUJBQWlCO0FBQ3hCLFNBQVNDLGFBQWEsUUFBUSw4QkFBOEI7QUFDNUQsU0FDRUMsY0FBYyxFQUNkQyxZQUFZLEVBQ1pDLGFBQWEsUUFDUiwyQkFBMkI7QUFJbEMsT0FBTyxNQUFNQztJQUNYLFlBQVksQUFBaUJDLE1BQXFCLENBQUU7YUFBdkJBLFNBQUFBO0lBQXdCO0lBRXJELE1BQU1DLG9CQUFvQjtRQUN4QixrRUFBa0U7UUFDbEUsOERBQThEO1FBQzlELE9BQU8sSUFBSSxDQUFDRCxNQUFNLENBQUNFLFFBQVEsQ0FBQ0MsUUFBUSxDQUFDO1lBQ25DQyxPQUFPO2dCQUNMQyxRQUFRO29CQUFFQyxJQUFJO3dCQUFDVixlQUFlVyxTQUFTO3dCQUFFWCxlQUFlWSxTQUFTO3FCQUFDO2dCQUFDO2dCQUNuRUMsZ0JBQWdCO29CQUFFQyxJQUFJLElBQUlDO2dCQUFPO1lBQ25DO1lBQ0FDLFNBQVM7Z0JBQUVDLFdBQVc7WUFBTztZQUM3QkMsU0FBUztnQkFDUEMsT0FBTztnQkFDUEMsVUFBVTtvQkFDUkYsU0FBUzt3QkFBRUcsVUFB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