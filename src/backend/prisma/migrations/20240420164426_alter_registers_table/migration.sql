/*
  Warnings:

  - Added the required column `medication_name` to the `registers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "registers" ADD COLUMN     "medication_name" TEXT NOT NULL;
