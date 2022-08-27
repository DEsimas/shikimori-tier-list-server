/*
  Warnings:

  - Made the column `username` on table `Link` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Link" ALTER COLUMN "username" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "authId" DROP NOT NULL,
ALTER COLUMN "linkId" DROP NOT NULL;
