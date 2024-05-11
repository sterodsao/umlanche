-- CreateTable
CREATE TABLE "prato" (
    "id_prato" SERIAL NOT NULL,
    "ds_nome" VARCHAR(100) NOT NULL,
    "ds_ingredientes" VARCHAR(200) NOT NULL,
    "vl_preco" INTEGER NOT NULL,
    "fg_ativo" BOOLEAN NOT NULL DEFAULT true,
    "incluido_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "alterado_em" TIMESTAMP NOT NULL,

    CONSTRAINT "pk_prato" PRIMARY KEY ("id_prato")
);

-- CreateTable
CREATE TABLE "pedido" (
    "id_pedido" SERIAL NOT NULL,
    "id_prato" INTEGER NOT NULL,
    "id_externo" UUID NOT NULL,
    "ds_email_responsavel" VARCHAR(100) NOT NULL,
    "solicitado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "retirado_em" TIMESTAMP(3),

    CONSTRAINT "pk_pedido" PRIMARY KEY ("id_pedido")
);

-- CreateTable
CREATE TABLE "notificacao" (
    "id" TEXT NOT NULL,
    "id_externo" UUID NOT NULL,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,

    CONSTRAINT "notificacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ui_pedido_001" ON "pedido"("id_externo");

-- AddForeignKey
ALTER TABLE "pedido" ADD CONSTRAINT "pedido_id_prato_fkey" FOREIGN KEY ("id_prato") REFERENCES "prato"("id_prato") ON DELETE RESTRICT ON UPDATE CASCADE;
