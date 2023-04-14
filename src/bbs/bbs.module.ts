import { Module } from '@nestjs/common';
import { BbsResolver } from './bbs.resolver';
import { BbsUserResolver } from './bbs-user.resolver';
import { BbsThreadResolver } from './bbs-thread.resolver';
import { BbsThreadResponseResolver } from './bbs-thread-response.resolver';
import { BbsService } from './bbs.service';
import { BbsUserService } from './bbs-user.service';
import { BbsThreadService } from './bbs-thread.service';
import { BbsThreadResponseService } from './bbs-thread-response.service';

@Module({
  imports: [],
  providers: [
    BbsResolver,
    BbsUserResolver,
    BbsThreadResolver,
    BbsThreadResponseResolver,
    BbsService,
    BbsUserService,
    BbsThreadService,
    BbsThreadResponseService,
  ],
})
export class BbsModule {}
