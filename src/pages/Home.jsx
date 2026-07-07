import { Link } from 'react-router-dom';
import CupIcon from '../components/CupIcon';
import { CATEGORY_LABELS, MENU_DATA, findDrink } from '../data/menuData';
import { formatLKR } from '../utils/format';

const FEATURED_IDS = ["brown-sugar-boba", "cheese-foam-oolong", "mango-pop-tea"];

export default function Home() {
  const featuredDrinks = FEATURED_IDS.map(findDrink);
  const categories = Object.keys(CATEGORY_LABELS);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-copy">
            <h1>
              Bubble tea that actually tastes handmade.
            </h1>
            <p>
              Real tea leaves, fresh milk, and hand-cooked brown sugar — shaken to order and
              delivered to your door in under 40 minutes.
            </p>
            <div className="hero-actions">
              <Link to="/menu" className="btn btn-primary">
                Order Now
              </Link>
              <a href="#featured" className="btn btn-secondary">
                See Menu
              </a>
            </div>
            <div className="hero-stats">
              <div>
                <strong>12+</strong>
                <span>Signature drinks</span>
              </div>
              <div>
                <strong>35 min</strong>
                <span>Avg. delivery</span>
              </div>
              <div>
                <strong>4.8★</strong>
                <span>Customer rating</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-blob"></div>
            <div className="hero-cup-float f1">
              <CupIcon liquidColor="#9B82C2" pearlColor="#5E4383" />
            </div>
            <div className="hero-cup-main">
              <CupIcon liquidColor="#8A5A34" />
            </div>
            <div className="hero-cup-float f2">
              <CupIcon liquidColor="#F2A9B6" pearlColor="#E37F68" />
            </div>
          </div>
        </div>
      </section>

      {/* Category strip */}
      <section className="category-strip">
        <div className="container">
          {categories.map((cat) => {
            const sample = MENU_DATA.find((d) => d.category === cat);
            return (
              <Link key={cat} to={`/menu?category=${cat}`} className="category-pill">
                <span className="swatch" style={{ background: sample.liquid }}></span>
                {CATEGORY_LABELS[cat]}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured drinks */}
      <section className="section" id="featured">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Crowd favorites</h2>
              <p>The drinks our regulars reorder every single week.</p>
            </div>
            <Link to="/menu" className="btn btn-ghost">
              View full menu →
            </Link>
          </div>
          <div className="drink-grid">
            {featuredDrinks.map((d) => (
              <div className="drink-card" key={d.id}>
                <div className="drink-card-cup">
                  <CupIcon liquidColor={d.liquid} pearlColor={d.color} />
                </div>
                {d.tags[0] && <span className="drink-tag">{d.tags[0]}</span>}
                <h3>{d.name}</h3>
                <p className="desc">{d.description}</p>
                <div className="drink-card-footer">
                  <span className="price">{formatLKR(d.price)}</span>
                  <Link to={`/menu#${d.id}`} className="btn btn-primary btn-sm">
                    Customize
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section section-tight" style={{ background: "var(--cream-deep)" }}>
        <div className="container">
          <div className="section-head">
            <div>
              <h2>How delivery works</h2>
              <p>From tap to doorstep, here's the whole journey.</p>
            </div>
          </div>
          <div className="steps">
            <div className="step">
              <span className="step-num">1</span>
              <h3>Build your cup</h3>
              <p>Pick a base, then set your sugar, ice, and toppings exactly how you like it.</p>
            </div>
            <div className="step">
              <span className="step-num">2</span>
              <h3>We shake it fresh</h3>
              <p>Nothing is pre-made — your order is shaken the moment it hits our counter.</p>
            </div>
            <div className="step">
              <span className="step-num">3</span>
              <h3>It's at your door</h3>
              <p>Track your rider live and sip within 35–40 minutes, guaranteed cold and sealed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="cta-band">
            <div>
              <h2>Craving something sweet?</h2>
              <p>Free delivery on orders over Rs. 3,000.</p>
            </div>
            <Link to="/menu" className="btn btn-primary">
              Start an Order
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
