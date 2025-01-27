-- Altere a migration gerada para adicionar a coluna 'userId' como nullable
ALTER TABLE "Product" ADD COLUMN "userId" UUID;

-- Atualizar a tabela para permitir valores nulos na coluna userId
ALTER TABLE "Product" ALTER COLUMN "userId" SET DEFAULT NULL;
