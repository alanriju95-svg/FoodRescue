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
import { DonationStatus, RequestStatus } from '../common/enums/index.js';
export class RequestsService {
    constructor(prisma){
        this.prisma = prisma;
    }
    async createRequest(receiverId, input) {
        const donation = await this.prisma.donation.findUnique({
            where: {
                id: input.donationId
            }
        });
        if (!donation) {
            throw new NotFoundException('Donation not found');
        }
        if (donation.status !== DonationStatus.AVAILABLE) {
            throw new BadRequestException(`Cannot request this food item: it is currently ${donation.status}`);
        }
        // Create the request and transition donation status to REQUESTED
        const [request] = await this.prisma.$transaction([
            this.prisma.donationRequest.create({
                data: {
                    donationId: input.donationId,
                    receiverId,
                    deliveryAddress: input.deliveryAddress,
                    notes: input.notes,
                    status: RequestStatus.PENDING
                },
                include: {
                    receiver: true,
                    donation: {
                        include: {
                            donor: true
                        }
                    }
                }
            }),
            this.prisma.donation.update({
                where: {
                    id: input.donationId
                },
                data: {
                    status: DonationStatus.REQUESTED
                }
            })
        ]);
        return request;
    }
    async findByReceiver(receiverId) {
        return this.prisma.donationRequest.findMany({
            where: {
                receiverId
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                receiver: true,
                donation: {
                    include: {
                        donor: true,
                        pickupTasks: {
                            include: {
                                volunteer: true,
                                delivery: true
                            }
                        }
                    }
                }
            }
        });
    }
    async findById(id) {
        const req = await this.prisma.donationRequest.findUnique({
            where: {
                id
            },
            include: {
                receiver: true,
                donation: {
                    include: {
                        donor: true,
                        pickupTasks: {
                            include: {
                                volunteer: true,
                                delivery: true
                            }
                        }
                    }
                }
            }
        });
        if (!req) {
            throw new NotFoundException(`Donation request with ID ${id} not found`);
        }
        return req;
    }
    async cancelRequest(receiverId, id) {
        const request = await this.findById(id);
        if (request.receiverId !== receiverId) {
            throw new ForbiddenException('Not authorized to cancel this request');
        }
        if (request.donation.status === DonationStatus.PICKED_UP || request.donation.status === DonationStatus.DELIVERED || request.donation.status === DonationStatus.COMPLETED) {
            throw new BadRequestException('Cannot cancel request: the food is already in transit or has been delivered');
        }
        const [updated] = await this.prisma.$transaction([
            this.prisma.donationRequest.update({
                where: {
                    id
                },
                data: {
                    status: RequestStatus.CANCELLED
                },
                include: {
                    receiver: true,
                    donation: true
                }
            }),
            this.prisma.donation.update({
                where: {
                    id: request.donationId
                },
                data: {
                    status: DonationStatus.AVAILABLE
                }
            })
        ]);
        return updated;
    }
    async getReceiverStats(receiverId) {
        const availableFood = await this.prisma.donation.count({
            where: {
                status: DonationStatus.AVAILABLE,
                expiryDeadline: {
                    gt: new Date()
                }
            }
        });
        const pendingRequests = await this.prisma.donationRequest.count({
            where: {
                receiverId,
                status: RequestStatus.PENDING
            }
        });
        const activeDeliveries = await this.prisma.donationRequest.count({
            where: {
                receiverId,
                donation: {
                    status: {
                        in: [
                            DonationStatus.REQUESTED,
                            DonationStatus.PICKUP_ASSIGNED,
                            DonationStatus.PICKED_UP,
                            DonationStatus.DELIVERED
                        ]
                    }
                },
                status: {
                    not: RequestStatus.CANCELLED
                }
            }
        });
        const completedRequests = await this.prisma.donationRequest.count({
            where: {
                receiverId,
                donation: {
                    status: DonationStatus.COMPLETED
                }
            }
        });
        return {
            availableFood,
            pendingRequests,
            activeDeliveries,
            completedRequests
        };
    }
}
RequestsService = _ts_decorate([
    Injectable(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof PrismaService === "undefined" ? Object : PrismaService
    ])
], RequestsService);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXF1ZXN0cy9yZXF1ZXN0cy5zZXJ2aWNlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgSW5qZWN0YWJsZSxcclxuICBOb3RGb3VuZEV4Y2VwdGlvbixcclxuICBCYWRSZXF1ZXN0RXhjZXB0aW9uLFxyXG4gIEZvcmJpZGRlbkV4Y2VwdGlvbixcclxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XHJcbmltcG9ydCB7IFByaXNtYVNlcnZpY2UgfSBmcm9tICcuLi9wcmlzbWEvcHJpc21hLnNlcnZpY2UuanMnO1xyXG5pbXBvcnQgeyBDcmVhdGVSZXF1ZXN0SW5wdXQgfSBmcm9tICcuL2R0by9jcmVhdGUtcmVxdWVzdC5pbnB1dC5qcyc7XHJcbmltcG9ydCB7IERvbmF0aW9uU3RhdHVzLCBSZXF1ZXN0U3RhdHVzLCBQaWNrdXBTdGF0dXMgfSBmcm9tICcuLi9jb21tb24vZW51bXMvaW5kZXguanMnO1xyXG5pbXBvcnQgeyBSZWNlaXZlclN0YXRzIH0gZnJvbSAnLi4vY29tbW9uL2R0by9zdGF0cy50eXBlLmpzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFJlcXVlc3RzU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBwcmlzbWE6IFByaXNtYVNlcnZpY2UpIHt9XHJcblxyXG4gIGFzeW5jIGNyZWF0ZVJlcXVlc3QocmVjZWl2ZXJJZDogc3RyaW5nLCBpbnB1dDogQ3JlYXRlUmVxdWVzdElucHV0KSB7XHJcbiAgICBjb25zdCBkb25hdGlvbiA9IGF3YWl0IHRoaXMucHJpc21hLmRvbmF0aW9uLmZpbmRVbmlxdWUoe1xyXG4gICAgICB3aGVyZTogeyBpZDogaW5wdXQuZG9uYXRpb25JZCB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCFkb25hdGlvbikge1xyXG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oJ0RvbmF0aW9uIG5vdCBmb3VuZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkb25hdGlvbi5zdGF0dXMgIT09IERvbmF0aW9uU3RhdHVzLkFWQUlMQUJMRSkge1xyXG4gICAgICB0aHJvdyBuZXcgQmFkUmVxdWVzdEV4Y2VwdGlvbihcclxuICAgICAgICBgQ2Fubm90IHJlcXVlc3QgdGhpcyBmb29kIGl0ZW06IGl0IGlzIGN1cnJlbnRseSAke2RvbmF0aW9uLnN0YXR1c31gXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ3JlYXRlIHRoZSByZXF1ZXN0IGFuZCB0cmFuc2l0aW9uIGRvbmF0aW9uIHN0YXR1cyB0byBSRVFVRVNURURcclxuICAgIGNvbnN0IFtyZXF1ZXN0XSA9IGF3YWl0IHRoaXMucHJpc21hLiR0cmFuc2FjdGlvbihbXHJcbiAgICAgIHRoaXMucHJpc21hLmRvbmF0aW9uUmVxdWVzdC5jcmVhdGUoe1xyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIGRvbmF0aW9uSWQ6IGlucHV0LmRvbmF0aW9uSWQsXHJcbiAgICAgICAgICByZWNlaXZlcklkLFxyXG4gICAgICAgICAgZGVsaXZlcnlBZGRyZXNzOiBpbnB1dC5kZWxpdmVyeUFkZHJlc3MsXHJcbiAgICAgICAgICBub3RlczogaW5wdXQubm90ZXMsXHJcbiAgICAgICAgICBzdGF0dXM6IFJlcXVlc3RTdGF0dXMuUEVORElORyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluY2x1ZGU6IHtcclxuICAgICAgICAgIHJlY2VpdmVyOiB0cnVlLFxyXG4gICAgICAgICAgZG9uYXRpb246IHtcclxuICAgICAgICAgICAgaW5jbHVkZTogeyBkb25vcjogdHJ1ZSB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9KSxcclxuICAgICAgdGhpcy5wcmlzbWEuZG9uYXRpb24udXBkYXRlKHtcclxuICAgICAgICB3aGVyZTogeyBpZDogaW5wdXQuZG9uYXRpb25JZCB9LFxyXG4gICAgICAgIGRhdGE6IHsgc3RhdHVzOiBEb25hdGlvblN0YXR1cy5SRVFVRVNURUQgfSxcclxuICAgICAgfSksXHJcbiAgICBdKTtcclxuXHJcbiAgICByZXR1cm4gcmVxdWVzdDtcclxuICB9XHJcblxyXG4gIGFzeW5jIGZpbmRCeVJlY2VpdmVyKHJlY2VpdmVySWQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMucHJpc21hLmRvbmF0aW9uUmVxdWVzdC5maW5kTWFueSh7XHJcbiAgICAgIHdoZXJlOiB7IHJlY2VpdmVySWQgfSxcclxuICAgICAgb3JkZXJCeTogeyBjcmVhdGVkQXQ6ICdkZXNjJyB9LFxyXG4gICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgcmVjZWl2ZXI6IHRydWUsXHJcbiAgICAgICAgZG9uYXRpb246IHtcclxuICAgICAgICAgIGluY2x1ZGU6IHtcclxuICAgICAgICAgICAgZG9ub3I6IHRydWUsXHJcbiAgICAgICAgICAgIHBpY2t1cFRhc2tzOiB7XHJcbiAgICAgICAgICAgICAgaW5jbHVkZTogeyB2b2x1bnRlZXI6IHRydWUsIGRlbGl2ZXJ5OiB0cnVlIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGZpbmRCeUlkKGlkOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHJlcSA9IGF3YWl0IHRoaXMucHJpc21hLmRvbmF0aW9uUmVxdWVzdC5maW5kVW5pcXVlKHtcclxuICAgICAgd2hlcmU6IHsgaWQgfSxcclxuICAgICAgaW5jbHVkZToge1xyXG4gICAgICAgIHJlY2VpdmVyOiB0cnVlLFxyXG4gICAgICAgIGRvbmF0aW9uOiB7XHJcbiAgICAgICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgICAgIGRvbm9yOiB0cnVlLFxyXG4gICAgICAgICAgICBwaWNrdXBUYXNrczoge1xyXG4gICAgICAgICAgICAgIGluY2x1ZGU6IHsgdm9sdW50ZWVyOiB0cnVlLCBkZWxpdmVyeTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCFyZXEpIHtcclxuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXhjZXB0aW9uKGBEb25hdGlvbiByZXF1ZXN0IHdpdGggSUQgJHtpZH0gbm90IGZvdW5kYCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlcTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGNhbmNlbFJlcXVlc3QocmVjZWl2ZXJJZDogc3RyaW5nLCBpZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCByZXF1ZXN0ID0gYXdhaXQgdGhpcy5maW5kQnlJZChpZCk7XHJcbiAgICBpZiAocmVxdWVzdC5yZWNlaXZlcklkICE9PSByZWNlaXZlcklkKSB7XHJcbiAgICAgIHRocm93IG5ldyBGb3JiaWRkZW5FeGNlcHRpb24oJ05vdCBhdXRob3JpemVkIHRvIGNhbmNlbCB0aGlzIHJlcXVlc3QnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIHJlcXVlc3QuZG9uYXRpb24uc3RhdHVzID09PSBEb25hdGlvblN0YXR1cy5QSUNLRURfVVAgfHxcclxuICAgICAgcmVxdWVzdC5kb25hdGlvbi5zdGF0dXMgPT09IERvbmF0aW9uU3RhdHVzLkRFTElWRVJFRCB8fFxyXG4gICAgICByZXF1ZXN0LmRvbmF0aW9uLnN0YXR1cyA9PT0gRG9uYXRpb25TdGF0dXMuQ09NUExFVEVEXHJcbiAgICApIHtcclxuICAgICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFeGNlcHRpb24oXHJcbiAgICAgICAgJ0Nhbm5vdCBjYW5jZWwgcmVxdWVzdDogdGhlIGZvb2QgaXMgYWxyZWFkeSBpbiB0cmFuc2l0IG9yIGhhcyBiZWVuIGRlbGl2ZXJlZCdcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBbdXBkYXRlZF0gPSBhd2FpdCB0aGlzLnByaXNtYS4kdHJhbnNhY3Rpb24oW1xyXG4gICAgICB0aGlzLnByaXNtYS5kb25hdGlvblJlcXVlc3QudXBkYXRlKHtcclxuICAgICAgICB3aGVyZTogeyBpZCB9LFxyXG4gICAgICAgIGRhdGE6IHsgc3RhdHVzOiBSZXF1ZXN0U3RhdHVzLkNBTkNFTExFRCB9LFxyXG4gICAgICAgIGluY2x1ZGU6IHsgcmVjZWl2ZXI6IHRydWUsIGRvbmF0aW9uOiB0cnVlIH0sXHJcbiAgICAgIH0pLFxyXG4gICAgICB0aGlzLnByaXNtYS5kb25hdGlvbi51cGRhdGUoe1xyXG4gICAgICAgIHdoZXJlOiB7IGlkOiByZXF1ZXN0LmRvbmF0aW9uSWQgfSxcclxuICAgICAgICBkYXRhOiB7IHN0YXR1czogRG9uYXRpb25TdGF0dXMuQVZBSUxBQkxFIH0sXHJcbiAgICAgIH0pLFxyXG4gICAgXSk7XHJcblxyXG4gICAgcmV0dXJuIHVwZGF0ZWQ7XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRSZWNlaXZlclN0YXRzKHJlY2VpdmVySWQ6IHN0cmluZyk6IFByb21pc2U8UmVjZWl2ZXJTdGF0cz4ge1xyXG4gICAgY29uc3QgYXZhaWxhYmxlRm9vZCA9IGF3YWl0IHRoaXMucHJpc21hLmRvbmF0aW9uLmNvdW50KHtcclxuICAgICAgd2hlcmU6IHtcclxuICAgICAgICBzdGF0dXM6IERvbmF0aW9uU3RhdHVzLkFWQUlMQUJMRSxcclxuICAgICAgICBleHBpcnlEZWFkbGluZTogeyBndDogbmV3IERhdGUoKSB9LFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgcGVuZGluZ1JlcXVlc3RzID0gYXdhaXQgdGhpcy5wcmlzbWEuZG9uYXRpb25SZXF1ZXN0LmNvdW50KHtcclxuICAgICAgd2hlcmU6IHtcclxuICAgICAgICByZWNlaXZlcklkLFxyXG4gICAgICAgIHN0YXR1czogUmVxdWVzdFN0YXR1cy5QRU5ESU5HLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgYWN0aXZlRGVsaXZlcmllcyA9IGF3YWl0IHRoaXMucHJpc21hLmRvbmF0aW9uUmVxdWVzdC5jb3VudCh7XHJcbiAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgcmVjZWl2ZXJJZCxcclxuICAgICAgICBkb25hdGlvbjoge1xyXG4gICAgICAgICAgc3RhdHVzOiB7XHJcbiAgICAgICAgICAgIGluOiBbXHJcbiAgICAgICAgICAgICAgRG9uYXRpb25TdGF0dXMuUkVRVUVTVEVELFxyXG4gICAgICAgICAgICAgIERvbmF0aW9uU3RhdHVzLlBJQ0tVUF9BU1NJR05FRCxcclxuICAgICAgICAgICAgICBEb25hdGlvblN0YXR1cy5QSUNLRURfVVAsXHJcbiAgICAgICAgICAgICAgRG9uYXRpb25TdGF0dXMuREVMSVZFUkVELFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0YXR1czogeyBub3Q6IFJlcXVlc3RTdGF0dXMuQ0FOQ0VMTEVEIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBjb21wbGV0ZWRSZXF1ZXN0cyA9IGF3YWl0IHRoaXMucHJpc21hLmRvbmF0aW9uUmVxdWVzdC5jb3VudCh7XHJcbiAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgcmVjZWl2ZXJJZCxcclxuICAgICAgICBkb25hdGlvbjoge1xyXG4gICAgICAgICAgc3RhdHVzOiBEb25hdGlvblN0YXR1cy5DT01QTEVURUQsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGF2YWlsYWJsZUZvb2QsXHJcbiAgICAgIHBlbmRpbmdSZXF1ZXN0cyxcclxuICAgICAgYWN0aXZlRGVsaXZlcmllcyxcclxuICAgICAgY29tcGxldGVkUmVxdWVzdHMsXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiSW5qZWN0YWJsZSIsIk5vdEZvdW5kRXhjZXB0aW9uIiwiQmFkUmVxdWVzdEV4Y2VwdGlvbiIsIkZvcmJpZGRlbkV4Y2VwdGlvbiIsIlByaXNtYVNlcnZpY2UiLCJEb25hdGlvblN0YXR1cyIsIlJlcXVlc3RTdGF0dXMiLCJSZXF1ZXN0c1NlcnZpY2UiLCJwcmlzbWEiLCJjcmVhdGVSZXF1ZXN0IiwicmVjZWl2ZXJJZCIsImlucHV0IiwiZG9uYXRpb24iLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJpZCIsImRvbmF0aW9uSWQiLCJzdGF0dXMiLCJBVkFJTEFCTEUiLCJyZXF1ZXN0IiwiJHRyYW5zYWN0aW9uIiwiZG9uYXRpb25SZXF1ZXN0IiwiY3JlYXRlIiwiZGF0YSIsImRlbGl2ZXJ5QWRkcmVzcyIsIm5vdGVzIiwiUEVORElORyIsImluY2x1ZGUiLCJyZWNlaXZlciIsImRvbm9yIiwidXBkYXRlIiwiUkVRVUVTVEVEIiwiZmluZEJ5UmVjZWl2ZXIiLCJmaW5kTWFueSIsIm9yZGVyQnkiLCJjcmVhdGVkQXQiLCJwaWNrdXBUYXNrcyIsInZvbHVudGVlciIsImRlbGl2ZXJ5IiwiZmluZEJ5SWQiLCJyZXEiLCJjYW5jZWxSZXF1ZXN0IiwiUElDS0VEX1VQIiwiREVMSVZFUkVEIiwiQ09NUExFVEVEIiwidXBkYXRlZCIsIkNBTkNFTExFRCIsImdldFJlY2VpdmVyU3RhdHMiLCJhdmFpbGFibGVGb29kIiwiY291bnQiLCJleHBpcnlEZWFkbGluZSIsImd0IiwiRGF0ZSIsInBlbmRpbmdSZXF1ZXN0cyIsImFjdGl2ZURlbGl2ZXJpZXMiLCJpbiIsIlBJQ0tVUF9BU1NJR05FRCIsIm5vdCIsImNvbXBsZXRlZFJlcXVlc3RzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxTQUNFQSxVQUFVLEVBQ1ZDLGlCQUFpQixFQUNqQkMsbUJBQW1CLEVBQ25CQyxrQkFBa0IsUUFDYixpQkFBaUI7QUFDeEIsU0FBU0MsYUFBYSxRQUFRLDhCQUE4QjtBQUU1RCxTQUFTQyxjQUFjLEVBQUVDLGFBQWEsUUFBc0IsMkJBQTJCO0FBSXZGLE9BQU8sTUFBTUM7SUFDWCxZQUFZLEFBQWlCQyxNQUFxQixDQUFFO2FBQXZCQSxTQUFBQTtJQUF3QjtJQUVy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