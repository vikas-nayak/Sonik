/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `AudioFile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AudioFile_id_key" ON "AudioFile"("id");
