import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BbsThread } from './bbs-thread.model';
import { BbsUser } from './bbs-user.model';

/**
 * 下記の構造を持つモデルを表す。
 * - レス（BbsThreadResponse）
 *   - レスのID
 *   - レスの内容
 *   - レスを投稿したユーザー
 *   - レスを投稿した日時
 *   - レスを投稿したスレッド
 */
@ObjectType({
  description: 'レス',
})
export class BbsThreadResponse {
  @Field((type) => ID, {
    description: 'レスのID',
  })
  responseId!: string;

  @Field((type) => String, {
    description: 'レスの内容',
  })
  content!: string;

  @Field((type) => BbsUser, {
    description: 'レスを投稿したユーザー',
  })
  user!: BbsUser;

  @Field((type) => Date, {
    description: 'レスを投稿した日時',
  })
  postedAt!: Date;

  @Field((type) => BbsThread, {
    description: 'レスを投稿したスレッド',
  })
  thread!: BbsThread;
}
