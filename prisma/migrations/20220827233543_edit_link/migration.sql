/*
  Warnings:

  - Added the required column `connected` to the `Link` table without a default value. This is not possible if the table is not empty.
  - Made the column `username` on table `Link` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "connected" BOOLEAN NOT NULL,
ALTER COLUMN "username" SET NOT NULL;
