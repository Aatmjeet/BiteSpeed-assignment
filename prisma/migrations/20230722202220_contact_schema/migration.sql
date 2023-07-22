-- CreateEnum
CREATE TYPE "ContactType" AS ENUM ('primary', 'secondary');

-- CreateTable
CREATE TABLE "tbl__contact" (
    "id" SERIAL NOT NULL,
    "phoneNumber" TEXT,
    "email" TEXT,
    "linkedId" INTEGER,
    "linkPrecedence" "ContactType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "tbl__contact_pkey" PRIMARY KEY ("id")
);
