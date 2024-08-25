-- CreateTable
CREATE TABLE "MailTemplate" (
    "id" TEXT NOT NULL,
    "template" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "udpatedBy" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "MailTemplate_pkey" PRIMARY KEY ("id")
);
