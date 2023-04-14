import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { BbsUser } from './models/bbs-user.model';
import { CreateBbsUserInput } from './dto/create-bbs-user.input';
import { BbsThreadResponse } from './models/bbs-thread-response.model';
import { BbsUserService } from './bbs-user.service';

@Resolver(() => BbsUser)
export class BbsUserResolver {
  constructor(private bbsUserService: BbsUserService) {}

  @Query(() => BbsUser, {
    description: 'ユーザーをIDで取得する',
    nullable: true,
  })
  async bbsUser(
    @Args('id', { type: () => ID, description: 'ユーザーのID' }) id: string
  ): Promise<Omit<BbsUser, 'responses'> | null> {
    return this.bbsUserService.bbsUser(id);
  }

  @ResolveField()
  async responses(
    @Parent() bbsUser: Omit<BbsUser, 'responses'>
  ): Promise<Omit<BbsThreadResponse, 'user' | 'thread'>[]> {
    return this.bbsUserService.responses(bbsUser);
  }

  @Mutation(() => BbsUser, {
    description: '新しい掲示板ユーザーを作成する',
  })
  async createBbsUser(
    @Args('input') input: CreateBbsUserInput
  ): Promise<Omit<BbsUser, 'responses'>> {
    return this.bbsUserService.createBbsUser(input);
  }
}
