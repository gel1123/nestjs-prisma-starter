import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { BbsThread } from './models/bbs-thread.model';
import { CreateBbsThreadInput } from './dto/create-bbs-thread.input';
import { BbsThreadResponse } from './models/bbs-thread-response.model';
import { Bbs } from './models/bbs.model';
import { BbsThreadService } from './bbs-thread.service';

@Resolver(() => BbsThread)
export class BbsThreadResolver {
  constructor(private bbsThreadService: BbsThreadService) {}

  @Query(() => BbsThread, {
    description: 'スレッドをIDで取得する',
    nullable: true,
  })
  async bbsThread(
    @Args('id', { type: () => ID, description: 'スレッドのID' }) id: string
  ): Promise<Omit<BbsThread, 'bbs' | 'responses'> | null> {
    return this.bbsThreadService.bbsThread(id);
  }

  @ResolveField()
  async responses(
    @Parent() bbsThread: Omit<BbsThread, 'bbs' | 'responses'>
  ): Promise<Omit<BbsThreadResponse, 'user' | 'thread'>[]> {
    return this.bbsThreadService.responses(bbsThread);
  }

  @ResolveField()
  async bbs(
    @Parent() bbsThread: Omit<BbsThread, 'bbs' | 'responses'>
  ): Promise<Bbs | null> {
    return this.bbsThreadService.bbs(bbsThread);
  }

  @Mutation(() => BbsThread, {
    description: '新しい掲示板ユーザーを作成する',
  })
  async createBbsThread(
    @Args('input') input: CreateBbsThreadInput
  ): Promise<Omit<BbsThread, 'bbs' | 'responses'>> {
    return this.bbsThreadService.createBbsThread(input);
  }
}
