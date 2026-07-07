import { useEffect, useState } from 'react';
import CupIcon from './CupIcon';
import { ICE_LEVELS, SUGAR_LEVELS, TOPPINGS } from '../data/menuData';
import { formatLKR } from '../utils/format';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function CustomizeModal({ drink, onClose }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [sugar, setSugar] = useState(SUGAR_LEVELS[2]);
  const [ice, setIce] = useState(ICE_LEVELS[2]);
  const [toppings, setToppings] = useState([]);
  const [qty, setQty] = useState(1);

  // Reset selections whenever a new drink is opened
  useEffect(() => {
    if (drink) {
      setSugar(SUGAR_LEVELS[2]);
      setIce(ICE_LEVELS[2]);
      setToppings([]);
      setQty(1);
    }
  }, [drink]);

  // Escape-to-close + lock body scroll while open
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = drink ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [drink, onClose]);

  if (!drink) return null;

  const toggleTopping = (id) => {
    setToppings((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));
  };

  const unitPrice =
    drink.price +
    toppings.reduce((sum, id) => {
      const t = TOPPINGS.find((tp) => tp.id === id);
      return sum + (t ? t.price : 0);
    }, 0);

  const handleAddToCart = () => {
    addToCart({
      cartId: `${drink.id}-${Date.now()}`,
      drinkId: drink.id,
      name: drink.name,
      liquid: drink.liquid,
      color: drink.color,
      sugar,
      ice,
      toppings: [...toppings],
      unitPrice,
      qty
    });
    showToast(`${drink.name} added to cart`);
    onClose();
  };

  return (
    <div
      className="modal-overlay open"
      onClick={(e) => {
        if (e.currentTarget === e.target) onClose();
      }}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <button className="modal-close" onClick={onClose} aria-label="Close" type="button">
          ✕
        </button>

        <div className="modal-header">
          <div className="modal-cup">
            <CupIcon liquidColor={drink.liquid} pearlColor={drink.color} />
          </div>
          <div>
            <h2 id="modalTitle">{drink.name}</h2>
            <p>{drink.description}</p>
          </div>
        </div>

        <div className="modal-section">
          <h4>Sugar Level</h4>
          <div className="option-row">
            {SUGAR_LEVELS.map((opt) => (
              <button
                key={opt}
                type="button"
                className={`option-chip${opt === sugar ? " selected" : ""}`}
                onClick={() => setSugar(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="modal-section">
          <h4>Ice Level</h4>
          <div className="option-row">
            {ICE_LEVELS.map((opt) => (
              <button
                key={opt}
                type="button"
                className={`option-chip${opt === ice ? " selected" : ""}`}
                onClick={() => setIce(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="modal-section">
          <h4>Toppings</h4>
          <div className="topping-list">
            {TOPPINGS.map((t) => (
              <div
                key={t.id}
                className={`topping-row${toppings.includes(t.id) ? " selected" : ""}`}
                onClick={() => toggleTopping(t.id)}
              >
                <label onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={toppings.includes(t.id)}
                    onChange={() => toggleTopping(t.id)}
                  />
                  {t.name}
                </label>
                <span className="t-price">{t.price > 0 ? "+" + formatLKR(t.price) : "Included"}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="qty-row">
          <h4 style={{ margin: 0 }}>Quantity</h4>
          <div className="qty-stepper">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
            >
              −
            </button>
            <span>{qty}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQty((q) => Math.min(20, q + 1))}
            >
              +
            </button>
          </div>
        </div>

        <div className="modal-footer">
          <div className="modal-total">
            <span>Total</span>
            <span>{formatLKR(unitPrice * qty)}</span>
          </div>
          <button className="btn btn-primary" type="button" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
