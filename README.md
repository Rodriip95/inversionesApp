# 📱 App de inversiones 🥥

En esta aplicación se podrán ver instrumentos financieros, un balance de un portafolios y una simulación de compra/venta de activos.
---

## 🚀 Instalación y Configuración

1) Clonar repositorio
```sh
git clone https://github.com/Rodriip95/inversionesApp.git
cd inversionesApp
```

2) Instalar dependencias
Si usas **Yarn**:
```sh
yarn install
```
Si usas **npm** (todas las dependencias fueron instaladas con esta herramienta):
```sh
npm install
```

3) Levantar la aplicación en modo desarrollo
Ejecuta el siguiente comando:
```sh
npm run start
```
Luego escanea el código QR con **Expo Go** en tu teléfono o en un emulador de Android correr el comando `npm run android`.

---

## 📦 Tecnologías utilizadas
- **React Native** con **Expo**
- **TypeScript**
- **React Navigation** para la navegación
- **Redux Toolkit** para manejo de estado
- **Axios** para llamadas a la API

---

## 🛠 Detalles del desarrollo
Se tomo la decisión de una app minimalista con la información clara para cualquier usuario, utilizando una arquitectura basada en el `ModelViewController`.
Se busco una comunicación fluida entre la Home y la sección del Portfolio y las ordenes enviadas. La pantalla de Portfolio tiene una pequeña animación donde se uso `react-native-reanimated` un detalle al entrar a la pantalla que es sutil pero vistoso.
También se agrego una fuente usando `expo-font` y se cambiaron los iconos y el splash screen a modo de detalles.
Hay componentes donde se trabajo la lógica para que tener errores, por ejemplo de compra contempla el balance del portfolio para las compras de instrumentos así como el de venta dentro del portfolio.

--- 

## 👋 Espero que les guste!!




