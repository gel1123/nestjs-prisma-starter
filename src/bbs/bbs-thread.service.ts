import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { BbsThread } from './models/bbs-thread.model';
import { BbsThreadResponse } from './models/bbs-thread-response.model';
import { Bbs } from './models/bbs.model';
import { CreateBbsThreadInput } from './dto/create-bbs-thread.input';

@Injectable()
export class BbsThreadService {
  constructor(private prisma: PrismaService) {}

  async bbsThread(
    id: string
  ): Promise<Omit<BbsThread, 'bbs' | 'responses'> | null> {
    const thread = await this.prisma.bbsThread.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        threadName: true,
        description: true,
      },
    });
    if (!thread) return null;
    return {
      threadId: thread.id,
      threadName: thread.threadName,
      description: thread.description,
    };
  }

  async responses(
    bbsThread: Omit<BbsThread, 'bbs' | 'responses'>
  ): Promise<Omit<BbsThreadResponse, 'user' | 'thread'>[]> {
    const responses = await this.prisma.bbsThreadResponse.findMany({
      where: {
        bbsThreadId: bbsThread.threadId,
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

  async bbs(
    bbsThread: Omit<BbsThread, 'bbs' | 'responses'>
  ): Promise<Bbs | null> {
    const thread = await this.prisma.bbsThread.findUnique({
      where: {
        id: bbsThread.threadId,
      },
      select: {
        bbs: {
          select: {
            id: true,
            bbsName: true,
          },
        },
      },
    });
    if (!thread) return null;
    return {
      bbsId: thread.bbs.id,
      bbsName: thread.bbs.bbsName,
    };
  }

  async createBbsThread(
    input: CreateBbsThreadInput
  ): Promise<Omit<BbsThread, 'bbs' | 'responses'>> {
    const thread = await this.prisma.bbsThread.create({
      data: {
        threadName: input.threadName,
        description: input.description,
        bbsId: input.bbsId,
      },
      select: {
        id: true,
        threadName: true,
        description: true,
      },
    });
    return {
      threadId: thread.id,
      threadName: thread.threadName,
      description: thread.description,
    };
  }
}
