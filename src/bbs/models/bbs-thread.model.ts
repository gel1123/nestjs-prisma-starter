import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BbsThreadResponse } from './bbs-thread-response.model';
import { Bbs } from './bbs.model';

/**
 * 下記の構造を持つモデルを表す。
 * - スレッド（BbsThread）
 *   - スレッドのID
 *   - スレッド名
 *   - スレッドの説明
 *   - スレッドに投稿されたレスのリスト
 *   - スレッドを立てた掲示板
 */
@ObjectType({
  description: 'スレッド',
})
export class BbsThread {
  @Field((type) => ID, {
    description: 'スレッドのID',
  })
  threadId!: string;

  @Field((type) => String, {
    description: 'スレッド名',
  })
  threadName!: string;

  @Field((type) => String, {
    description: 'スレッドの説明',
  })
  description!: string;

  @Field((type) => [BbsThreadResponse], {
    nullable: true,
    description: 'スレッドに投稿されたレスのリスト',
  })
  responses?: BbsThreadResponse[];

  @Field((type) => Bbs, {
    description: 'スレッドを立てた掲示板',
  })
  bbs!: Bbs;
}
