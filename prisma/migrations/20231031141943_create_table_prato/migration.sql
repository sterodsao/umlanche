-- CreateTable
CREATE TABLE "prato" (
    "pk_prato" UUID NOT NULL,
    "ds_nome" VARCHAR(100) NOT NULL,
    "ds_descricao" VARCHAR(200) NOT NULL,
    "vl_preco" DECIMAL(15,6) NOT NULL,
    "fg_ativo" BOOLEAN NOT NULL DEFAULT true,
    "incluido_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,

    CONSTRAINT "prato_pkey" PRIMARY KEY ("pk_prato")
);
