/*
  Warnings:

  - A unique constraint covering the columns `[userId,challangeId]` on the table `Enroll` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Enroll.userId_challangeId_unique" ON "Enroll"("userId", "challangeId");
