import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Bbs } from './models/bbs.model';
import { CreateBbsInput } from './dto/create-bbs.input';
import { BbsIdArgs } from './dto/bbs-id.args';
import { BbsService } from './bbs.service';
import { BbsThread } from './models/bbs-thread.model';

@Resolver(() => Bbs)
export class BbsResolver {
  constructor(private bbsService: BbsService) {}

  @Query(() => Bbs, {
    description: '掲示板をIDで取得する',
    nullable: true,
  })
  async bbs(@Args() args: BbsIdArgs): Promise<Bbs | null> {
    return this.bbsService.bbs(args);
  }

  @ResolveField()
  async threads(
    @Parent() bbs: Bbs,
    @Args('limit', {
      type: () => Int,
      description: '取得件数の上限',
      nullable: true,
    })
    limit?: number
  ): Promise<Omit<BbsThread, 'bbs'>[]> {
    return this.bbsService.threads(bbs, limit);
  }

  @Mutation(() => Bbs, {
    description: '新しい掲示板を作成する',
  })
  async createBbs(@Args('input') input: CreateBbsInput): Promise<Bbs> {
    return this.bbsService.createBbs(input);
  }
}
