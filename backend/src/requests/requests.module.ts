import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service.js';
import { RequestsResolver } from './requests.resolver.js';

@Module({
  providers: [RequestsService, RequestsResolver],
  exports: [RequestsService],
})
export class RequestsModule {}
