import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateBbsInput } from './dto/create-bbs.input';
import { BbsIdArgs } from './dto/bbs-id.args';
import { Bbs } from './models/bbs.model';
import { BbsThread } from './models/bbs-thread.model';

@Injectable()
export class BbsService {
  constructor(private prisma: PrismaService) {}

  async bbs(args: BbsIdArgs): Promise<Bbs | null> {
    const bbs = await this.prisma.bbs.findUnique({
      where: {
        id: args.id,
      },
      select: {
        id: true,
        bbsName: true,
      },
    });
    if (!bbs) return null;
    return {
      bbsId: bbs.id,
      bbsName: bbs.bbsName,
    };
  }

  async threads(
    bbs: Bbs,
    limit: number | undefined
  ): Promise<Omit<BbsThread, 'bbs'>[]> {
    const threads = await this.prisma.bbsThread.findMany({
      where: {
        bbsId: bbs.bbsId,
      },
      select: {
        id: true,
        threadName: true,
        description: true,
      },
      take: limit,
    });
    return threads.map((thread) => {
      return {
        threadId: thread.id,
        threadName: thread.threadName,
        description: thread.description,
      };
    });
  }

  async createBbs(input: CreateBbsInput): Promise<Bbs> {
    const bbs = await this.prisma.bbs.create({
      data: {
        bbsName: input.bbsName,
      },
      select: {
        id: true,
        bbsName: true,
      },
    });
    return {
      bbsId: bbs.id,
      bbsName: bbs.bbsName,
    };
  }
}
