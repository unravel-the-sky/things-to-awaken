-- AlterTable
ALTER TABLE "Donation" ADD COLUMN     "donatorId" TEXT;

-- CreateTable
CREATE TABLE "Donator" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Donator_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_donatorId_fkey" FOREIGN KEY ("donatorId") REFERENCES "Donator"("id") ON DELETE SET NULL ON UPDATE CASCADE;
