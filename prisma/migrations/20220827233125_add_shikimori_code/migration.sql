/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Link` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Link` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "code" TEXT NOT NULL,
ALTER COLUMN "username" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Link_username_key" ON "Link"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Link_code_key" ON "Link"("code");
