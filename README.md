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


## Intalar nuestro proyecto en una maquina virtual

- paso 1: instalar node en la maquina virtual

```
curl -sl https://deb.nodesource.com/setup_12x -o nodesource_setup.sh

```

- paso 2: ejecutar node

```
sudo bash nodesource_setuo.sh

sudo apt-get update && sudo apt-get install -y nodejs

```

- paso 3: instalar git

```
sudo apt-get install git

```

- paso 4: instalar pm2

```
sudo npm i -g pm2

```

- paso 5: treamos nuestro proyecto desde github o en cualquier repositorio que lo tengamos

- paso 6: iniciamos todos nuestros servicios usando **pm2**


## Nginx como proxy inverso

En nuestra maquina virtual no queremos que nuestra peticiones vayan directamente al puerto 80 por eso vamos a leventar Nginx que va servir como proxy.

instalar nginx

```
sudo apt-get install nginx

```

**iniciar servicio de nginx**

```
sudo service nginx start

sudo service nginx stop //para detenerlo

```
para verificar que ya este iniciado nos dirigimos a la ip de nuestra maquina virtual

**Abrir archivo de configuracion de nginx**

```
sudo nano /etc/nginx/sites-available/default

```

Una vez que se abra la configuracion, nos ubicamos debajo de location /{}(*no obligatorio*) y colocamos la ruta de nuestra api:


location /api/user {
    proxy_pass http://localhost:3000;
}
location /api/post {
    proxy_pass http://localhost:3001;
}


y asi sucesivamente con las rutas o  microservicios que queramos redirigir

al final debemos cerrar guardar y reiniciar nginx

```
sudo service nginx restart

```