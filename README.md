# 🧾 DGII Prueba - Frontend

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Vite](https://img.shields.io/badge/Vite-Build%20Tool-purple)
![Tailwind](https://img.shields.io/badge/TailwindCSS-UI-38BDF8)

Aplicación frontend desarrollada en **React + TypeScript** para interactuar con la API de gestión de **Contribuyentes y Comprobantes Fiscales**.

La aplicación permite:

* Visualizar contribuyentes registrados
* Consultar los comprobantes asociados a cada contribuyente
* Registrar nuevos contribuyentes
* Registrar nuevos comprobantes fiscales
* Ver el **total de ITBIS calculado automáticamente**

---

# 📚 Tabla de Contenidos

* Tecnologías
* Instalación
* Ejecución del proyecto
* Estructura del proyecto
* Funcionalidades
* Conexión con el backend
* Mejoras futuras

---

# 🛠 Tecnologías

El proyecto fue construido con:

| Tecnología  | Descripción                              |
| ----------- | ---------------------------------------- |
| React       | Librería para construcción de interfaces |
| TypeScript  | Tipado estático para JavaScript          |
| Vite        | Herramienta de build rápida              |
| TailwindCSS | Framework de estilos                     |
| Axios       | Cliente HTTP para consumir la API        |

---

# ⚙️ Instalación

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/prueba-dgii-frontend.git
```

---

### 2️⃣ Entrar al proyecto

```bash
cd prueba-dgii-frontend
```

---

### 3️⃣ Instalar dependencias

```bash
npm install
```

---

# ▶️ Ejecutar la aplicación

Para iniciar el proyecto en modo desarrollo:

```bash
npm run dev
```

Luego abre:

```
http://localhost:5173
```

---

# 📁 Estructura del Proyecto

```text
prueba-dgii-frontend
│
├── src
│   │
│   ├── Api
│   │   └── Api.ts
│   │
│   ├── Components
│   │   ├── Dashboard.tsx
│   │   ├── ContribuyenteModal.tsx
│   │   └── ComprobanteModal.tsx
│   │
│   ├── Types
│   │   ├── Contribuyente.ts
│   │   └── Comprobante.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

# 🚀 Funcionalidades

### 📋 Listado de Contribuyentes

* Muestra todos los contribuyentes registrados
* Permite seleccionar un contribuyente para ver sus comprobantes

---

### 🧾 Listado de Comprobantes

Al seleccionar un contribuyente se muestran:

* NCF
* Monto
* ITBIS (18%)
* Total ITBIS acumulado

---

### ➕ Crear Contribuyente

Desde el dashboard se puede abrir un **modal** para registrar un nuevo contribuyente.

Campos:

* RNC / Cédula
* Nombre
* Tipo
* Estatus

---

### ➕ Crear Comprobante

También se puede crear un nuevo comprobante fiscal.

Reglas:

* Se debe seleccionar primero el **contribuyente**
* El **NCF no puede repetirse**
* El **ITBIS se calcula automáticamente en el backend**

---

# 🔗 Conexión con el Backend

El frontend consume la API mediante **Axios**.

Archivo:

```
src/Api/Api.ts
```

Ejemplo de configuración:

```ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:5001/api"
});

export default api;
```

Endpoints consumidos:

* `GET /contribuyentes`
* `GET /contribuyentes/{rnc}/comprobantes`
* `POST /contribuyentes`
* `POST /comprobantes`

---

# 🎨 Interfaz

La interfaz utiliza **TailwindCSS** para estilos y está organizada en **cards y tablas** para facilitar la visualización de datos.

Componentes principales:

* Dashboard
* Tabla de comprobantes
* Modal de creación de contribuyentes
* Modal de creación de comprobantes

---



