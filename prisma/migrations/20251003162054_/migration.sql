-- CreateEnum
CREATE TYPE "public"."FarmType" AS ENUM ('CRIA', 'RECRIA', 'ENGORDA', 'CICLO_COMPLETO');

-- AlterTable
ALTER TABLE "public"."Farm" ADD COLUMN     "types" "public"."FarmType"[];
