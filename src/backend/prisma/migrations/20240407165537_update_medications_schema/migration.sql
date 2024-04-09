/*
  Warnings:

  - You are about to drop the column `tratment_finished_at` on the `medications` table. All the data in the column will be lost.
  - Added the required column `treatment_finished_at` to the `medications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "medications" DROP COLUMN "tratment_finished_at",
ADD COLUMN     "treatment_finished_at" TIMESTAMP(3) NOT NULL;
