/*
  Warnings:

  - You are about to alter the column `vl_preco` on the `prato` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,6)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "prato" ALTER COLUMN "vl_preco" SET DATA TYPE INTEGER;
