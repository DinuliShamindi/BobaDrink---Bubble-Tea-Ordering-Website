import { useState } from 'react';
import { Link } from 'react-router-dom';
import CupIcon from '../components/CupIcon';
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD, useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { TOPPINGS } from '../data/menuData';
import { formatLKR } from '../utils/format';

function toppingNames(ids) {
  return ids
    .map((id) => TOPPINGS.find((t) => t.id === id))
    .filter(Boolean)
    .map((t) => t.name);
}

export default function Cart() {
  const { cart, removeFromCart, updateCartQty, cartSubtotal, clearCart } = useCart();
  const { showToast } = useToast();
  const [confirmation, setConfirmation] = useState(null);
  const [invalid, setInvalid] = useState({});

  const subtotal = cartSubtotal;
  const delivery = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + delivery;
  const remaining = FREE_DELIVERY_THRESHOLD - subtotal;

  const handleQtyDec = (item) => {
    if (item.qty <= 1) {
      removeFromCart(item.cartId);
    } else {
      updateCartQty(item.cartId, item.qty - 1);
    }
  };

  const handleRemove = (item) => {
    removeFromCart(item.cartId);
    showToast(`${item.name} removed`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const fullName = form.fullName.value;
    const phone = form.phone.value;
    const address = form.address.value;

    const validation = {
      nameGroup: fullName.trim().length > 1,
      phoneGroup: /^[0-9+\s-]{7,15}$/.test(phone.trim()),
      addressGroup: address.trim().length > 5
    };

    setInvalid(validation);
    if (Object.values(validation).some((v) => !v)) return;

    const orderId = "BB" + Math.floor(100000 + Math.random() * 900000);
    setConfirmation({ name: fullName.trim(), orderId, total });
    clearCart();
  };

  if (confirmation) {
    return (
      <section className="container">
        <div className="confirmation">
          <div className="check-badge">✓</div>
          <h2>Thanks, {confirmation.name.split(" ")[0]}! Your order is on its way.</h2>
          <p>
            Order <span className="order-id">#{confirmation.orderId}</span> · {formatLKR(confirmation.total)}
          </p>
          <p>Estimated delivery: 35–40 minutes.</p>
          <div style={{ marginTop: 26, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/menu" className="btn btn-secondary">
              Order More
            </Link>
            <Link to="/" className="btn btn-primary">
              Back Home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (cart.length === 0) {
    return (
      <section className="container">
        <div className="empty-cart">
          <CupIcon liquidColor="#EAE1F5" animated={false} pearlColor="#C7B6E0" />
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't picked a drink yet. Let's fix that.</p>
          <Link to="/menu" className="btn btn-primary">
            Browse the Menu
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container">
      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => {
            const configParts = [`Sugar ${item.sugar}`, item.ice, ...toppingNames(item.toppings)];
            return (
              <div className="cart-item" key={item.cartId}>
                <div className="cart-item-cup">
                  <CupIcon liquidColor={item.liquid} animated={false} pearlColor={item.color} />
                </div>
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <div className="config">{configParts.join(" · ")}</div>
                  <div className="cart-item-stepper">
                    <button
                      className="qty-dec"
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => handleQtyDec(item)}
                    >
                      −
                    </button>
                    <span>{item.qty}</span>
                    <button
                      className="qty-inc"
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => updateCartQty(item.cartId, item.qty + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-item-actions">
                  <span className="cart-item-price">{formatLKR(item.unitPrice * item.qty)}</span>
                  <button className="remove-btn" type="button" onClick={() => handleRemove(item)}>
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="summary-panel">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatLKR(subtotal)}</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span>{delivery === 0 ? "Free" : formatLKR(delivery)}</span>
          </div>
          {remaining > 0 ? (
            <div className="free-delivery-note">Add {formatLKR(remaining)} more for free delivery 🎉</div>
          ) : (
            <div className="free-delivery-note">You've unlocked free delivery 🎉</div>
          )}
          <div className="summary-row total">
            <span>Total</span>
            <span>{formatLKR(total)}</span>
          </div>

          <form className="checkout-form" onSubmit={handleSubmit} noValidate>
            <div className={`form-group${invalid.nameGroup === false ? " invalid" : ""}`}>
              <label htmlFor="fullName">Full name</label>
              <input type="text" id="fullName" name="fullName" placeholder="e.g. Dinuli Wijesinghe" />
              <span className="form-error">Please enter your name.</span>
            </div>
            <div className={`form-group${invalid.phoneGroup === false ? " invalid" : ""}`}>
              <label htmlFor="phone">Phone number</label>
              <input type="tel" id="phone" name="phone" placeholder="e.g. 077 123 4567" />
              <span className="form-error">Please enter a valid phone number.</span>
            </div>
            <div className={`form-group${invalid.addressGroup === false ? " invalid" : ""}`}>
              <label htmlFor="address">Delivery address</label>
              <textarea id="address" name="address" placeholder="House no, street, city"></textarea>
              <span className="form-error">Please enter a delivery address.</span>
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Place Order — {formatLKR(total)}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
