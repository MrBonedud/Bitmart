import style from "./Layout.module.css";

import { Link } from "react-router-dom";

import { useCartContext } from "../../../contexts/CartContext";

import Navigation from "../Navigation/Navigation";
function Layout({ children }) {
  const { cart } = useCartContext();

  return (
    <div className={style.mainLayout}>
      <header className={style.header}>
  <div className={style.headerContent}>
   <Link to="/" className={`${style.logoContainer} ${style.logoLink}`}>
  <img src="/lightbulb.svg" alt="lightbulb" className={style.logoIcon} />
  <span className={style.logoText}>BitMart</span>
</Link>

    <Link to="/cart" className={style.cartButton}>
      <span className={style.cartIcon}>
        <img src="/cart.svg" alt="Cart" />
      </span>
      <span className={style.cartText}>Cart</span>
      <span className={style.cartBadge}>{cart.totalItems}</span>
    </Link>
  </div>
</header>
      <nav className={style.nav}>
        <div className={style.navContent}>
          <Navigation />
        </div>
      </nav>
      <main className={style.main}>
        <div className={style.mainContent}>{children}</div>
      </main>
      <footer className={style.footer}>
        <div className={style.footerContent}>
          <div className={style.footerSection}>
            <h3>About Us</h3>
            <p>BitMart is your one-stop shop for digital goods.</p>
          </div>
          <div className={style.footerSection}>
            <p className={style.disclaimer}>
              Disclaimer: This is not a real shop. This is a demo project.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
