/*
  Warnings:

  - Added the required column `description` to the `medications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `medications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time_to_take` to the `medications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tratment_finished_at` to the `medications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `medications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "medications" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "stock" INTEGER NOT NULL,
ADD COLUMN     "time_to_take" TEXT NOT NULL,
ADD COLUMN     "tratment_finished_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "registers" (
    "id" TEXT NOT NULL,
    "medication_id" TEXT NOT NULL,
    "medication_taken" BOOLEAN NOT NULL,
    "time_taken" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "registers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "registers" ADD CONSTRAINT "registers_medication_id_fkey" FOREIGN KEY ("medication_id") REFERENCES "medications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
