import styles from "./CartItem.module.css";
import { useCartContext } from "../../../contexts/CartContext";
import PropTypes from 'prop-types';


function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCartContext();
  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };



  const handleRemove = () => {
    if (window.confirm("Remove this item from cart?")) {
      removeFromCart(item.id);
    }
  };
  return (
    <div className={styles.cartItem}>
      <img src={item.image} alt={item.title} className={styles.image} />

      <div className={styles.itemInfo}>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.price}>${item.price}</p>
      </div>

      <div className={styles.quantityControls}>
        <button className={styles.quantityBtn} onClick={handleDecrement}>
          -
        </button>
        <span className={styles.quantity}>{item.quantity}</span>
        <button className={styles.quantityBtn} onClick={handleIncrement}>
          +
        </button>
      </div>

      <div className={styles.itemTotal}>
        ${(item.price * item.quantity).toFixed(2)}
      </div>

      <button className={styles.removeBtn} onClick={handleRemove}>
        Remove
      </button>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired
};

export default CartItem;
