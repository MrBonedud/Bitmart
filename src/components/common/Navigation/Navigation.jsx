import style from "./Navigation.module.css";
import { Link, useLocation } from "react-router-dom";

function Navigation() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <div className={style.navLinksContainer}>
      <Link 
        to="/" 
        className={`${style.navLink} ${style.navItem} ${isActive('/') ? style.active : ''}`}
        aria-label="Navigate to home page"
      >
        <img src="/home.svg" alt="Home icon" />
        <span>Home</span>
      </Link>

      <Link 
        to="/shop" 
        className={`${style.navLink} ${style.navItem} ${isActive('/shop') ? style.active : ''}`}
        aria-label="Navigate to shop page"
      >
        <img src="/cart.svg" alt="Shop icon" />
        <span>Shop</span>
      </Link>
     
    </div>
  );
}

export default Navigation;