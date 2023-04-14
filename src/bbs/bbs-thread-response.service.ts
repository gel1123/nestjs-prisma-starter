import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { BbsThread } from './models/bbs-thread.model';
import { BbsThreadResponse } from './models/bbs-thread-response.model';
import { BbsUser } from './models/bbs-user.model';
import { CreateBbsThreadResponseInput } from './dto/create-bbs-thread-response.input';

@Injectable()
export class BbsThreadResponseService {
  constructor(private prisma: PrismaService) {}

  async bbsThreadResponse(
    id: string
  ): Promise<Omit<BbsThreadResponse, 'user' | 'thread'> | null> {
    const response = await this.prisma.bbsThreadResponse.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        content: true,
        postedAt: true,
      },
    });
    if (!response) return null;
    return {
      responseId: response.id,
      content: response.content,
      postedAt: response.postedAt,
    };
  }

  async thread(
    bbsThreadResponse: Omit<BbsThreadResponse, 'user' | 'thread'>
  ): Promise<Omit<BbsThread, 'bbs'> | null> {
    const response = await this.prisma.bbsThreadResponse.findUnique({
      where: {
        id: bbsThreadResponse.responseId,
      },
      select: {
        bbsThread: {
          select: {
            id: true,
            threadName: true,
            description: true,
          },
        },
      },
    });
    if (!response) return null;
    return {
      threadId: response.bbsThread.id,
      threadName: response.bbsThread.threadName,
      description: response.bbsThread.description,
    };
  }

  async user(
    bbsThreadResponse: Omit<BbsThreadResponse, 'user' | 'thread'>
  ): Promise<BbsUser | null> {
    // const user = await this.bbsService.getBbsUserByResponseId(
    //   bbsThreadResponse.responseId
    // );
    // if (!user) return null;
    // return {
    //   userId: user.id,
    //   userName: user.userName,
    // };
    const response = await this.prisma.bbsThreadResponse.findUnique({
      where: {
        id: bbsThreadResponse.responseId,
      },
      select: {
        user: {
          select: {
            id: true,
            userName: true,
          },
        },
      },
    });
    if (!response) return null;
    return {
      userId: response.user.id,
      userName: response.user.userName,
    };
  }

  async createBbsThreadResponse(
    input: CreateBbsThreadResponseInput
  ): Promise<Omit<BbsThreadResponse, 'thread' | 'user'>> {
    const response = await this.prisma.bbsThreadResponse.create({
      data: {
        content: input.content,
        bbsThreadId: input.threadId,
        userId: input.userId,
      },
      select: {
        id: true,
        content: true,
        postedAt: true,
      },
    });
    return {
      content: response.content,
      postedAt: response.postedAt,
      responseId: response.id,
    };
  }
}
