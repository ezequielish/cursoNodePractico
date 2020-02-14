## Separando microservicio
En este microservicio vamos colocar una estructura horizontal y lo vamos aislar  la estructura vectical que es la principal de nuestra api.

Al decir que es horizontal nos referimos a que no esta en el mismo proceso que el backend del api, por lo cual puede funcionar como un serverless sin base de datos.

En el archivo index-post no lleva el nombre index.js porque al arrancar pm2 generar un error por los nombres.

En este caso se va a guardar en un solo proyecto pero este directorio pudiera esta en otro server con sus propias variables de entorno.
