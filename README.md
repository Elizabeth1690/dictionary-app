# Diccionario Web con Next.js, TypeScript y Tailwind CSS

## 📌 Descripción

Aplicación web de diccionario que utiliza **Dictionary API** para buscar definiciones en inglés, con características como **selector de fuentes, modo oscuro/claro y diseño responsivo**.

---

## ⚙️ Requisitos previos

Asegúrate de tener instalado lo siguiente:

- **Node.js** (16.x+)
- **npm, yarn o pnpm** (gestor de paquetes)

---

## 🚀 Instalación rápida

```bash
# Clonar el repositorio
git clone <url-repositorio>
cd diccionario-web

# Instalar todas las dependencias del proyecto
npm install
```

---

## 📦 Dependencias principales

El proyecto utiliza las siguientes tecnologías principales:

- **next**, **react**, **react-dom**, **typescript**
- **tailwindcss**, **postcss**, **autoprefixer**
- **jotai**, **@tanstack/react-query**, **next-themes**
- **react-icons**, **react-cool-onclickoutside**
- **clsx**, **tailwind-merge**

🌟 **Todas se instalarán automáticamente con** `npm install`.

---

## 🎨 Configuración esencial

### Tailwind CSS

El proyecto ya tiene **Tailwind CSS** configurado. Si necesitas reinicializarlo, usa:

```bash
npx tailwindcss init -p
```

Asegúrate de que `tailwind.config.js` incluya:

```js
darkMode: "class";
```

👉 **Colores personalizados:**

- `purple: "#a445ed"`

---

## 📂 Estructura básica

```plaintext
/app
  ├─ layout.tsx
  ├─ page.tsx
  ├─ Provider.tsx
  ├─ atom.ts
  ├─ type.ts
/components
  ├─ FontSelector.tsx
  ├─ ThemeToggleButton.tsx
  ├─ WordDefinition.tsx
  ├─ WordSearchBar.tsx
/utils
  ├─ cn.ts
```

---

## ▶️ Ejecución

```bash
# Modo desarrollo
npm run dev

# Construcción para producción
npm run build
npm start
```

---

## ✅ Buenas prácticas implementadas

- **Componentes:** Separación modular, código tipado con TypeScript
- **Cliente/Servidor:** Uso correcto de `"use client"` donde es necesario
- **Estado:** Jotai para preferencias globales, React Query para datos
- **UI/UX:** Tema oscuro/claro, opciones de fuentes, diseño responsivo
- **Rendimiento:** Caché con React Query, estructura de componentes optimizada

---

## 🛠️ Solución de problemas comunes

- Verifica la conexión y funcionamiento de la API
- Confirma la configuración correcta del tema en `Provider.tsx`
- Ejecuta la verificación de tipos con TypeScript  
  kdidkdidkdjjddj
  🌐 **La aplicación estará disponible en** `http://localhost:3000`.
