import { IsNotEmpty, Length } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType({
  description: '新しい掲示板を立てる',
})
export class CreateBbsInput {
  @Field({
    description: '掲示板の名前',
  })
  @IsNotEmpty()
  @Length(1, 100)
  bbsName!: string;
}
