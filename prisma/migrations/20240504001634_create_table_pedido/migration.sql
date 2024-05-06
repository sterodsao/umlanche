-- CreateTable
CREATE TABLE "pedido" (
    "id_prato_pedido" SERIAL NOT NULL,
    "id_prato" INTEGER NOT NULL,
    "id_externo" UUID NOT NULL,
    "solicitado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "retirado_em" TIMESTAMP(3),

    CONSTRAINT "pk_pedido" PRIMARY KEY ("id_prato_pedido")
);

-- AddForeignKey
ALTER TABLE "pedido" ADD CONSTRAINT "pedido_id_prato_fkey" FOREIGN KEY ("id_prato") REFERENCES "prato"("id_prato") ON DELETE RESTRICT ON UPDATE CASCADE;
