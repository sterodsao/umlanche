Instalar dependencias
```sh
npm i eslint @rocketseat/eslint-config -D
```

Criar arquivo eslintrc
```json
{
  "extends": "@rocketseat/eslint-config/node",
  "rules": {
    "no-useless-constructor": "off"
  }
}
```

Criar arquivo eslintignore
```
node_modules
dist
```

Criar arquivo docker
```yml
version: '3.8'

services:
  postgres:
    container_name: nest-postgres
    image: postgres
    ports:
      - 5432:5432
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=docker
      - POSTGRES_DB=nest
      - PGDATA=/data/postgres
    volumes:
      - ./data/pg:/data/postgres
```

Instalação e init do prisma
```sh
npm i -D prisma
npm i @prisma/client
npx prisma init
...
npx prisma migrate dev
```

Configuração do VITEST
```sh
npm i -D vitest unplugin-swc @swc/core @vitest/coverage-v8 vite-tsconfig-paths
```

