<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar el comando

```
yarn install
```

3. Tener NestJs intalado ó ejecutar:

```
npm i -g @nestjs/cli
```

4. Levantar la base de Datos.

```
docker-compose up -d
```

5. Reconstuir la base de Datos.

```
hacer get a este endpont /api/v2/seed
```

# Build de Producción 

1. Crear el archivo ```.env.prod```
2. llenar las variables de entorno de producción ```MONGODB Y PORT```
3. Crear la nueva imágen: ``` docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build ```


## Stack usado

- MongoDb
- Nestjs
