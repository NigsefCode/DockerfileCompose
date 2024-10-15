# Evaluación 3: Microservicios Docker Compose

- Integrante: Nicolás Sepúlveda Falcón
  
- Curso: Administración de Sistemas



## Introducción
Este proyecto tiene como objetivo implementar y configurar un entorno de microservicios utilizando Docker, que incluye una aplicación web, una base de datos PostgresSQL, Redis para caché, Nginx como proxy inverso y un servicio de autenticación.


## Instrucciones de Instalación y Ejecución
### Requisitos Previos
Antes de comenzar con la ejecución del proyecto, asegurarse de tener lo siguiente instalado en su equipo de trabajo:
1. **Docker**
2. **Docker Compose**

En caso de no posee Docker, puede instalarlo de la siguiente manera según el tutorial de [Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04-es). Cabe mencionar que el objetivo de este proyecto no es esta instalación.

### Configuración y Ejecución
Una vez corroborada la instalación de `Docker` y `Docker Compose`, puede seguir los siguientes pasos:

1. **Actualizar el Sistema Operativo.**
    ```bash
      sudo apt update
      sudo apt upgrade
    ```
2. **Clonar el Repositorio.**
    ```bash
      git clone <url-del-repositorio>
      cd <nombre-del-directorio>
    ```
3. **Configuración de Servicios.**

   Explicación y configuración de las carpetas necesarias para la ejecución. Al clonar el repositorio no es necesario modificar nada. Sin embargo, es una explicación simplificada de los archivos para su correcta ejecución:
   1. **Web (./web)**
      + **Dockerfile:** Define la imagen para la aplicación web.
      + **app.js:** Contiene la lógica principal de la aplicación.
      + **package.json:** Define las dependencias y scripts de la aplicación.
        
   2. **Servicio de Autenticación (./auth)**
      + **Dockerfile:** Define la imagen para el servicio de autenticación.
      + **auth.js:** Contiene la lógica de autenticación.
      + **package.json:** Define las dependencias del servicio.
        
   3. **Nginx (./nginx)**
      + **nginx.conf:** Configura Nginx como proxy inverso.


4. **Docker Compose.**

   El archivo `docker-compose-yml` define todos los servicios.

5. **Detener los servicios.**

   En caso de clonar el repositorio y generar las tablas de nuevo, puede utilizar el siguiente comando para detener los servicios y eliminar los volúmenes con `-v`:
    ```bash
      docker-compose down -v
    ```
6. **Construir y levantar los servicios.**
    ```bash
      docker-compose up --build
    ```
7. **Inicializar la base de datos.**

   Una vez contruido y levantado los servicios, abrir una nueva terminal y ejecutar los siguientes comandos:
    ```bash
      docker-compose exec db psql -U user -d mydatabase -c "CREATE TABLE IF NOT EXISTS estadisticas (visitas INT DEFAULT 0);"
      docker-compose exec db psql -U user -d mydatabase -c "INSERT INTO estadisticas (visitas) VALUES (0);"
    ```
### Verificación de Servicios
+ **Aplicación Web:**
  Visita `http://localhost` en tu navegador.
  
+ **Servicios de autenticación:**
  Con el siguiente comando puede verificar si esta correctamente configurado el servicio de autenticación. En caso de cambiar su base de datos (username o password), cambiar en el comando:
   ```bash
     curl -X POST -H "Content-Type: application/json" -d '{"username":"admin","password":"password"}' http://localhost/auth/login
   ```
+ **Base de datos:** 
   ```bash
     docker-compose exec db psql -U user -d mydatabase -c "SELECT * FROM estadisticas;"
   ```
+ **Redis:**
   ```bash
     docker-compose exec redis redis-cli get visitas
   ```
### Solución de Problemas Comunes

#### Error de Puerto en Uso

Si el puerto 80 esta en uso:
1. **Detener Apache**
   ```bash
     sudo systemctl stop apache2
   ```
2. **Cambiar Puerto**

   En el caso de este ejemplo, se detuvo los otros procesos que estaban utilizando el puerto. Sin embargo, si necesitas utilizar otro puerto, en `docker-compose.yml` cambiar a la siguiente línea de código:
   ```bash
     nginx:
       ports:
         - "8080:80"
   ```
### Desarrollo y Mantenimiento

#### Modificar la Aplicación

En caso de hacer algun cambio en un archivo, es importante reconstruir y reiniciar los servicios utilizando el siguiente comando:
```bash
  docker-compose down
  docker-compose up --build
```

#### Notas adicionales

+ Cabe mencionar que este ejemplo es un entorno de desarrollo. Si desea utilizar esta base para producción es importante considerar medidas de seguridad para la base de datos, clave, etc.
+ Los datos de PostgreSQL se almacenan en un volumen Docker. Si desea reiniciar desde cero (como se menciono anteriormente), puede usar `docker-compose down -v`.
+ Verificar los documentos importantes. En caso de no clonar el repositorio verificar que cada archivo este en las carpetas correspondientes para el correcto funcionamiento de este proyecto o ejemplo.


