import { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import CupIcon from '../components/CupIcon';
import CustomizeModal from '../components/CustomizeModal';
import { CATEGORY_LABELS, MENU_DATA, findDrink } from '../data/menuData';
import { formatLKR } from '../utils/format';

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const categoryParam = searchParams.get("category");
  const activeCategory = categoryParam && CATEGORY_LABELS[categoryParam] ? categoryParam : "all";

  const [openDrink, setOpenDrink] = useState(null);

  // Support drink deep-linking via #drink-id, same as the original menu.js
  useEffect(() => {
    if (location.hash) {
      const drinkId = location.hash.replace("#", "");
      const drink = findDrink(drinkId);
      if (drink) setOpenDrink(drink);
    }
    // Only run once, on initial load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeModal = () => {
    setOpenDrink(null);
    if (location.hash) {
      navigate(location.pathname + location.search, { replace: true });
    }
  };

  const setCategory = (cat) => {
    if (cat === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  const categories = activeCategory === "all" ? Object.keys(CATEGORY_LABELS) : [activeCategory];

  return (
    <>
      <section className="menu-hero container">
        <h1>Our Menu</h1>
        <p>Every drink is made to order — pick your sugar, ice, and toppings before it goes in the shaker.</p>
      </section>

      <section className="menu-tabs">
        <div className="container">
          <button
            className={`tab-btn${activeCategory === "all" ? " active" : ""}`}
            type="button"
            onClick={() => setCategory("all")}
          >
            All
          </button>
          {Object.keys(CATEGORY_LABELS).map((cat) => (
            <button
              key={cat}
              className={`tab-btn${activeCategory === cat ? " active" : ""}`}
              type="button"
              onClick={() => setCategory(cat)}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </section>

      <section className="menu-grid-section container">
        {categories.map((cat) => {
          const drinks = MENU_DATA.filter((d) => d.category === cat);
          return (
            <Fragment key={cat}>
              <h2 className="category-heading">{CATEGORY_LABELS[cat]}</h2>
              <div className="drink-grid">
                {drinks.map((d) => (
                  <div className="drink-card" id={d.id} key={d.id} onClick={() => setOpenDrink(d)}>
                    <div className="drink-card-cup">
                      <CupIcon liquidColor={d.liquid} pearlColor={d.color} />
                    </div>
                    {d.tags[0] && <span className="drink-tag">{d.tags[0]}</span>}
                    <h3>{d.name}</h3>
                    <p className="desc">{d.description}</p>
                    <div className="drink-card-footer">
                      <span className="price">{formatLKR(d.price)}</span>
                      <button className="btn btn-primary btn-sm" type="button">
                        Customize
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Fragment>
          );
        })}
      </section>

      <CustomizeModal drink={openDrink} onClose={closeModal} />
    </>
  );
}
