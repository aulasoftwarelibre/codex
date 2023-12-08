-- CreateEnum
CREATE TYPE "BookState" AS ENUM ('AVAILABLE', 'LOANED');

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "authors" TEXT[],
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 0,
    "state" "BookState" NOT NULL DEFAULT 'AVAILABLE',

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
