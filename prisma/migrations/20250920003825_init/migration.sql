-- CreateTable
CREATE TABLE "public"."Admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Farm" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "adminId" TEXT NOT NULL,

    CONSTRAINT "Farm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Pasture" (
    "id" TEXT NOT NULL,
    "farmId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "area" DOUBLE PRECISION NOT NULL,
    "percentAEF" DOUBLE PRECISION NOT NULL,
    "vacas" INTEGER NOT NULL,
    "vacasWeight" DOUBLE PRECISION NOT NULL,
    "bezerros" INTEGER NOT NULL,
    "bezerrosWeight" DOUBLE PRECISION NOT NULL,
    "novilha" INTEGER NOT NULL,
    "novilhaWeight" DOUBLE PRECISION NOT NULL,
    "touro" INTEGER NOT NULL,
    "touroWeight" DOUBLE PRECISION NOT NULL,
    "gabarro" INTEGER NOT NULL,
    "gabarroWeight" DOUBLE PRECISION NOT NULL,
    "tropa" INTEGER NOT NULL,
    "tropaWeight" DOUBLE PRECISION NOT NULL,
    "bois" INTEGER NOT NULL,
    "boisWeight" DOUBLE PRECISION NOT NULL,
    "animals" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "cocho" DOUBLE PRECISION NOT NULL,
    "demand" DOUBLE PRECISION NOT NULL DEFAULT 0.05,
    "observation" TEXT,
    "pesoCat" DOUBLE PRECISION,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pasture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FeedingRecord" (
    "id" TEXT NOT NULL,
    "pastureId" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "daysUsed" INTEGER NOT NULL,
    "feedKg" DOUBLE PRECISION NOT NULL,
    "consumptionPercentPV" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recordedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeedingRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "public"."Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Farm_email_key" ON "public"."Farm"("email");

-- AddForeignKey
ALTER TABLE "public"."Farm" ADD CONSTRAINT "Farm_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "public"."Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Pasture" ADD CONSTRAINT "Pasture_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "public"."Farm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FeedingRecord" ADD CONSTRAINT "FeedingRecord_pastureId_fkey" FOREIGN KEY ("pastureId") REFERENCES "public"."Pasture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
