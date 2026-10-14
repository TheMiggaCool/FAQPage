# FAQ de Salud Sexual y Reproductiva

Sitio web informativo de preguntas frecuentes (FAQ) sobre salud sexual y reproductiva. El proyecto busca ofrecer información clara, breve y accesible sobre infecciones de transmisión sexual (ITS), métodos anticonceptivos, prevención y otros temas relacionados.

## Objetivo

Facilitar el acceso a información educativa y confiable para que las personas puedan resolver dudas frecuentes sobre salud sexual y reproductiva. El contenido tiene fines informativos y no reemplaza la consulta con profesionales de la salud.

## Temáticas principales

- **Infecciones de transmisión sexual (ITS):** conceptos generales, prevención, síntomas y orientación sobre cuándo consultar.
- **Métodos anticonceptivos:** tipos, eficacia, uso y posibles efectos secundarios.
- **Prevención y cuidado:** uso del preservativo, doble protección y reducción de riesgos.
- **Anticoncepción de emergencia:** información general sobre su uso y plazos.
- **Preguntas frecuentes:** respuestas breves y organizadas para facilitar la consulta.

> **Aviso de salud:** el sitio brinda información educativa y no constituye un diagnóstico ni sustituye la evaluación de un profesional de la salud. Ante síntomas, exposición de riesgo o dudas sobre un tratamiento, se recomienda acudir a un servicio sanitario.

## Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| **Java** | Lenguaje de programación del backend. |
| **Spring Boot** | Desarrollo de la aplicación backend y sus servicios/API. |
| **React** | Construcción de la interfaz de usuario y los componentes interactivos. |
| **HTML** | Estructura semántica del contenido web. |
| **CSS** | Estilos, diseño visual y adaptación a distintos tamaños de pantalla. |
| **Render** | Alojamiento y despliegue del sitio web y/o de los servicios de la aplicación, según la configuración del proyecto. |

## Arquitectura general

El proyecto separa la interfaz de usuario de la lógica del servidor:

- **Frontend:** React, HTML y CSS para presentar las preguntas y respuestas de forma clara y adaptable.
- **Backend:** Java y Spring Boot para gestionar la lógica de la aplicación y, si corresponde, exponer endpoints para el contenido.
- **Despliegue:** Render para publicar la aplicación en línea.

La comunicación exacta entre frontend y backend depende de la configuración del proyecto.

## Ejecución local

Los pasos concretos pueden variar según la estructura del repositorio. Como guía general:

### Backend (Spring Boot)

1. Instalar una versión de Java compatible con la configuración del proyecto.
2. Abrir la carpeta del backend.
3. Ejecutar la aplicación con el wrapper de Maven, si está disponible:

   **Windows**
   ```bash
   .\mvnw.cmd spring-boot:run
   ```

   **Linux/macOS**
   ```bash
   ./mvnw spring-boot:run
   ```

### Frontend (React)

1. Instalar Node.js y npm.
2. Abrir la carpeta del frontend.
3. Instalar las dependencias y ejecutar el servidor de desarrollo:

   ```bash
   npm install
   npm run dev
   ```

   Si el proyecto utiliza Create React App u otra herramienta, el comando de inicio puede ser diferente; revisá los scripts definidos en `package.json`.

## Despliegue en Render

El proyecto utiliza Render para alojar el sitio web. La configuración del despliegue debe coincidir con la estructura del repositorio:

- Configurar el servicio correspondiente para el frontend y/o backend.
- Definir el comando de compilación y el comando de inicio adecuados.
- Configurar las variables de entorno necesarias desde el panel de Render.
- Verificar que las URL del frontend y del backend, si están desplegados por separado, sean correctas.
- Probar las rutas principales después del despliegue.

No se deben guardar claves, contraseñas ni otros secretos directamente en el repositorio; deben configurarse como variables de entorno.

## Posibles mejoras futuras

- Añadir buscador y filtros por temática.
- Incorporar fuentes sanitarias oficiales y fecha de revisión de cada contenido.
- Mejorar la accesibilidad y la experiencia en dispositivos móviles.
- Añadir pruebas automatizadas para el backend y el frontend.
- Implementar un proceso periódico de revisión y actualización de la información sanitaria.

## Contribuciones

Las mejoras, correcciones y sugerencias son bienvenidas. Antes de proponer cambios en contenido sanitario, se recomienda verificar la información con fuentes oficiales y profesionales cualificados.

## Licencia

No se ha especificado una licencia en este README. Si el proyecto se publica para reutilización, se recomienda añadir un archivo `LICENSE` con la licencia elegida.
