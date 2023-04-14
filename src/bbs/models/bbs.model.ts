import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BbsThread } from './bbs-thread.model';

/**
 * 下記の構造を持つモデルを表す。
 * - 掲示板（Bbs）
 *   - 掲示板のID
 *   - 掲示板の名前
 *   - 掲示板に立てられたスレッドのリスト
 */
@ObjectType({
  description: '掲示板',
})
export class Bbs {
  @Field((type) => ID, {
    description: '掲示板のID',
  })
  bbsId!: string;

  @Field((type) => String, {
    description: '掲示板の名前',
  })
  bbsName!: string;

  @Field((type) => [BbsThread], {
    nullable: true,
    description: '掲示板に立てられたスレッドのリスト',
  })
  threads?: BbsThread[];
}
