-- CreateTable
CREATE TABLE "prato" (
    "id_prato" UUID NOT NULL,
    "ds_nome" VARCHAR(100) NOT NULL,
    "ds_ingredientes" VARCHAR(200) NOT NULL,
    "vl_preco" INTEGER NOT NULL,
    "fg_ativo" BOOLEAN NOT NULL DEFAULT true,
    "incluido_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "alterado_em" TIMESTAMP NOT NULL,

    CONSTRAINT "pk_prato" PRIMARY KEY ("id_prato")
);
