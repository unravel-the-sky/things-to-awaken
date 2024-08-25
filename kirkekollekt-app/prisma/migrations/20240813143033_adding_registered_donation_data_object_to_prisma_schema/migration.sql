-- CreateTable
CREATE TABLE "RegisteredDonation" (
    "id" TEXT NOT NULL,
    "dates" TEXT[],
    "organisationId" TEXT NOT NULL,

    CONSTRAINT "RegisteredDonation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RegisteredDonation" ADD CONSTRAINT "RegisteredDonation_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
