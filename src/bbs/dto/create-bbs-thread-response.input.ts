import { IsNotEmpty, IsUUID, Length } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType({
  description: '新しいレスを作成する',
})
export class CreateBbsThreadResponseInput {
  @Field({
    description: 'レスの内容',
  })
  @IsNotEmpty()
  @Length(1, 2000)
  content!: string;

  @Field({
    description: 'レスを作成するユーザーのID',
  })
  @IsNotEmpty()
  @IsUUID()
  userId!: string;

  @Field({
    description: 'レスを作成するスレッドのID',
  })
  @IsNotEmpty()
  @IsUUID()
  threadId!: string;
}
