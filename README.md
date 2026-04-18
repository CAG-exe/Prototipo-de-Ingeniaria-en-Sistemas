# Prototipo Sistema de Gestión de Talleres Culturales

Este proyecto es un prototipo para la gestión e inscripción de talleres culturales, desarrollado con **Angular** y un servidor de persistencia local en **Node.js**.

## 🚀 Requisitos Previos

Asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- [npm](https://www.npmjs.com/)

## 🛠️ Instalación

1. Clona o descarga el repositorio.
2. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```

## 💻 Ejecución del Proyecto

Para que el sistema funcione completamente (incluyendo el registro de nuevos talleres y subida de imágenes), necesitas ejecutar **dos comandos** en terminales separadas:

### 1. Servidor de Persistencia (Backend)
Este servidor se encarga de recibir las imágenes y guardar los datos en el archivo `workshops.ts`.
```bash
npm run server
```
*El servidor escuchará en `http://localhost:3000`.*

### 2. Aplicación Angular (Frontend)
Inicia la interfaz de usuario.
```bash
npm run start
```
*La aplicación estará disponible en `http://localhost:4200`.*

## 📂 Estructura de Persistencia

- **Datos**: Los talleres se guardan directamente en `src/app/Data/workshops.ts`.
- **Imágenes**: Las imágenes subidas se almacenan en la carpeta `public/images/talleres/` para que Angular las sirva automáticamente.

## 📝 Notas de Uso
- Al registrar un taller, la imagen aparecerá en la carpeta `public`. Debido a cómo funciona el servidor de desarrollo de Angular, es posible que debas refrescar el navegador una vez para que la nueva imagen sea detectada y mostrada correctamente.
- El servidor de Node.js utiliza `express`, `multer` y `cors` para gestionar la persistencia local sin necesidad de una base de datos externa.

---
© 2026 Proyecto de Ingeniería en Sistemas