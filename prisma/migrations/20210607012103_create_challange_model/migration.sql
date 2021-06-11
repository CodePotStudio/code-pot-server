-- CreateEnum
CREATE TYPE "ChallangeStatus" AS ENUM ('PREPARING', 'RECRUITING', 'RECRUITMENT_CLOSED', 'INPROGRESS', 'CLOSED');

-- CreateTable
CREATE TABLE "Challange" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "thumbnail" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "remarks" TEXT NOT NULL,
    "status" "ChallangeStatus" NOT NULL,
    "startDateTime" TIMESTAMP(3) NOT NULL,
    "endDateTime" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);
