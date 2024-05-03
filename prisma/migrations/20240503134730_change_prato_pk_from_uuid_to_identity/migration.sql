/*
  Warnings:

  - The primary key for the `prato` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id_prato` column on the `prato` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "prato" DROP CONSTRAINT "pk_prato",
DROP COLUMN "id_prato",
ADD COLUMN     "id_prato" SERIAL NOT NULL,
ADD CONSTRAINT "pk_prato" PRIMARY KEY ("id_prato");
