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