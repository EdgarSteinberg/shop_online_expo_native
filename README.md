## 🍽️ BodegónApp!

**BodegónApp!** es una aplicación de restaurante online desarrollada con React Native y Expo, pensada para brindar una experiencia intuitiva y completa al usuario desde cualquier dispositivo (web, iOS o Android).

#### 🎯 Objetivo

Ofrecer a los usuarios la posibilidad de:

- Registrarse e iniciar sesión de forma segura.
- Visualizar distintos productos gastronómicos con nombre, imagen y precio.
- Navegar por categorías de productos desde una vista principal.
- Acceder a una vista detallada del producto con un contador para seleccionar cantidades y un botón para agregar al carrito.
- Visualizar el carrito con todos los productos seleccionados y el total de la compra.
- Acceder a una **vista de usuario** que permite activar la cámara del dispositivo y tomar una foto.
- Acceder a una sección de **órdenes**, donde se imprime un ticket con los detalles completos de la compra.

#### 🛠️ Problemas solucionados

- ✅ Persistencia y correcto funcionamiento de la imagen tomada desde la cámara.
- ✅ Resolución del error con el emulador de Android, que se rompía al no actualizar el dispositivo con los últimos cambios.


## 🚀 Instalación y Puesta en Marcha del Proyecto

Para correr **BodegonApp** localmente, es necesario tener instaladas las siguientes herramientas:

## 🧰 Requisitos previos

- [Node.js](https://nodejs.org/) (versión recomendada: 18+)
- [Git](https://git-scm.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Un emulador Android (como Android Studio) o la app **Expo Go** en un dispositivo físico

#### ▶️ Instalación de dependencias
- `npx install`

#### ▶️ Ejecutar la app en desarrollo
- `npx expo start`
---


## 💻 Configuración de la Aplicación

## 🌐 React Native for Web

🔗 Documentación oficial: https://necolas.github.io/react-native-web/  
📌 React Native Web permite usar componentes de React Native (`View`, `Text`, `StyleSheet`, etc.) directamente en el navegador.  
🚀 Ideal para escribir una sola base de código y correrla en web, iOS y Android.

## 📚 Documentación oficial de Expo

🔗 https://docs.expo.dev  
🔍 Referencia principal para todo lo relacionado con Expo: configuración, APIs, componentes nativos, despliegue, y más.

## 🛠 Instalación del proyecto con Expo

`npx create-expo-app@latest --template blank`  
📌 Este comando inicializa un nuevo proyecto de React Native usando Expo con una plantilla en blanco.  
✅ Ideal para empezar rápido sin configuraciones complicadas de Android/iOS nativas.  
🧠 Nota: Si no tenés `npx`, asegurate de tener Node.js instalado (v14 en adelante).

## 🚀 Iniciar el proyecto con Expo

`npx expo start`

## ⚛️ Crear componentes en React Native al instante con rnfes

⚡ ¿Cómo activarlo? Instalá la extensión 👉 ES7+ React/Redux/React-Native snippets

## ⚙️ Atajo útil

`Ctrl + M` para el menú de desarrollo en React Native

## 🧩 Agregar Fuentes Personalizadas con Expo Fonts

📚 Doc oficial: https://docs.expo.dev/develop/user-interface/fonts/##with-usefonts-hook  
✅ Instalación: `npx expo install expo-font expo-splash-screen`  
- `expo-font`: permite cargar fuentes personalizadas.  
- `expo-splash-screen`: evita que se muestre la app antes de que las fuentes estén cargadas.

## 🌐 Subir imágenes para documentación o mockups

Podés usar 👉 https://postimages.org para subir y compartir imágenes fácilmente.  
📄 Markdown sitio oficial: https://docs.github.com/es/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax

## 🔣 Agregar Iconos con react-native-vector-icons

📦 Sitio oficial: https://oblador.github.io/react-native-vector-icons/  
✅ Instalación: `npm i react-native-vector-icons`

## 🧭 React Navigation

🔗 Sitio oficial: https://reactnavigation.org/  
✅ Instalar: `npm install @react-navigation/native`  
✅ Dependencias requeridas por Expo: `npx expo install react-native-screens react-native-safe-area-context`  
✅ Instalar stack navigator: `npm install @react-navigation/native-stack`  
✅ Instalar pestañas inferiores: `npm install @react-navigation/bottom-tabs`

## 🧠 Instalación de Redux Toolkit

🔗 Sitio oficial: https://redux-toolkit.js.org/  
✅ Instalar Redux Toolkit: `npm install @reduxjs/toolkit`  
✅ Instalar React Redux: `npm install react-redux`

## 🔥 Firebase y Autenticación con Email/Password

🔗 Firebase: https://firebase.google.com/  
🔗 Doc de autenticación (REST): https://firebase.google.com/docs/reference/rest/auth  
✉️ Registro: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]`  
✉️ Login: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]`

## 📷 Acceder a galería y cámara con Expo Image Picker

📚 Doc oficial: https://docs.expo.dev/versions/latest/sdk/imagepicker/  
✅ Instalación: `npx expo install expo-image-picker`

## 💾 Persistencia con Expo SQLite

📚 Doc oficial: https://docs.expo.dev/versions/latest/sdk/sqlite/  
✅ Instalación: `npx expo install expo-sqlite`

## 📐 useWindowDimensions en React Native

`import { useWindowDimensions } from 'react-native';`  
`const { width, height } = useWindowDimensions();`  
🧠 Si usás Expo y querés permitir orientación horizontal, quitá o comentá esta línea del `app.json`: `"orientation": "portrait",`
