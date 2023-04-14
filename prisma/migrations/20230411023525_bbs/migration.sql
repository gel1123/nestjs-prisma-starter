-- CreateTable
CREATE TABLE "Bbs" (
    "id" UUID NOT NULL,
    "bbsName" VARCHAR(100) NOT NULL,

    CONSTRAINT "Bbs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BbsThread" (
    "id" UUID NOT NULL,
    "bbsId" UUID NOT NULL,
    "threadName" VARCHAR(100) NOT NULL,
    "description" VARCHAR(2000) NOT NULL,

    CONSTRAINT "BbsThread_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BbsResponse" (
    "id" UUID NOT NULL,
    "bbsThreadId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "postedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" VARCHAR(2000) NOT NULL,

    CONSTRAINT "BbsResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BbsUser" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "userName" VARCHAR(100) NOT NULL,

    CONSTRAINT "BbsUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BbsThread" ADD CONSTRAINT "BbsThread_bbsId_fkey" FOREIGN KEY ("bbsId") REFERENCES "Bbs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BbsResponse" ADD CONSTRAINT "BbsResponse_bbsThreadId_fkey" FOREIGN KEY ("bbsThreadId") REFERENCES "BbsThread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BbsResponse" ADD CONSTRAINT "BbsResponse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "BbsUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
