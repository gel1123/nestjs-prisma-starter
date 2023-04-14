import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { BbsThreadResponse } from './models/bbs-thread-response.model';
import { CreateBbsThreadResponseInput } from './dto/create-bbs-thread-response.input';
import { BbsThread } from './models/bbs-thread.model';
import { BbsUser } from './models/bbs-user.model';
import { BbsThreadResponseService } from './bbs-thread-response.service';

@Resolver(() => BbsThreadResponse)
export class BbsThreadResponseResolver {
  constructor(private bbsThreadResponseService: BbsThreadResponseService) {}

  @Query(() => BbsThreadResponse, {
    description: 'レスポンスをIDで取得する',
    nullable: true,
  })
  async bbsThreadResponse(
    @Args('id', { type: () => ID, description: 'レスポンスのID' }) id: string
  ): Promise<Omit<BbsThreadResponse, 'user' | 'thread'> | null> {
    return this.bbsThreadResponseService.bbsThreadResponse(id);
  }

  @ResolveField()
  async thread(
    @Parent() bbsThreadResponse: Omit<BbsThreadResponse, 'user' | 'thread'>
  ): Promise<Omit<BbsThread, 'bbs'> | null> {
    return this.bbsThreadResponseService.thread(bbsThreadResponse);
  }

  @ResolveField()
  async user(
    @Parent() bbsThreadResponse: Omit<BbsThreadResponse, 'user' | 'thread'>
  ): Promise<BbsUser | null> {
    return this.bbsThreadResponseService.user(bbsThreadResponse);
  }

  @Mutation(() => BbsThreadResponse, {
    description: '新しい掲示板ユーザーを作成する',
  })
  async createBbsThreadResponse(
    @Args('input') input: CreateBbsThreadResponseInput
  ): Promise<Omit<BbsThreadResponse, 'thread' | 'user'>> {
    return this.bbsThreadResponseService.createBbsThreadResponse(input);
  }
}
