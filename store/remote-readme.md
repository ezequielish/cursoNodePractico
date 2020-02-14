**remote.js**



Este archivo crear un proxy de la base de datos que podremos usar en nuestro servidor público, con esto, el micro servicio público no se comunica directamente con nuestra base de datos.

Básicamente lo que estamos haciendo es crear un proceso en un puerto distinto al del raíz y lo estamos arrancando en otro puerto, esto prodia funcionar también como serverless.

Las peticiones las reicbe el archivo network que pertenezca a este componente llamando *mysql* en este proyecto. 

¿Qué quiere decir esto?

Que cada vez que el api haga una petición no la va hacer directamente a la base de datos, si no que hará una petición al microservicio de la base de datos y este microservicio le responde con un resultado ya listo.

En este ejemplo vamos abrir un microservicio de la base de datos en un directorio llamado mysql, aquí se manejara en el puerto 4001, lo que quiere decir que cada petición que se haga no sera necesariamente en la misma estructura de la api principal si no que podemos tener la logica de esa base de datas separada.



