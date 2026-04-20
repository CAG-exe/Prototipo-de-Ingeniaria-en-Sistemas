# 🎨 Sistema de Gestión de Talleres Culturales

Este proyecto es un **Prototipo para la Gestión e Inscripción de Talleres Culturales**, desarrollado con **Angular**. Diseñado para facilitar la administración de actividades culturales y la inscripción de usuarios en un entorno moderno y eficiente.

---

## ✨ Características Principales
- **Gestión de Talleres**: Panel para visualizar y administrar talleres.
- **Formulario de Inscripción**: Sistema intuitivo para el registro de nuevos talleres con soporte para imágenes.
- **Búsqueda Avanzada**: Filtros dinámicos por rubro y localidad.
- **Persistencia Local**: Sistema que guarda los datos directamente en archivos del proyecto para facilitar el desarrollo sin bases de datos complejas.

---

## 🛠️ Tecnologías Utilizadas
- **Frontend**: [Angular 21](https://angular.io/) (TypeScript)
- **Estilos**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Gestor de Paquetes**: npm

---

## 🚀 Requisitos Previos
Asegúrate de tener instalado:
- **Node.js** (versión 18 o superior recomendada)
- **npm** (integrado con Node.js)

---

## 💻 Instalación y Ejecución

Sigue estos pasos para levantar el proyecto localmente:

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd Prototipo-de-Ingeniaria-en-Sistemas
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Levantar el proyecto
Inicia la interfaz de usuario en modo desarrollo:
```bash
npm run start
```
*La aplicación se abrirá automáticamente en [http://localhost:4200](http://localhost:4200).*

---

## 📂 Estructura de Persistencia
El sistema utiliza una arquitectura simplificada para el prototipado:

- **Almacenamiento**: Los datos se gestionan de forma local en el navegador (in-memory) a través de servicios de Angular.
- **Manejo de Imágenes**: Las imágenes se procesan y almacenan como cadenas **Base64** dentro de los mismos objetos de datos, eliminando la necesidad de un servidor de archivos externo.
- **Datos Iniciales**: El archivo `src/app/Data/workshops.ts` sirve como base de datos inicial para el prototipo.

---

## 📝 Notas de Uso Importantes
1. **Persistencia**: Actualmente el sistema utiliza almacenamiento local para el prototipado (in-memory). Los cambios se mantienen durante la sesión actual del navegador.

---

© 2026 - Proyecto de Ingeniería en Sistemas
