import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { BbsUser } from './models/bbs-user.model';
import { BbsThreadResponse } from './models/bbs-thread-response.model';
import { CreateBbsUserInput } from './dto/create-bbs-user.input';

@Injectable()
export class BbsUserService {
  constructor(private prisma: PrismaService) {}

  async bbsUser(id: string): Promise<Omit<BbsUser, 'responses'> | null> {
    const user = await this.prisma.bbsUser.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        userName: true,
      },
    });
    if (!user) return null;
    return {
      userId: user.id,
      userName: user.userName,
    };
  }

  async responses(
    bbsUser: Omit<BbsUser, 'responses'>
  ): Promise<Omit<BbsThreadResponse, 'user' | 'thread'>[]> {
    const responses = await this.prisma.bbsThreadResponse.findMany({
      where: {
        userId: bbsUser.userId,
      },
      select: {
        id: true,
        content: true,
        postedAt: true,
      },
    });
    return responses.map((res) => ({
      responseId: res.id,
      content: res.content,
      postedAt: res.postedAt,
    }));
  }

  async createBbsUser(
    input: CreateBbsUserInput
  ): Promise<Omit<BbsUser, 'responses'>> {
    const user = await this.prisma.bbsUser.create({
      data: {
        userName: input.userName,
      },
      select: {
        id: true,
        userName: true,
      },
    });
    return {
      userId: user.id,
      userName: user.userName,
    };
  }
}
