/*
  Warnings:

  - The `dates` column on the `RegisteredDonation` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "RegisteredDonation" DROP COLUMN "dates",
ADD COLUMN     "dates" TIMESTAMP(3)[];
