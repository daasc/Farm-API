-- AlterTable
ALTER TABLE "public"."FeedingRecord" ADD COLUMN     "abastecimentoKg" DOUBLE PRECISION,
ADD COLUMN     "categoria" TEXT,
ADD COLUMN     "dataFim" TIMESTAMP(3),
ADD COLUMN     "dataInicio" TIMESTAMP(3);
