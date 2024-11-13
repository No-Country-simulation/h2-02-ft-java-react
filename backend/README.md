# Backend

## 👩🏻‍💻 Tecnologías Principales
- [Java 21](https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html)
- [Spring Boot](https://spring.io/projects/spring-boot)
- [Spring Modulith](https://spring.io/projects/spring-modulith)
- [Spring Security](https://spring.io/projects/spring-security)
- [JWT](https://jwt.io/)
- [Api_Football](https://api-football.com/)

1. **Clona este repositorio**.
   - Clona el proyecto utilizando el siguiente comando:
     ```bash
     git clone (https://github.com/No-Country-simulation/h2-02-ft-java-react.git)
     ```

2. **Configura las variables de entorno** en un archivo `.env`.
   - Crea un archivo llamado `.env` en la raíz del proyecto y agrega las siguientes variables.

### **Conexión a la Base de Datos (DB)**

Estas variables son necesarias para conectar la aplicación a la base de datos MySQL:

- **`DB_HOST`**: Dirección IP o nombre de host del servidor de base de datos. Si trabajas localmente, usa `127.0.0.1` o `localhost`.
- **`DB_PORT`**: El puerto en el que la base de datos está escuchando. El valor predeterminado de MySQL es `3306`.
- **`DB_NAME`**: Nombre de la base de datos a utilizar por la aplicación. Asegúrate de crear la base de datos antes de iniciar la aplicación.
- **`DB_USERNAME`**: Nombre de usuario para la conexión a la base de datos. Generalmente es `root` en entornos de desarrollo locales.
- **`DB_PASSWORD`**: Contraseña del usuario de la base de datos. Debes establecer una contraseña segura.

### **Claves de Seguridad (JWT)**

Estas configuraciones son para manejar la autenticación mediante JWT (JSON Web Tokens):

- **`SECRET_KEY`**: Clave secreta utilizada para firmar y verificar los JWT. Debes generar una clave secreta única y mantenerla segura. No debe ser compartida públicamente.

### **Configuración de CORS (Cross-Origin Resource Sharing)**

El CORS es necesario para permitir que tu API acepte solicitudes desde diferentes dominios:

- **`CORS`**: URL del frontend que puede hacer solicitudes a tu API. En producción, usa la URL de tu aplicación frontend desplegada.
- **`CORS_LOCAL`**: URL de tu entorno de desarrollo local, típicamente `http://localhost:5173` cuando trabajas con herramientas como Vite.

### **Token de API**

- **`API_TOKEN`**: Este token es utilizado para autenticar solicitudes entre el backend y otros servicios, como el frontend o APIs externas. Asegúrate de generar un token adecuado y mantenerlo en secreto.

3. **Inicia el servidor de desarrollo**:
   Una vez configuradas las variables en el archivo `.env`, puedes iniciar el servidor de desarrollo con el siguiente comando:
   ```bash
   mvn spring-boot:run

## 💾 **Dependencias**

Este proyecto utiliza las siguientes dependencias de Spring Boot y otras bibliotecas relacionadas:

- **`spring-boot-starter-web`**: Para construir aplicaciones web y RESTful APIs.
- **`spring-boot-starter-security`**: Para integrar Spring Security y manejar autenticación y autorización.
- **`spring-boot-starter-actuator`**: Para monitoreo, métricas y puntos finales de salud de la aplicación.
- **`spring-boot-starter-data-jpa`**: Para integrar JPA y acceder a bases de datos de manera sencilla.
- **`spring-boot-starter-test`**: Para pruebas unitarias y de integración.
- **`spring-doc-openapi-starter-webmvc-ui`**: Para generar la documentación automática de la API usando OpenAPI.
- **`jjwt-api`, `jjwt-jackson`, `jjwt-impl`**: Para manejo de JWT (tokens de autenticación).
- **`spring-modulith`**: Para estructurar la aplicación en módulos, crear documentacion de las dependencias entre modulos y testearla modularidad (ArchUnit).
- **`lombok`**: Para reducir la cantidad de código repetitivo.
- **`mysql-connector-j`**: Para conectar con bases de datos MySQL.
- **`spring-dotenv`**: Para cargar configuraciones desde archivos `.env`.


## 📐 **Arquitectura y Enfoque de Desarrollo**

Este proyecto adopta **Domain-Driven Design (DDD)** como enfoque principal para el desarrollo de software. DDD nos ayuda a gestionar la complejidad de los sistemas a través de un modelado preciso del dominio, promoviendo una arquitectura que refleja el negocio y sus reglas.

### **Domain-Driven Design (DDD)**

DDD es un enfoque para diseñar software que pone el dominio de negocio en el centro de la conversación, ayudando a los equipos a construir aplicaciones que sean representaciones más cercanas de los procesos de negocio reales. Los principios clave de DDD que seguimos son:

- **Modelado del dominio**: Se crea un modelo que representa fielmente las reglas y entidades del negocio, y se comunica de forma clara entre los diferentes equipos.
- **Lenguaje Ubicuo (Ubiquitous Language)**: Todos los miembros del equipo (desarrolladores, diseñadores, stakeholders) usan el mismo lenguaje, que está reflejado en el código, las pruebas y la documentación.
- **Bounded Contexts**: Dividimos el sistema en contextos limitados donde un modelo particular tiene sentido. Esto permite manejar distintas representaciones de un mismo concepto en diferentes partes del sistema sin confusión.
- **Agregados**: Los agregados son entidades del modelo que aseguran la consistencia de los datos y encapsulan las reglas de negocio.
- **Eventos de Dominio**: Son eventos que representan cambios significativos en el dominio y pueden ser utilizados para desencadenar otros procesos o interacciones dentro del sistema.

### **Spring Modulith**

Combinamos DDD con **Spring Modulith**, que es un conjunto de herramientas para construir aplicaciones modulares usando Spring Framework. Spring Modulith nos permite dividir el sistema en módulos que corresponden a los Bounded Contexts definidos por DDD. Esto facilita la construcción de aplicaciones más flexibles y escalables, al mismo tiempo que mantiene la coherencia del dominio en cada módulo.

Características clave de **Spring Modulith**:

- **Modularidad**: Cada módulo tiene su propio modelo de dominio, asegurando que las reglas de negocio y las entidades sean locales al módulo, lo que mejora la mantenibilidad.
- **Desacoplamiento**: Los módulos se comunican entre sí mediante eventos, lo que permite mantener el sistema flexible y reducible a cambios sin afectar el resto del sistema.
- **Integración fácil con eventos**: Spring Modulith se integra de manera nativa con eventos asincrónicos, lo que facilita la propagación de cambios y la comunicación entre módulos.

### **Eventos Asincrónicos**

La arquitectura también hace un uso extensivo de **eventos asincrónicos** para facilitar la comunicación entre diferentes módulos del sistema sin bloquear procesos. Los eventos son utilizados para:

- **Desacoplar los componentes del sistema**: Los módulos pueden enviar eventos que son escuchados por otros módulos interesados en esos cambios, sin necesidad de depender directamente de ellos.
- **Mejorar la escalabilidad**: Los eventos asincrónicos permiten procesar tareas de manera no bloqueante, lo que mejora la capacidad del sistema para manejar cargas altas y solicitudes simultáneas.
- **Evitar la acoplamiento fuerte**: Al utilizar eventos, los módulos pueden evolucionar de manera independiente sin que el cambio en uno de ellos afecte directamente a los demás.

En resumen, combinamos **DDD**, **Spring Modulith** y **eventos asincrónicos** para crear una arquitectura escalable, flexible y alineada con el negocio, donde el dominio es el corazón del sistema y las interacciones entre módulos se gestionan de manera eficiente y desacoplada.
