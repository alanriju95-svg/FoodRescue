import { Module } from '@nestjs/common';
import { DonationsService } from './donations.service.js';
import { DonationsResolver } from './donations.resolver.js';

@Module({
  providers: [DonationsService, DonationsResolver],
  exports: [DonationsService],
})
export class DonationsModule {}
