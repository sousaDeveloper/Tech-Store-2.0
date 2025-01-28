-- CreateEnum
CREATE TYPE "TypeUser" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "TypeUser" "TypeUser" NOT NULL DEFAULT 'USER';
