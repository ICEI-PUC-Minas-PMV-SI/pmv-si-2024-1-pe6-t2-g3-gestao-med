-- AlterTable
ALTER TABLE "medications" ADD COLUMN     "deleted_at" TIMESTAMP(3),
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "treatment_finished_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "registers" ALTER COLUMN "time_taken" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "updated_at" DROP NOT NULL;
