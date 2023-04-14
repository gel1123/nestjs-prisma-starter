import { IsNotEmpty, IsUUID, Length } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType({
  description: '新しいスレッドを立てる',
})
export class CreateBbsThreadInput {
  @Field({
    description: 'スレッドの名前',
  })
  @IsNotEmpty()
  @Length(1, 100)
  threadName!: string;

  @Field({
    description: 'スレッドの説明',
  })
  @IsNotEmpty()
  @Length(1, 2000)
  description!: string;

  @Field({
    description: 'スレッドを立てる掲示板のID',
  })
  @IsNotEmpty()
  @IsUUID()
  bbsId!: string;
}
