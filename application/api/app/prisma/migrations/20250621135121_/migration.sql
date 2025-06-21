-- CreateEnum
CREATE TYPE "WCondition" AS ENUM ('RAINY', 'PARTYCLOUDY', 'SUNNY', 'CLOUDY');

-- CreateTable
CREATE TABLE "Weather" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "temperature" INTEGER NOT NULL,
    "condition" "WCondition" NOT NULL DEFAULT 'SUNNY',
    "humidity" INTEGER NOT NULL,
    "windSpeed" INTEGER NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "Weather_pkey" PRIMARY KEY ("id")
);
