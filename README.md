# clean-architecture

## INSTALACIONES

```
 npm i -D typescript @types/node ts-node-dev rimraf // instalar typescript
 npx tsc --init --outDir dist/ --rootDir src // configuracion de typescript
```

## SCRIPTS PACKAGE.JSON

```
"dev": "tsnd --respawn --clear src/app.ts",
"build": "rimraf ./dist && tsc",
"start": "npm run build && node dist/app.js"
```