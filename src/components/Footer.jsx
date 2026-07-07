import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/" className="logo">
            Boba<span>Drink</span>
          </Link>
          <p>Handcrafted bubble tea, delivered fresh across Colombo. Real ingredients, no shortcuts.</p>
        </div>
        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/menu">Menu</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Get in touch</h4>
          <ul>
            <li>
              <a href="#">hello@bobadrink.lk</a>
            </li>
            <li>
              <a href="#">+94 77 123 4567</a>
            </li>
            <li>
              <a href="#">Colombo, Sri Lanka</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">© 2026 BobaDrink. All rights reserved.</div>
    </footer>
  );
}
