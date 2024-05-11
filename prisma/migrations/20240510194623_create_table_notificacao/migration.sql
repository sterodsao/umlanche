/*
  Warnings:

  - A unique constraint covering the columns `[id_externo]` on the table `pedido` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "notificacao" (
    "id" TEXT NOT NULL,
    "identificador_id" UUID NOT NULL,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,

    CONSTRAINT "notificacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ui_pedido_001" ON "pedido"("id_externo");

-- AddForeignKey
ALTER TABLE "notificacao" ADD CONSTRAINT "notificacao_identificador_id_fkey" FOREIGN KEY ("identificador_id") REFERENCES "pedido"("id_externo") ON DELETE RESTRICT ON UPDATE CASCADE;
