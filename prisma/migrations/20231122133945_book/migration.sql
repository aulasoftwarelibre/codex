-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "authors" TEXT[],
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
