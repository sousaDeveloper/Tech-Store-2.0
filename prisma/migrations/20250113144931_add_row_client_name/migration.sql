/*
  Warnings:

  - You are about to drop the column `Assessment` on the `Testimonial` table. All the data in the column will be lost.
  - You are about to drop the column `Date` on the `Testimonial` table. All the data in the column will be lost.
  - You are about to drop the column `Description` on the `Testimonial` table. All the data in the column will be lost.
  - Added the required column `assessment` to the `Testimonial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientName` to the `Testimonial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Testimonial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Testimonial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Testimonial" DROP COLUMN "Assessment",
DROP COLUMN "Date",
DROP COLUMN "Description",
ADD COLUMN     "assessment" TEXT NOT NULL,
ADD COLUMN     "clientName" TEXT NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "text" TEXT NOT NULL;
