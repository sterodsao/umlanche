/*
  Warnings:

  - Added the required column `ds_email_responsavel` to the `pedido` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pedido" ADD COLUMN     "ds_email_responsavel" VARCHAR(100) NOT NULL;
