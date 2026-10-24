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
        const items = await this.prisma.donation.findMany({
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
        return items.map((item)=>({
                ...item,
                currentRequest: item.requests && item.requests.length > 0 ? item.requests[0] : null,
                currentTask: item.pickupTasks && item.pickupTasks.length > 0 ? item.pickupTasks[0] : null
            }));
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
    async getDonationForTask(donationId) {
        return this.prisma.donation.findUnique({
            where: {
                id: donationId
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
                    }
                }
            }
        });
    }
}
PickupsService = _ts_decorate([
    Injectable(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof PrismaService === "undefined" ? Object : PrismaService
    ])
], PickupsService);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9waWNrdXBzL3BpY2t1cHMuc2VydmljZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEluamVjdGFibGUsXHJcbiAgTm90Rm91bmRFeGNlcHRpb24sXHJcbiAgQmFkUmVxdWVzdEV4Y2VwdGlvbixcclxuICBGb3JiaWRkZW5FeGNlcHRpb24sXHJcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xyXG5pbXBvcnQgeyBQcmlzbWFTZXJ2aWNlIH0gZnJvbSAnLi4vcHJpc21hL3ByaXNtYS5zZXJ2aWNlLmpzJztcclxuaW1wb3J0IHtcclxuICBEb25hdGlvblN0YXR1cyxcclxuICBQaWNrdXBTdGF0dXMsXHJcbiAgUmVxdWVzdFN0YXR1cyxcclxufSBmcm9tICcuLi9jb21tb24vZW51bXMvaW5kZXguanMnO1xyXG5pbXBvcnQgeyBWb2x1bnRlZXJTdGF0cyB9IGZyb20gJy4uL2NvbW1vbi9kdG8vc3RhdHMudHlwZS5qcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBQaWNrdXBzU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBwcmlzbWE6IFByaXNtYVNlcnZpY2UpIHt9XHJcblxyXG4gIGFzeW5jIGdldEF2YWlsYWJsZVRhc2tzKCkge1xyXG4gICAgLy8gRG9uYXRpb25zIHRoYXQgYXJlIFJFUVVFU1RFRCBhbmQgbmVlZCBhIHZvbHVudGVlciB0byB0cmFuc3BvcnQsXHJcbiAgICAvLyBvciBkb25hdGlvbnMgdGhhdCBhcmUgQVZBSUxBQkxFIGZvciBkaXJlY3Qgdm9sdW50ZWVyIHBpY2t1cFxyXG4gICAgY29uc3QgaXRlbXMgPSBhd2FpdCB0aGlzLnByaXNtYS5kb25hdGlvbi5maW5kTWFueSh7XHJcbiAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgc3RhdHVzOiB7IGluOiBbRG9uYXRpb25TdGF0dXMuUkVRVUVTVEVELCBEb25hdGlvblN0YXR1cy5BVkFJTEFCTEVdIH0sXHJcbiAgICAgICAgZXhwaXJ5RGVhZGxpbmU6IHsgZ3Q6IG5ldyBEYXRlKCkgfSxcclxuICAgICAgfSxcclxuICAgICAgb3JkZXJCeTogeyBjcmVhdGVkQXQ6ICdkZXNjJyB9LFxyXG4gICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgZG9ub3I6IHRydWUsXHJcbiAgICAgICAgcmVxdWVzdHM6IHtcclxuICAgICAgICAgIGluY2x1ZGU6IHsgcmVjZWl2ZXI6IHRydWUgfSxcclxuICAgICAgICAgIG9yZGVyQnk6IHsgY3JlYXRlZEF0OiAnZGVzYycgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBpY2t1cFRhc2tzOiB7XHJcbiAgICAgICAgICBpbmNsdWRlOiB7IHZvbHVudGVlcjogdHJ1ZSB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gaXRlbXMubWFwKChpdGVtKSA9PiAoe1xyXG4gICAgICAuLi5pdGVtLFxyXG4gICAgICBjdXJyZW50UmVxdWVzdDogaXRlbS5yZXF1ZXN0cyAmJiBpdGVtLnJlcXVlc3RzLmxlbmd0aCA+IDAgPyBpdGVtLnJlcXVlc3RzWzBdIDogbnVsbCxcclxuICAgICAgY3VycmVudFRhc2s6IGl0ZW0ucGlja3VwVGFza3MgJiYgaXRlbS5waWNrdXBUYXNrcy5sZW5ndGggPiAwID8gaXRlbS5waWNrdXBUYXNrc1swXSA6IG51bGwsXHJcbiAgICB9KSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRNeVRhc2tzKHZvbHVudGVlcklkOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLnByaXNtYS5waWNrdXBUYXNrLmZpbmRNYW55KHtcclxuICAgICAgd2hlcmU6IHtcclxuICAgICAgICB2b2x1bnRlZXJJZCxcclxuICAgICAgICBzdGF0dXM6IHsgaW46IFtQaWNrdXBTdGF0dXMuQVNTSUdORUQsIFBpY2t1cFN0YXR1cy5QSUNLRURfVVBdIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIG9yZGVyQnk6IHsgY3JlYXRlZEF0OiAnZGVzYycgfSxcclxuICAgICAgaW5jbHVkZToge1xyXG4gICAgICAgIHZvbHVudGVlcjogdHJ1ZSxcclxuICAgICAgICBkZWxpdmVyeTogdHJ1ZSxcclxuICAgICAgICBkb25hdGlvbjoge1xyXG4gICAgICAgICAgaW5jbHVkZToge1xyXG4gICAgICAgICAgICBkb25vcjogdHJ1ZSxcclxuICAgICAgICAgICAgcmVxdWVzdHM6IHtcclxuICAgICAgICAgICAgICBpbmNsdWRlOiB7IHJlY2VpdmVyOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgb3JkZXJCeTogeyBjcmVhdGVkQXQ6ICdkZXNjJyB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRNeUhpc3Rvcnkodm9sdW50ZWVySWQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMucHJpc21hLnBpY2t1cFRhc2suZmluZE1hbnkoe1xyXG4gICAgICB3aGVyZToge1xyXG4gICAgICAgIHZvbHVudGVlcklkLFxyXG4gICAgICAgIHN0YXR1czogeyBpbjogW1BpY2t1cFN0YXR1cy5ERUxJVkVSRURdIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIG9yZGVyQnk6IHsgZGVsaXZlcmVkQXQ6ICdkZXNjJyB9LFxyXG4gICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgdm9sdW50ZWVyOiB0cnVlLFxyXG4gICAgICAgIGRlbGl2ZXJ5OiB0cnVlLFxyXG4gICAgICAgIGRvbmF0aW9uOiB7XHJcbiAgICAgICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgICAgIGRvbm9yOiB0cnVlLFxyXG4gICAgICAgICAgICByZXF1ZXN0czoge1xyXG4gICAgICAgICAgICAgIGluY2x1ZGU6IHsgcmVjZWl2ZXI6IHRydWUgfSxcclxuICAgICAgICAgICAgICBvcmRlckJ5OiB7IGNyZWF0ZWRBdDogJ2Rlc2MnIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGdldFRhc2tCeUlkKGlkOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHRhc2sgPSBhd2FpdCB0aGlzLnByaXNtYS5waWNrdXBUYXNrLmZpbmRVbmlxdWUoe1xyXG4gICAgICB3aGVyZTogeyBpZCB9LFxyXG4gICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgdm9sdW50ZWVyOiB0cnVlLFxyXG4gICAgICAgIGRlbGl2ZXJ5OiB0cnVlLFxyXG4gICAgICAgIGRvbmF0aW9uOiB7XHJcbiAgICAgICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgICAgIGRvbm9yOiB0cnVlLFxyXG4gICAgICAgICAgICByZXF1ZXN0czoge1xyXG4gICAgICAgICAgICAgIGluY2x1ZGU6IHsgcmVjZWl2ZXI6IHRydWUgfSxcclxuICAgICAgICAgICAgICBvcmRlckJ5OiB7IGNyZWF0ZWRBdDogJ2Rlc2MnIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIXRhc2spIHtcclxuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKGBQaWNrdXAgdGFzayB3aXRoIElEICR7aWR9IG5vdCBmb3VuZGApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0YXNrO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgYWNjZXB0UGlja3VwKHZvbHVudGVlcklkOiBzdHJpbmcsIGRvbmF0aW9uSWQ6IHN0cmluZywgbm90ZXM/OiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGRvbmF0aW9uID0gYXdhaXQgdGhpcy5wcmlzbWEuZG9uYXRpb24uZmluZFVuaXF1ZSh7XHJcbiAgICAgIHdoZXJlOiB7IGlkOiBkb25hdGlvbklkIH0sXHJcbiAgICAgIGluY2x1ZGU6IHsgcGlja3VwVGFza3M6IHRydWUgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICghZG9uYXRpb24pIHtcclxuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKCdEb25hdGlvbiBub3QgZm91bmQnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIGRvbmF0aW9uLnN0YXR1cyAhPT0gRG9uYXRpb25TdGF0dXMuUkVRVUVTVEVEICYmXHJcbiAgICAgIGRvbmF0aW9uLnN0YXR1cyAhPT0gRG9uYXRpb25TdGF0dXMuQVZBSUxBQkxFXHJcbiAgICApIHtcclxuICAgICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFeGNlcHRpb24oXHJcbiAgICAgICAgYENhbm5vdCBhY2NlcHQgcGlja3VwIHRhc2s6IGRvbmF0aW9uIGlzIGN1cnJlbnRseSAke2RvbmF0aW9uLnN0YXR1c31gXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgdGFzayBhbHJlYWR5IGFjdGl2ZVxyXG4gICAgY29uc3QgYWN0aXZlVGFzayA9IGRvbmF0aW9uLnBpY2t1cFRhc2tzLmZpbmQoXHJcbiAgICAgICh0KSA9PiB0LnN0YXR1cyA9PT0gUGlja3VwU3RhdHVzLkFTU0lHTkVEIHx8IHQuc3RhdHVzID09PSBQaWNrdXBTdGF0dXMuUElDS0VEX1VQXHJcbiAgICApO1xyXG4gICAgaWYgKGFjdGl2ZVRhc2spIHtcclxuICAgICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFeGNlcHRpb24oJ0Egdm9sdW50ZWVyIGhhcyBhbHJlYWR5IGJlZW4gYXNzaWduZWQgdG8gdGhpcyBkb25hdGlvbicpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IFt0YXNrXSA9IGF3YWl0IHRoaXMucHJpc21hLiR0cmFuc2FjdGlvbihbXHJcbiAgICAgIHRoaXMucHJpc21hLnBpY2t1cFRhc2suY3JlYXRlKHtcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBkb25hdGlvbklkLFxyXG4gICAgICAgICAgdm9sdW50ZWVySWQsXHJcbiAgICAgICAgICBzdGF0dXM6IFBpY2t1cFN0YXR1cy5BU1NJR05FRCxcclxuICAgICAgICAgIG5vdGVzLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5jbHVkZToge1xyXG4gICAgICAgICAgdm9sdW50ZWVyOiB0cnVlLFxyXG4gICAgICAgICAgZG9uYXRpb246IHtcclxuICAgICAgICAgICAgaW5jbHVkZToge1xyXG4gICAgICAgICAgICAgIGRvbm9yOiB0cnVlLFxyXG4gICAgICAgICAgICAgIHJlcXVlc3RzOiB7IGluY2x1ZGU6IHsgcmVjZWl2ZXI6IHRydWUgfSB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9KSxcclxuICAgICAgdGhpcy5wcmlzbWEuZG9uYXRpb24udXBkYXRlKHtcclxuICAgICAgICB3aGVyZTogeyBpZDogZG9uYXRpb25JZCB9LFxyXG4gICAgICAgIGRhdGE6IHsgc3RhdHVzOiBEb25hdGlvblN0YXR1cy5QSUNLVVBfQVNTSUdORUQgfSxcclxuICAgICAgfSksXHJcbiAgICBdKTtcclxuXHJcbiAgICByZXR1cm4gdGFzaztcclxuICB9XHJcblxyXG4gIGFzeW5jIHVwZGF0ZVBpY2t1cFN0YXR1cyh2b2x1bnRlZXJJZDogc3RyaW5nLCB0YXNrSWQ6IHN0cmluZywgc3RhdHVzOiBQaWNrdXBTdGF0dXMpIHtcclxuICAgIGNvbnN0IHRhc2sgPSBhd2FpdCB0aGlzLmdldFRhc2tCeUlkKHRhc2tJZCk7XHJcbiAgICBpZiAodGFzay52b2x1bnRlZXJJZCAhPT0gdm9sdW50ZWVySWQpIHtcclxuICAgICAgdGhyb3cgbmV3IEZvcmJpZGRlbkV4Y2VwdGlvbignWW91IGFyZSBub3QgYXNzaWduZWQgdG8gdGhpcyBwaWNrdXAgdGFzaycpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzdGF0dXMgPT09IFBpY2t1cFN0YXR1cy5QSUNLRURfVVApIHtcclxuICAgICAgaWYgKHRhc2suZG9uYXRpb24uc3RhdHVzICE9PSBEb25hdGlvblN0YXR1cy5QSUNLVVBfQVNTSUdORUQpIHtcclxuICAgICAgICB0aHJvdyBuZXcgQmFkUmVxdWVzdEV4Y2VwdGlvbihcclxuICAgICAgICAgIGBJbnZhbGlkIHN0YXRlIHRyYW5zaXRpb246IENhbm5vdCBtYXJrIGZvb2QgUElDS0VEX1VQIHdoZW4gY3VycmVudCBzdGF0ZSBpcyAke3Rhc2suZG9uYXRpb24uc3RhdHVzfWBcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBbdXBkYXRlZFRhc2tdID0gYXdhaXQgdGhpcy5wcmlzbWEuJHRyYW5zYWN0aW9uKFtcclxuICAgICAgICB0aGlzLnByaXNtYS5waWNrdXBUYXNrLnVwZGF0ZSh7XHJcbiAgICAgICAgICB3aGVyZTogeyBpZDogdGFza0lkIH0sXHJcbiAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIHN0YXR1czogUGlja3VwU3RhdHVzLlBJQ0tFRF9VUCxcclxuICAgICAgICAgICAgcGlja2VkVXBBdDogbmV3IERhdGUoKSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgICAgIHZvbHVudGVlcjogdHJ1ZSxcclxuICAgICAgICAgICAgZGVsaXZlcnk6IHRydWUsXHJcbiAgICAgICAgICAgIGRvbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgaW5jbHVkZToge1xyXG4gICAgICAgICAgICAgICAgZG9ub3I6IHRydWUsXHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0czogeyBpbmNsdWRlOiB7IHJlY2VpdmVyOiB0cnVlIH0gfSxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KSxcclxuICAgICAgICB0aGlzLnByaXNtYS5kb25hdGlvbi51cGRhdGUoe1xyXG4gICAgICAgICAgd2hlcmU6IHsgaWQ6IHRhc2suZG9uYXRpb25JZCB9LFxyXG4gICAgICAgICAgZGF0YTogeyBzdGF0dXM6IERvbmF0aW9uU3RhdHVzLlBJQ0tFRF9VUCB9LFxyXG4gICAgICAgIH0pLFxyXG4gICAgICBdKTtcclxuXHJcbiAgICAgIHJldHVybiB1cGRhdGVkVGFzaztcclxuICAgIH1cclxuXHJcbiAgICB0aHJvdyBuZXcgQmFkUmVxdWVzdEV4Y2VwdGlvbihgRGlyZWN0IHRyYW5zaXRpb24gdG8gc3RhdHVzICR7c3RhdHVzfSBpcyBub3Qgc3VwcG9ydGVkIHZpYSB0aGlzIG11dGF0aW9uYCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBjb25maXJtRGVsaXZlcnkodm9sdW50ZWVySWQ6IHN0cmluZywgdGFza0lkOiBzdHJpbmcsIHByb29mTm90ZXM/OiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHRhc2sgPSBhd2FpdCB0aGlzLmdldFRhc2tCeUlkKHRhc2tJZCk7XHJcbiAgICBpZiAodGFzay52b2x1bnRlZXJJZCAhPT0gdm9sdW50ZWVySWQpIHtcclxuICAgICAgdGhyb3cgbmV3IEZvcmJpZGRlbkV4Y2VwdGlvbignWW91IGFyZSBub3QgYXNzaWduZWQgdG8gdGhpcyBwaWNrdXAgdGFzaycpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0YXNrLmRvbmF0aW9uLnN0YXR1cyAhPT0gRG9uYXRpb25TdGF0dXMuUElDS0VEX1VQKSB7XHJcbiAgICAgIHRocm93IG5ldyBCYWRSZXF1ZXN0RXhjZXB0aW9uKFxyXG4gICAgICAgIGBJbnZhbGlkIHN0YXRlIHRyYW5zaXRpb246IENhbm5vdCBjb25maXJtIGRlbGl2ZXJ5IGJlZm9yZSBmb29kIGhhcyBiZWVuIG1hcmtlZCBQSUNLRURfVVAuIEN1cnJlbnQgc3RhdHVzOiAke3Rhc2suZG9uYXRpb24uc3RhdHVzfWBcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAgIGNvbnN0IFt1cGRhdGVkVGFza10gPSBhd2FpdCB0aGlzLnByaXNtYS4kdHJhbnNhY3Rpb24oW1xyXG4gICAgICB0aGlzLnByaXNtYS5waWNrdXBUYXNrLnVwZGF0ZSh7XHJcbiAgICAgICAgd2hlcmU6IHsgaWQ6IHRhc2tJZCB9LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIHN0YXR1czogUGlja3VwU3RhdHVzLkRFTElWRVJFRCxcclxuICAgICAgICAgIGRlbGl2ZXJlZEF0OiBub3csXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgICB2b2x1bnRlZXI6IHRydWUsXHJcbiAgICAgICAgICBkb25hdGlvbjoge1xyXG4gICAgICAgICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgICAgICAgZG9ub3I6IHRydWUsXHJcbiAgICAgICAgICAgICAgcmVxdWVzdHM6IHsgaW5jbHVkZTogeyByZWNlaXZlcjogdHJ1ZSB9IH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pLFxyXG4gICAgICB0aGlzLnByaXNtYS5kb25hdGlvbi51cGRhdGUoe1xyXG4gICAgICAgIHdoZXJlOiB7IGlkOiB0YXNrLmRvbmF0aW9uSWQgfSxcclxuICAgICAgICBkYXRhOiB7IHN0YXR1czogRG9uYXRpb25TdGF0dXMuREVMSVZFUkVEIH0sXHJcbiAgICAgIH0pLFxyXG4gICAgICB0aGlzLnByaXNtYS5kZWxpdmVyeS51cHNlcnQoe1xyXG4gICAgICAgIHdoZXJlOiB7IHRhc2tJZCB9LFxyXG4gICAgICAgIGNyZWF0ZToge1xyXG4gICAgICAgICAgdGFza0lkLFxyXG4gICAgICAgICAgcHJvb2ZOb3RlcyxcclxuICAgICAgICAgIHJlY2lwaWVudENvbmZpcm1hdGlvbjogZmFsc2UsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB1cGRhdGU6IHtcclxuICAgICAgICAgIHByb29mTm90ZXMsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSksXHJcbiAgICBdKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5nZXRUYXNrQnlJZCh0YXNrSWQpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgY29uZmlybVJlY2VpcHQocmVjZWl2ZXJJZDogc3RyaW5nLCBkb25hdGlvbklkOiBzdHJpbmcsIG5vdGVzPzogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBkb25hdGlvbiA9IGF3YWl0IHRoaXMucHJpc21hLmRvbmF0aW9uLmZpbmRVbmlxdWUoe1xyXG4gICAgICB3aGVyZTogeyBpZDogZG9uYXRpb25JZCB9LFxyXG4gICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgcmVxdWVzdHM6IHsgd2hlcmU6IHsgcmVjZWl2ZXJJZCB9IH0sXHJcbiAgICAgICAgcGlja3VwVGFza3M6IHsgaW5jbHVkZTogeyBkZWxpdmVyeTogdHJ1ZSB9IH0sXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIWRvbmF0aW9uKSB7XHJcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbignRG9uYXRpb24gbm90IGZvdW5kJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRvbmF0aW9uLnJlcXVlc3RzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICB0aHJvdyBuZXcgRm9yYmlkZGVuRXhjZXB0aW9uKCdZb3UgaGF2ZSBub3QgcmVxdWVzdGVkIHRoaXMgZG9uYXRpb24nKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZG9uYXRpb24uc3RhdHVzICE9PSBEb25hdGlvblN0YXR1cy5ERUxJVkVSRUQpIHtcclxuICAgICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFeGNlcHRpb24oXHJcbiAgICAgICAgYENhbm5vdCBjb25maXJtIHJlY2VpcHQ6IGZvb2QgaGFzIG5vdCBiZWVuIGRlbGl2ZXJlZCB5ZXQuIEN1cnJlbnQgc3RhdHVzIGlzICR7ZG9uYXRpb24uc3RhdHVzfWBcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhY3RpdmVUYXNrID0gZG9uYXRpb24ucGlja3VwVGFza3NbMF07XHJcbiAgICBjb25zdCByZXF1ZXN0SWQgPSBkb25hdGlvbi5yZXF1ZXN0c1swXS5pZDtcclxuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XHJcblxyXG4gICAgY29uc3Qgb3BzOiBhbnlbXSA9IFtcclxuICAgICAgdGhpcy5wcmlzbWEuZG9uYXRpb24udXBkYXRlKHtcclxuICAgICAgICB3aGVyZTogeyBpZDogZG9uYXRpb25JZCB9LFxyXG4gICAgICAgIGRhdGE6IHsgc3RhdHVzOiBEb25hdGlvblN0YXR1cy5DT01QTEVURUQgfSxcclxuICAgICAgfSksXHJcbiAgICAgIHRoaXMucHJpc21hLmRvbmF0aW9uUmVxdWVzdC51cGRhdGUoe1xyXG4gICAgICAgIHdoZXJlOiB7IGlkOiByZXF1ZXN0SWQgfSxcclxuICAgICAgICBkYXRhOiB7IHN0YXR1czogUmVxdWVzdFN0YXR1cy5GVUxGSUxMRUQgfSxcclxuICAgICAgfSksXHJcbiAgICBdO1xyXG5cclxuICAgIGlmIChhY3RpdmVUYXNrKSB7XHJcbiAgICAgIG9wcy5wdXNoKFxyXG4gICAgICAgIHRoaXMucHJpc21hLmRlbGl2ZXJ5LnVwc2VydCh7XHJcbiAgICAgICAgICB3aGVyZTogeyB0YXNrSWQ6IGFjdGl2ZVRhc2suaWQgfSxcclxuICAgICAgICAgIGNyZWF0ZToge1xyXG4gICAgICAgICAgICB0YXNrSWQ6IGFjdGl2ZVRhc2suaWQsXHJcbiAgICAgICAgICAgIHJlY2lwaWVudENvbmZpcm1hdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlybWVkQXQ6IG5vdyxcclxuICAgICAgICAgICAgcHJvb2ZOb3Rlczogbm90ZXMsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgdXBkYXRlOiB7XHJcbiAgICAgICAgICAgIHJlY2lwaWVudENvbmZpcm1hdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlybWVkQXQ6IG5vdyxcclxuICAgICAgICAgICAgcHJvb2ZOb3Rlczogbm90ZXMsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgYXdhaXQgdGhpcy5wcmlzbWEuJHRyYW5zYWN0aW9uKG9wcyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMucHJpc21hLmRvbmF0aW9uLmZpbmRVbmlxdWUoe1xyXG4gICAgICB3aGVyZTogeyBpZDogZG9uYXRpb25JZCB9LFxyXG4gICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgZG9ub3I6IHRydWUsXHJcbiAgICAgICAgcmVxdWVzdHM6IHsgaW5jbHVkZTogeyByZWNlaXZlcjogdHJ1ZSB9IH0sXHJcbiAgICAgICAgcGlja3VwVGFza3M6IHsgaW5jbHVkZTogeyB2b2x1bnRlZXI6IHRydWUsIGRlbGl2ZXJ5OiB0cnVlIH0gfSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0Vm9sdW50ZWVyU3RhdHModm9sdW50ZWVySWQ6IHN0cmluZyk6IFByb21pc2U8Vm9sdW50ZWVyU3RhdHM+IHtcclxuICAgIGNvbnN0IGF2YWlsYWJsZVRhc2tzID0gYXdhaXQgdGhpcy5wcmlzbWEuZG9uYXRpb24uY291bnQoe1xyXG4gICAgICB3aGVyZToge1xyXG4gICAgICAgIHN0YXR1czogeyBpbjogW0RvbmF0aW9uU3RhdHVzLlJFUVVFU1RFRCwgRG9uYXRpb25TdGF0dXMuQVZBSUxBQkxFXSB9LFxyXG4gICAgICAgIGV4cGlyeURlYWRsaW5lOiB7IGd0OiBuZXcgRGF0ZSgpIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBhY3RpdmVUYXNrcyA9IGF3YWl0IHRoaXMucHJpc21hLnBpY2t1cFRhc2suY291bnQoe1xyXG4gICAgICB3aGVyZToge1xyXG4gICAgICAgIHZvbHVudGVlcklkLFxyXG4gICAgICAgIHN0YXR1czogeyBpbjogW1BpY2t1cFN0YXR1cy5BU1NJR05FRCwgUGlja3VwU3RhdHVzLlBJQ0tFRF9VUF0gfSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGNvbXBsZXRlZFBpY2t1cHMgPSBhd2FpdCB0aGlzLnByaXNtYS5waWNrdXBUYXNrLmNvdW50KHtcclxuICAgICAgd2hlcmU6IHtcclxuICAgICAgICB2b2x1bnRlZXJJZCxcclxuICAgICAgICBzdGF0dXM6IFBpY2t1cFN0YXR1cy5ERUxJVkVSRUQsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XHJcbiAgICB0b2RheS5zZXRIb3VycygwLCAwLCAwLCAwKTtcclxuXHJcbiAgICBjb25zdCB0b2RheVRhc2tzID0gYXdhaXQgdGhpcy5wcmlzbWEucGlja3VwVGFzay5jb3VudCh7XHJcbiAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgdm9sdW50ZWVySWQsXHJcbiAgICAgICAgY3JlYXRlZEF0OiB7IGd0ZTogdG9kYXkgfSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGF2YWlsYWJsZVRhc2tzLFxyXG4gICAgICBhY3RpdmVUYXNrcyxcclxuICAgICAgY29tcGxldGVkUGlja3VwcyxcclxuICAgICAgdG9kYXlUYXNrcyxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXREb25hdGlvbkZvclRhc2soZG9uYXRpb25JZDogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wcmlzbWEuZG9uYXRpb24uZmluZFVuaXF1ZSh7XHJcbiAgICAgIHdoZXJlOiB7IGlkOiBkb25hdGlvbklkIH0sXHJcbiAgICAgIGluY2x1ZGU6IHtcclxuICAgICAgICBkb25vcjogdHJ1ZSxcclxuICAgICAgICByZXF1ZXN0czoge1xyXG4gICAgICAgICAgaW5jbHVkZTogeyByZWNlaXZlcjogdHJ1ZSB9LFxyXG4gICAgICAgICAgb3JkZXJCeTogeyBjcmVhdGVkQXQ6ICdkZXNjJyB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGlja3VwVGFza3M6IHtcclxuICAgICAgICAgIGluY2x1ZGU6IHsgdm9sdW50ZWVyOiB0cnVlLCBkZWxpdmVyeTogdHJ1ZSB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIkluamVjdGFibGUiLCJOb3RGb3VuZEV4Y2VwdGlvbiIsIkJhZFJlcXVlc3RFeGNlcHRpb24iLCJGb3JiaWRkZW5FeGNlcHRpb24iLCJQcmlzbWFTZXJ2aWNlIiwiRG9uYXRpb25TdGF0dXMiLCJQaWNrdXBTdGF0dXMiLCJSZXF1ZXN0U3RhdHVzIiwiUGlja3Vwc1NlcnZpY2UiLCJwcmlzbWEiLCJnZXRBdmFpbGFibGVUYXNrcyIsIml0ZW1zIiwiZG9uYXRpb24iLCJmaW5kTWFueSIsIndoZXJlIiwic3RhdHVzIiwiaW4iLCJSRVFVRVNURUQiLCJBVkFJTEFCTEUiLCJleHBpcnlEZWFkbGluZSIsImd0IiwiRGF0ZSIsIm9yZGVyQnkiLCJjcmVhdGVkQXQiLCJpbmNsdWRlIiwiZG9ub3IiLCJyZXF1ZXN0cyIsInJlY2VpdmVyIiwicGlja3VwVGFza3MiLCJ2b2x1bnRlZXIiLCJtYXAiLCJpdGVtIiwiY3VycmVudFJlcXVlc3QiLCJsZW5ndGgiLCJjdXJyZW50VGFzayIsImdldE15VGFza3MiLCJ2b2x1bnRlZXJJZCIsInBpY2t1cFRhc2siLCJBU1NJR05FRCIsIlBJQ0tFRF9VUCIsImRlbGl2ZXJ5IiwiZ2V0TXlIaXN0b3J5IiwiREVMSVZFUkVEIiwiZGVsaXZlcmVkQXQiLCJnZXRUYXNrQnlJZCIsImlkIiwidGFzayIsImZpbmRVbmlxdWUiLCJhY2NlcHRQaWNrdXAiLCJkb25hdGlvbklkIiwibm90ZXMiLCJhY3RpdmVUYXNrIiwiZmluZCIsInQiLCIkdHJhbnNhY3Rpb24iLCJjcmVhdGUiLCJkYXRhIiwidXBkYXRlIiwiUElDS1VQX0FTU0lHTkVEIiwidXBkYXRlUGlja3VwU3RhdHVzIiwidGFza0lkIiwidXBkYXRlZFRhc2siLCJwaWNrZWRVcEF0IiwiY29uZmlybURlbGl2ZXJ5IiwicHJvb2ZOb3RlcyIsIm5vdyIsInVwc2VydCIsInJlY2lwaWVudENvbmZpcm1hdGlvbiIsImNvbmZpcm1SZWNlaXB0IiwicmVjZWl2ZXJJZCIsInJlcXVlc3RJZCIsIm9wcyIsIkNPTVBMRVRFRCIsImRvbmF0aW9uUmVxdWVzdCIsIkZVTEZJTExFRCIsInB1c2giLCJjb25maXJtZWRBdCIsImdldFZvbHVudGVlclN0YXRzIiwiYXZhaWxhYmxlVGFza3MiLCJjb3VudCIsImFjdGl2ZVRhc2tzIiwiY29tcGxldGVkUGlja3VwcyIsInRvZGF5Iiwic2V0SG91cnMiLCJ0b2RheVRhc2tzIiwiZ3RlIiwiZ2V0RG9uYXRpb25Gb3JUYXNrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxTQUNFQSxVQUFVLEVBQ1ZDLGlCQUFpQixFQUNqQkMsbUJBQW1CLEVBQ25CQyxrQkFBa0IsUUFDYixpQkFBaUI7QUFDeEIsU0FBU0MsYUFBYSxRQUFRLDhCQUE4QjtBQUM1RCxTQUNFQyxjQUFjLEVBQ2RDLFlBQVksRUFDWkMsYUFBYSxRQUNSLDJCQUEyQjtBQUlsQyxPQUFPLE1BQU1DO0lBQ1gsWUFBWSxBQUFpQkMsTUFBcUIsQ0FBRTthQUF2QkEsU0FBQUE7SUFBd0I7SUFFckQsTUFBTUMsb0JBQW9CO1FBQ3hCLGtFQUFrRTtRQUNsRSw4REFBOEQ7UUFDOUQsTUFBTUMsUUFBUSxNQUFNLElBQUksQ0FBQ0YsTUFBTSxDQUFDRyxRQUFRLENBQUNDLFFBQVEsQ0FBQztZQUNoREMsT0FBTztnQkFDTEMsUUFBUTtvQkFBRUMsSUFBSTt3QkFBQ1gsZUFBZVksU0FBUzt3QkFBRVosZUFBZWEsU0FBUztxQkFBQztnQkFBQztnQkFDbkVDLGdCQUFnQjtvQkFBRUMsSUFBSSxJQUFJQztnQkFBTztZQUNuQztZQUNBQyxTQUFTO2dCQUFFQyxXQUFXO1lBQU87WUFDN0JDLFNBQVM7Z0JBQ1BDLE9BQU87Z0JBQ1BDLFVBQVU7b0JBQ1JGLFNBQVM7d0JBQUVHLFVBQVU7b0JBQUs7b0JBQzFCTCxTQUFTO3dCQUFFQyxXQUFXO29CQUFPO2dCQUMvQjtnQkFDQUssYUFBYTtvQkFDWEosU0FBUzt3QkFBRUssV0FBVztvQkFBSztnQkFDN0I7WUFDRjtRQUNG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