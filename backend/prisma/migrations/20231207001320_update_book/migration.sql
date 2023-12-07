-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "publicationDate" TEXT NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "Book_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Book_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Book" ("author", "categoryId", "id", "name", "publicationDate", "userId") SELECT "author", "categoryId", "id", "name", "publicationDate", "userId" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE UNIQUE INDEX "Book_name_key" ON "Book"("name");
CREATE UNIQUE INDEX "Book_author_key" ON "Book"("author");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
