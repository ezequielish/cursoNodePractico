# proyecto-backend-node
Proyecto del curso avanzado de backend con NodeJS 

directorios:

**network**:

Es el directorio donde vamos a mostrar respuesta predeterminadas para todas nuestras rutas

**api**:

En este dirextorio vamos a guardar todos nuestras rutas.

**store**

Va a manejar la conexión a la base de datos



**pm2**

Este es un gestor de procesos que nos permitira tener un mejor control sobre nuestros microservicos.

- instalar

```
npm i -g pm2

```

- correr un proceso

```
pm2 start ./[path index file]

```

- ver logs

```
pm2 logs

```

Cada proceso tiene un index o key si queremos ver el log de uno colocamos:

```
pm2 logs [key]

```

- status de los procesos:

```
pm2 status

```

**remote.js**



Este archivo crear un proxy de la base de datos que podremos usar en nuestro servidor público, con esto, el micro servicio público no se comunica directamente con nuestra base de datos.

Básicamente lo que estamos haciendo es crear un proceso en un puerto distinto al del raíz y lo estamos arrancando en otro puerto, esto prodia funcionar también como serverless y su funcion es conectar a cualquier base de datos facilmente usando nombre de la tablas.

Las peticiones las reicbe el archivo network que pertenezca a este componente llamando *mysql* en este proyecto. 

¿Qué quiere decir esto?

Podemos crear distinto motores de base de datos y funcionaria en todos.

En este ejemplo vamos abrir un microservicio de la base de datos en un directorio llamado mysql, aquí se manejara en el puerto 4001, lo que quiere decir que cada petición que se haga no sera necesariamente en la misma estructura de la api principal si no que podemos tener la logica de esa base de datas separada.



## Base de datos en memoria Redis

Una base de datos en memoria es muy util a la hora de acceder a la información en vez de acceder directamente a la base de datos accedemos a la caché.

Para comenzar intalamos una dependencia de redis

```
mpm i -S redis

```


Redis funciona como una bd **clave**: **valor**

Cuando de guarda en la base de datos se pasa los objetos a string.

Cuando la leamos pasamos el string a objeto.
