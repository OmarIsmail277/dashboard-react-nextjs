
# 📦 Project Name

**Dashboard App** – A responsive dashboard built with **Next.js**, **React**, **Tailwind CSS**, **Framer Motion**, and **Redux**, **Supabase** featuring tables, charts, and user authentication.

---

## 📝 Features

* Responsive **sidebar navigation** with collapsible and overlay behavior on mobile.
* **Header** with user info and logout functionality.
* **DataTable**:

  * Search products by name
  * Pagination
  * Sortable columns
  * Horizontal scroll on small screens
* **User authentication** integrated with Supabase (login/logout).
* Clean, modern UI using **Tailwind CSS** and **Framer Motion** for smooth animations.

---

## ⚡ Tech Stack

* **Frontend:** Next.js 13+, React 18
* **State Management:** Redux Toolkit
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion
* **Data Fetching:** Supabase (BAS)


---

## 🚀 Getting Started

1. **Clone the repository**:

```bash
git clone https://github.com/OmarIsmail277/dashboard-react-nextjs
cd dashboard-react-nextjs
```

2. **Install dependencies**:

```bash
npm install
# or
yarn install
```

3. **Run the development server**:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
📦app
 ┣ 📂dashboard
 ┃ ┣ 📂charts
 ┃ ┃ ┗ 📜page.jsx
 ┃ ┣ 📂tables
 ┃ ┃ ┣ 📜columns.jsx
 ┃ ┃ ┗ 📜page.jsx
 ┃ ┣ 📜layout.jsx
 ┃ ┗ 📜page.jsx
 ┣ 📂login
 ┃ ┗ 📜page.jsx
 ┣ 📜favicon.ico
 ┣ 📜globals.css
 ┣ 📜hero.js
 ┣ 📜layout.js
 ┗ 📜page.js
📦components
 ┣ 📂layout
 ┃ ┣ 📜Header.jsx
 ┃ ┗ 📜Sidebar.jsx
 ┣ 📂ui
 ┃ ┗ 📜Button.jsx
 ┣ 📜icons.jsx
 ┗ 📜ProtectedRoutes.jsx
📦features
 ┣ 📂charts
 ┃ ┗ 📜Charts.jsx
 ┗ 📂table
 ┃ ┗ 📂components
 ┃ ┃ ┗ 📜DataTable.jsx
/lib
  - supabaseClient.js
/repositories
  - productRepository.js
  - userRepository.js
 ┣ 📂public
 ┃ ┣ 📜burger.png
 ┃ ┣ 📜charts.svg
 ┃ ┣ 📜dashboard.svg
 ┃ ┣ 📜file.svg
 ┃ ┣ 📜globe.svg
 ┃ ┣ 📜next.svg
 ┃ ┣ 📜table.svg
 ┃ ┣ 📜user.svg
 ┃ ┣ 📜vercel.svg
 ┃ ┗ 📜window.svg
 ┣ 📂repositories
 ┃ ┣ 📜productRepository.js
 ┃ ┗ 📜userRepository.js
 ┣ 📂store
 ┃ ┣ 📜Providers.jsx
 ┃ ┣ 📜store.js
 ┃ ┗ 📜userSlice.js
 ┣ 📜.dockerignore
 ┣ 📜.gitignore
 ┣ 📜Dockerfile
 ┣ 📜eslint.config.mjs
 ┣ 📜jsconfig.json
 ┣ 📜next.config.mjs
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜postcss.config.mjs
 ┗ 📜README.md

---

## 👤 Author

**Omar Ahmed** – Frontend Developer
[GitHub]https://github.com/OmarIsmail277/ | https://www.linkedin.com/in/omar-ahmed-ismail

---
 
