/*
  Warnings:

  - You are about to drop the `BbsResponse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BbsResponse" DROP CONSTRAINT "BbsResponse_bbsThreadId_fkey";

-- DropForeignKey
ALTER TABLE "BbsResponse" DROP CONSTRAINT "BbsResponse_userId_fkey";

-- DropTable
DROP TABLE "BbsResponse";

-- CreateTable
CREATE TABLE "BbsThreadResponse" (
    "id" UUID NOT NULL,
    "bbsThreadId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "postedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" VARCHAR(2000) NOT NULL,

    CONSTRAINT "BbsThreadResponse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BbsThreadResponse" ADD CONSTRAINT "BbsThreadResponse_bbsThreadId_fkey" FOREIGN KEY ("bbsThreadId") REFERENCES "BbsThread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BbsThreadResponse" ADD CONSTRAINT "BbsThreadResponse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "BbsUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
