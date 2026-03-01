[English Version](#english)

# 📈 Crypto Market Analyzer – Seguimiento de Criptomonedas

<div align="center">
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white&style=flat-square" alt="Next.js" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=flat-square" alt="TypeScript" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind%20CSS-38B2AC?logo=tailwind-css&logoColor=white&style=flat-square" alt="Tailwind CSS" /></a>
  <a href="https://vercel.com/"><img src="https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel&logoColor=white&style=flat-square" alt="Vercel" /></a>
  <a href="https://crypto-market-sepia.vercel.app/"><img src="https://img.shields.io/badge/Live%20Demo-brightgreen?logo=vercel&logoColor=white&style=flat-square" alt="Live demo" /></a>
</div>

---

**Crypto Market Analyzer** es una aplicación web moderna para seguir y analizar precios de criptomonedas en tiempo real usando la API pública de Binance.

- 🔗 **Demo en vivo** → [Crypto Market](https://crypto-market-sepia.vercel.app/)


El proyecto fue inicializado con [Next.js](https://nextjs.org) mediante `create-next-app` y utiliza el router de la carpeta `app`.

---

## ✨ Características principales

- Gestión de temas (claro / oscuro) con `next-themes`
- Barra de búsqueda en el encabezado para filtrar criptomonedas
- Sidebar con lista de monedas, estado móvil con overlay y marcado de favoritos
- Panel principal con detalles de la criptomoneda seleccionada
- Gráfico de precios históricos (90 días) usando **Recharts**
- Simulador interactivo de compra/venta con historial en `localStorage`
- Manejo de estados: carga, error, sin resultados
- Animaciones con **Framer Motion**
- Pruebas unitarias con **Jest + React Testing Library**

---

## 🛠️ Stack Tecnológico

| Categoría          | Tecnología / Herramienta                          | Notas                                      |
|--------------------|---------------------------------------------------|--------------------------------------------|
| Framework          | Next.js (App Router)                              | SSR/SSG, rutas integradas                   |
| Lenguaje           | TypeScript (modo estricto)                        | Tipado fuerte en todo el proyecto          |
| Estilos            | Tailwind CSS                                      | Utility‑first + dark mode                   |
| Estado             | TanStack Query + React Context                    | Caché y gestión de datos                    |
| Gráficos           | Recharts                                          | Visualización de series temporales         |
| Animaciones        | Framer Motion                                     | Transiciones suaves                         |
| Temas              | next-themes                                       | Sincronización light/dark                   |
| Tests              | Jest + React Testing Library                      | Validación de componentes críticos         |
| Deploy             | Vercel                                            | Hosting automático                          |

---

## 🔥 Retos enfrentados y cómo los resolví

| Reto                                          | Solución aplicada                                                                 | Impacto / Aprendizaje                              |
|-----------------------------------------------|-----------------------------------------------------------------------------------|----------------------------------------------------|
| Sincronizar tema entre SSR y cliente          | Configuración de `next-themes` + guardas de hidratación                        | Evita parpadeos de color durante la carga          |
| Integrar Recharts por primera vez             | Documentación + ejemplos, ajustes de responsive                                | Charts interactivos y adaptables                   |
| Pruebas en Next.js con TS                     | Montaje de entorno jest y mocks correspondientes                                | Base de tests estable para componentes             |
| Animaciones condicionales en mobile/desktop   | Uso de Framer Motion con media queries                                         | Experiencia intuitiva en distintos tamaños         |

---

## 🚀 Cómo empezar

### 1. ¿Qué necesito tener instalado?

- **Node.js** 16 o superior   
  → [Descargar](https://nodejs.org/)

### 2. Pasos para ver el proyecto localmente

```bash
git clone https://github.com/Alex0-8/Crypto_Market.git
cd crypto_market
npm install
npm run dev
```

→ Abre http://localhost:3000 en tu navegador. Edita `app/page.tsx` para empezar.

Comandos útiles

```bash
  npm run dev         # Iniciar servidor de desarrollo
  npm run build       # Crear versión de producción
  npm start           # Servir la build localmente
  npm test            # Ejecutar tests
```

---

# 📄 Licencia
Siéntete libre de usar, modificar y aprender de este proyecto.
Última actualización importante: 1 de Marzo de 2026
¡Gracias por explorar Crypto Market Analyzer!

---

## English

# 📈 Crypto Market Analyzer – Real‑time Crypto Tracker

<div align="center">
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white&style=flat-square" alt="Next.js" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=flat-square" alt="TypeScript" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind%20CSS-38B2AC?logo=tailwind-css&logoColor=white&style=flat-square" alt="Tailwind CSS" /></a>
  <a href="https://vercel.com/"><img src="https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel&logoColor=white&style=flat-square" alt="Vercel" /></a>
  <a href="https://crypto-market-sepia.vercel.app/"><img src="https://img.shields.io/badge/Live%20Demo-brightgreen?logo=vercel&logoColor=white&style=flat-square" alt="Live demo" /></a>
</div>

---

**Crypto Market Analyzer** is a modern web application for tracking and analyzing cryptocurrency prices in real time using Binance’s public API.

- 🔗 **Live demo** → [https://crypto-market-sepia.vercel.app/](https://crypto-market-sepia.vercel.app/)

This project was bootstrapped with Next.js (`create-next-app`) and uses the App Router.

---

## ✨ Key Features

- Theme management (light/dark) with `next-themes`
- Header search bar for filtering cryptocurrencies
- Sidebar listing coins, mobile overlay behavior, favorites
- Main panel with coin details
- Historical 90‑day price chart via **Recharts**
- Interactive buy/sell simulator with transaction history in `localStorage`
- States: loading, error, no-results
- Animations using **Framer Motion**
- Unit tests with **Jest + React Testing Library**

---

## 🛠️ Tech Stack

| Category           | Technology / Tool                          | Notes                                      |
|--------------------|---------------------------------------------|--------------------------------------------|
| Framework          | Next.js (App Router)                        | SSR/SSG, built‑in routing                  |
| Language           | TypeScript (strict mode)                    | Strong typing across the codebase         |
| Styling            | Tailwind CSS                                | Utility‑first with dark mode              |
| State              | TanStack Query + React Context              | Data caching and management               |
| Charts             | Recharts                                    | Time‑series visualization                 |
| Animations         | Framer Motion                               | Smooth transitions                        |
| Themes             | next-themes                                 | Light/dark synchronization                |
| Testing            | Jest + React Testing Library                | Coverage of core components               |
| Deploy             | Vercel                                      | Automatic hosting                          |

---

## 🔥 Challenges Faced and Solutions

| Challenge                                   | Applied Solution                                                       | Impact / Learning                             |
|---------------------------------------------|------------------------------------------------------------------------|-----------------------------------------------|
| Syncing theme between SSR and client        | Configured `next-themes` with hydration guards                        | Avoids color flicker on load                  |
| Integrating Recharts for first time         | Followed docs & examples; adjusted for responsiveness                 | Interactive, adaptable charts                 |
| Testing in Next.js with TS                  | Setup jest environment with proper mocks                             | Stable base for unit tests                    |
| Conditional animations on mobile/desktop    | Used Framer Motion with media query hooks                            | Intuitive experience on all screen sizes      |

---

## 🚀 Getting Started (for beginners)

### 1. Prerequisites

- **Node.js** 16+  
  → [Download](https://nodejs.org/)

### 2. Local setup

```bash
git clone https://github.com/Alex0-8/Crypto_Market.git
cd crypto_market
npm install
npm run dev
```

→ Visit http://localhost:3000 and start editing `app/page.tsx`.

Useful commands

```bash
  npm run dev         # Start dev server
  npm run build       # Produce production build
  npm start           # Serve build locally
  npm test            # Run tests
```

---

# 📄 License
Feel free to use, modify, and learn from this project.
Last important update: March 1, 2026
Thank you for exploring Crypto Market Analyzer!