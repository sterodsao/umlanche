/*
  Warnings:

  - You are about to drop the column `atualizado_em` on the `prato` table. All the data in the column will be lost.
  - You are about to drop the column `ds_descricao` on the `prato` table. All the data in the column will be lost.
  - Added the required column `alterado_em` to the `prato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ds_ingredientes` to the `prato` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "prato" DROP COLUMN "atualizado_em",
DROP COLUMN "ds_descricao",
ADD COLUMN     "alterado_em" TIMESTAMP NOT NULL,
ADD COLUMN     "ds_ingredientes" VARCHAR(200) NOT NULL;
