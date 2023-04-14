import { IsUUID } from 'class-validator';
import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class BbsIdArgs {
  @Field({
    description: '掲示板のID',
  })
  @IsUUID()
  id!: string;
}
