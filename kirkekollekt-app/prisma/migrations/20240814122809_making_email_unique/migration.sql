/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Donator` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Donator_email_key" ON "Donator"("email");
