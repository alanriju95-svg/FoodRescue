import { Module } from '@nestjs/common';
import { PickupsService } from './pickups.service.js';
import { PickupsResolver } from './pickups.resolver.js';

@Module({
  providers: [PickupsService, PickupsResolver],
  exports: [PickupsService],
})
export class PickupsModule {}
