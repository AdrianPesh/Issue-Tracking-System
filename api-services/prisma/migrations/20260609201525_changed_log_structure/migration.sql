/*
  Warnings:

  - You are about to drop the column `comment_id` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `job_id` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `reply_id` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `workspaceMember_id` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `workspace_id` on the `Log` table. All the data in the column will be lost.
  - Added the required column `entityId` to the `Log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entityType` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "entityTypes" AS ENUM ('USER', 'WORKSPACE', 'WORKSPACE_MEMBER', 'JOB', 'MESSAGE', 'COMMENT', 'REPLY');

-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_comment_id_fkey";

-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_job_id_fkey";

-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_reply_id_fkey";

-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_workspaceMember_id_fkey";

-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_workspace_id_fkey";

-- AlterTable
ALTER TABLE "Log" DROP COLUMN "comment_id",
DROP COLUMN "job_id",
DROP COLUMN "reply_id",
DROP COLUMN "type",
DROP COLUMN "user_id",
DROP COLUMN "workspaceMember_id",
DROP COLUMN "workspace_id",
ADD COLUMN     "entityId" INTEGER NOT NULL,
ADD COLUMN     "entityType" "entityTypes" NOT NULL;

-- DropEnum
DROP TYPE "Types";
