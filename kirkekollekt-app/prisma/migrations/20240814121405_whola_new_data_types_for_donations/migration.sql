/*
  Warnings:

  - You are about to drop the column `dates` on the `RegisteredDonation` table. All the data in the column will be lost.
  - You are about to drop the column `organisationId` on the `RegisteredDonation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "RegisteredDonation" DROP CONSTRAINT "RegisteredDonation_organisationId_fkey";

-- AlterTable
ALTER TABLE "RegisteredDonation" DROP COLUMN "dates",
DROP COLUMN "organisationId",
ADD COLUMN     "donatorEmail" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "donatorName" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "Donation" (
    "id" TEXT NOT NULL,
    "organisationId" TEXT NOT NULL,
    "dates" TIMESTAMP(3)[],
    "registeredDonationId" TEXT,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_registeredDonationId_fkey" FOREIGN KEY ("registeredDonationId") REFERENCES "RegisteredDonation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
