# clean-architecture

## INSTALACIONES

```
 npm i -D typescript @types/node ts-node-dev rimraf // instalar typescript
 npx tsc --init --outDir dist/ --rootDir src // configuracion de typescript
```

para instalar los tipos de express, en el caso que se utilice express para el servidor

```
npm i --save-dev @types/expres
```

## SCRIPTS PACKAGE.JSON

```
"dev": "tsnd --respawn --clear src/app.ts",
"build": "rimraf ./dist && tsc",
"start": "npm run build && node dist/app.js"
```

## CLEAN ARCHITECTURE

### PRESENTATION

Es lo más externo, lo que está más cerca a los usuarios, (Express, nestjs), pueden ser frameworks
con los que se creen las API's.

Es algo que se deberia poder cambiar facilmente sin afectar las reglas del negocio

### DOMAIN

Aqui se debe tener la informació de reglas que gobiernan toda la aplicación.
Casos de uso, como se implementan adaptadores, dataSources, repositorios,, y se recomienda que todo
el código del dominio no debe tener dependencias externas.

- datasources: las reglas de negocio en las que se rigen la obtención de datos. Se pueden tener distintos data sources,
  por ejemplo apra la autenticación uno, para guardar clientes otros, etc..
- repositories: quienes se comunican con los datasources

### INFRAESTRUCTURE

Es en donde se crean las implementaciones respectivas de data spurces, repositorios, mappers.
Sirve como punto intermedio
