# Handball Unicen - Sitio Web

Sitio web moderno y responsive para el club de handball Handball Unicen, desarrollado con React, Tailwind CSS y Firebase.

## 🚀 Características

- **Diseño Moderno**: Interfaz atractiva y responsive optimizada para adolescentes de 13 a 17 años
- **Paleta UNICEN**: Colores y tipografía alineados con el Manual de Identidad Visual de Deportes UNICEN
- **Navegación Intuitiva**: Menú hamburguesa para mobile y navegación clara
- **Panel Administrativo**: Gestión completa de noticias con autenticación segura
- **Integración Firebase**: Firestore, Auth, Storage y Hosting

## 📦 Tecnologías Utilizadas

- **Frontend**: React 18, Vite
- **Estilos**: Tailwind CSS
- **Backend**: Firebase (Firestore, Auth, Storage, Hosting)
- **Iconos**: Lucide React
- **Routing**: React Router DOM

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Navbar.jsx      # Navegación principal
│   └── PrivateRoute.jsx # Protección de rutas
├── contexts/           # Contextos de React
│   └── AuthContext.jsx # Contexto de autenticación
├── pages/              # Páginas de la aplicación
│   ├── Home.jsx        # Página de inicio
│   ├── QuienesSomos.jsx # Quiénes somos
│   ├── QueHacemos.jsx  # Qué hacemos
│   ├── Sponsors.jsx    # Sponsors
│   ├── Noticias.jsx    # Noticias y partidos
│   ├── AdminLogin.jsx  # Login de administrador
│   ├── AdminDashboard.jsx # Dashboard administrativo
│   ├── NuevaNoticia.jsx # Crear noticia
│   └── EditarNoticia.jsx # Editar noticia
├── firebase/           # Configuración de Firebase
│   └── config.js       # Configuración de servicios
├── App.jsx             # Componente principal
└── index.css           # Estilos globales
```

## 🎨 Paleta de Colores UNICEN

```javascript
// Colores definidos en tailwind.config.js
azulUnicen: '#00639b'
verdeUnicen: '#338580'
limaUnicen: '#98c124'
celesteUnicen: '#0ab7e1'
rojoUnicen: '#e32328'
violetaUnicen: '#5f2262'
amarilloUnicen: '#f9b733'
azulOscuroUnicen: '#0d426f'
```

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd handballUnicen
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar Firebase

1. Crear un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilitar los siguientes servicios:
   - Authentication (Email/Password)
   - Firestore Database
   - Storage
   - Hosting

3. Obtener la configuración del proyecto y actualizar `src/firebase/config.js`:
```javascript
const firebaseConfig = {
  apiKey: "tu-api-key",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "tu-messaging-sender-id",
  appId: "tu-app-id"
};
```

### 4. Configurar Firestore

Crear la colección `noticias` con la siguiente estructura:
```javascript
{
  titulo: "string",
  resumen: "string",
  rival: "string (opcional)",
  resultado: "string (opcional)",
  categoria: "string (opcional)",
  fecha: "timestamp",
  imagenUrl: "string (opcional)",
  createdAt: "timestamp",
  updatedAt: "timestamp"
}
```

### 5. Configurar Authentication

1. En Firebase Console, ir a Authentication > Users
2. Agregar un usuario administrador con email y contraseña
3. Este usuario tendrá acceso al panel administrativo

### 6. Configurar Storage

1. En Firebase Console, ir a Storage
2. Crear las reglas de seguridad para permitir subida de imágenes:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /noticias/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 7. Ejecutar en desarrollo
```bash
npm run dev
```

## 📱 Páginas del Sitio

### Páginas Públicas
- **Inicio** (`/`): Banner principal, logo, resumen y accesos rápidos
- **Quiénes Somos** (`/quienes-somos`): Historia, valores, entrenadores y galería
- **Qué Hacemos** (`/que-hacemos`): Actividades, categorías, entrenamientos y torneos
- **Sponsors** (`/sponsors`): Grilla de instituciones que apoyan el club
- **Noticias** (`/noticias`): Lista de partidos y novedades del equipo

### Panel Administrativo
- **Login** (`/admin`): Autenticación de administradores
- **Dashboard** (`/admin/dashboard`): Panel principal con estadísticas
- **Nueva Noticia** (`/admin/nueva-noticia`): Formulario para crear noticias
- **Editar Noticia** (`/admin/editar-noticia/:id`): Editar o eliminar noticias

## 🔧 Funcionalidades del Panel Admin

- **Gestión de Noticias**: Crear, editar y eliminar noticias
- **Subida de Imágenes**: Integración con Firebase Storage
- **Autenticación Segura**: Solo usuarios autorizados pueden acceder
- **Dashboard con Estadísticas**: Vista general del contenido

## 🚀 Despliegue en Firebase Hosting

### 1. Instalar Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Iniciar sesión en Firebase
```bash
firebase login
```

### 3. Inicializar Firebase en el proyecto
```bash
firebase init hosting
```

### 4. Construir el proyecto
```bash
npm run build
```

### 5. Desplegar
```bash
firebase deploy
```

## 📋 Reglas de Firestore

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /noticias/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 🎯 Características de UX/UI

- **Responsive Design**: Optimizado para móviles, tablets y desktop
- **Navegación Intuitiva**: Menú hamburguesa en mobile
- **Feedback Visual**: Efectos hover y transiciones suaves
- **Accesibilidad**: Contraste adecuado y navegación por teclado
- **Carga Optimizada**: Lazy loading y estados de carga

## 🔒 Seguridad

- Autenticación requerida para panel administrativo
- Validación de formularios en frontend y backend
- Reglas de seguridad en Firestore y Storage
- Protección de rutas privadas

## 📞 Soporte

Para soporte técnico o consultas sobre el proyecto, contactar al equipo de desarrollo.

## 📄 Licencia

Este proyecto está desarrollado para Handball Unicen y la Universidad Nacional del Centro.
