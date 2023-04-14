import { IsNotEmpty, Length } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType({
  description: '新しいユーザーを作成する',
})
export class CreateBbsUserInput {
  @Field({
    description: 'ユーザーの名前',
  })
  @IsNotEmpty()
  @Length(1, 100)
  userName!: string;
}
