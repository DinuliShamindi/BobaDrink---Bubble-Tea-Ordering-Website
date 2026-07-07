import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import CupIcon from './CupIcon';
import { useCart } from '../context/CartContext';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { cartItemCount } = useCart();

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <nav className="nav">
        <Link to="/" className="logo" onClick={closeMenu}>
          <span className="logo-mark">
            <CupIcon liquidColor="#7B5EA7" animated={false} />
          </span>
          Boba<span>Drink</span>
        </Link>
        <ul className={`nav-links${open ? " open" : ""}`}>
          <li>
            <NavLink to="/" end onClick={closeMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu" onClick={closeMenu}>
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" onClick={closeMenu}>
              Track Order
            </NavLink>
          </li>
        </ul>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link to="/cart" className="nav-cart" aria-label="View cart">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="cart-count" hidden={cartItemCount === 0}>
              {cartItemCount > 9 ? "9+" : cartItemCount}
            </span>
          </Link>
          <button
            className={`nav-toggle${open ? " open" : ""}`}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </header>
  );
}
