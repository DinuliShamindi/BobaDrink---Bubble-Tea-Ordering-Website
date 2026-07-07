# BobaBliss — React (Vite) Edition

A React + Vite conversion of the original static HTML/CSS/JS BobaBliss site. Same look, same
behavior, same three pages — now as components with client-side routing instead of separate
HTML files.

## How to run

```
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build for production:

```
npm run build
npm run preview
```

## What changed vs. the original vanilla JS version

| Original | React version |
|---|---|
| 3 separate HTML pages (`index.html`, `menu.html`, `cart.html`) | 3 routes (`/`, `/menu`, `/cart`) rendered by React Router inside one `index.html` |
| `cart.js` (localStorage + manual DOM updates) | `CartContext` — same localStorage persistence and merge logic, exposed via a `useCart()` hook |
| `showToast()` DOM helper in `cart.js` | `ToastContext` / `useToast()` — same 2.4s auto-dismiss timing |
| `cup-icon.js`'s `cupIconSVG()` string generator | `<CupIcon />` component (uses React's `useId()` instead of string-replacing the color for unique `clipPath` ids) |
| `nav.js` mobile toggle | Local `useState` in `Header.jsx` |
| `menu.js`'s modal state machine (`currentDrink`, `selectedSugar`, etc.) | `<CustomizeModal />` component with the same fields as local `useState` |
| `menu.html?category=` / `menu.html#drink-id` deep links | Same URLs still work — read via `useSearchParams()` / `location.hash` |
| Repeated `<header>` / `<footer>` markup on every page | `<Header />` / `<Footer />` components rendered once in `App.jsx` |

## Structure

```
bobabliss-react/
├── index.html              Vite entry HTML (just mounts #root)
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx             Mounts <App/>, wraps it in Router + Cart/Toast providers
    ├── App.jsx              Header + Routes (Home/Menu/Cart) + Footer
    ├── data/
    │   └── menuData.js      Drinks, toppings, sugar/ice levels (same data as menu-data.js)
    ├── context/
    │   ├── CartContext.jsx  Cart state, localStorage persistence, totals
    │   └── ToastContext.jsx Toast message state + auto-dismiss
    ├── components/
    │   ├── Header.jsx
    │   ├── Footer.jsx
    │   ├── CupIcon.jsx       The boba cup SVG illustration
    │   └── CustomizeModal.jsx  Sugar/ice/toppings/qty modal used on the Menu page
    ├── pages/
    │   ├── Home.jsx
    │   ├── Menu.jsx
    │   └── Cart.jsx
    └── styles/
        ├── style.css         Shared tokens, nav, footer, buttons, toast (unchanged)
        ├── home.css
        ├── menu.css
        └── cart.css
```

## Notes
- Styling is unchanged — the original `style.css` / `home.css` / `menu.css` / `cart.css` are
  used as plain global CSS (no Tailwind, no CSS Modules), same as the source project.
- Cart data still lives in `localStorage` under the same key (`bobabliss_cart`), so nothing
  needs to migrate — it behaves the same across reloads.
- Checkout is still a front-end simulation: it validates the form, generates a mock order ID,
  and clears the cart. No backend/payment integration.
- All 12 drinks, toppings, and pricing live in `src/data/menuData.js` — edit that one file to
  add or change menu items, same as before.
