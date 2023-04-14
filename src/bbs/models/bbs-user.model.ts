import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BbsThreadResponse } from './bbs-thread-response.model';

/**
 * 下記の構造を持つモデルを表す。
 * - ユーザー（BbsUser）
 *   - ユーザーのID
 *   - ユーザー名
 *   - ユーザーが投稿したレスのリスト
 */
@ObjectType({
  description: 'ユーザー',
})
export class BbsUser {
  @Field((type) => ID, {
    description: 'ユーザーのID',
  })
  userId!: string;

  @Field((type) => String, {
    description: 'ユーザー名',
  })
  userName!: string;

  @Field((type) => [BbsThreadResponse], {
    nullable: true,
    description: 'ユーザーが投稿したレスのリスト',
  })
  responses?: BbsThreadResponse[];
}
