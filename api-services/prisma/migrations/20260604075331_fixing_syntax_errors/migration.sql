/*
  Warnings:

  - You are about to drop the column `workpsaceMember_id` on the `Log` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_workpsaceMember_id_fkey";

-- AlterTable
ALTER TABLE "Log" DROP COLUMN "workpsaceMember_id",
ADD COLUMN     "workspaceMember_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_workspaceMember_id_fkey" FOREIGN KEY ("workspaceMember_id") REFERENCES "WorkspaceMember"("id") ON DELETE SET NULL ON UPDATE CASCADE;
