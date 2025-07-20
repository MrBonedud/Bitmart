import styles from "./ProductCard.module.css";
import { useState } from "react";
import { useCartContext } from "../../../contexts/CartContext";
import PropTypes from 'prop-types';

function truncateDescription(description, maxLength = 100) {
  if (!description) return "";
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength).trim() + "...";
}

function ProductCard({ product }) {
const { addToCart } = useCartContext();
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;

    // If input is empty (after backspace/delete), set to 1
    if (value === "" || value === "0") {
      setQuantity(1);
      return;
    }

    const numValue = parseInt(value);
    if (numValue >= 1) {
      setQuantity(numValue);
    }
  };

  const handleBlur = (e) => {
    if (e.target.value === "" || parseInt(e.target.value) < 1) {
      setQuantity(1);
    }
  };

  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
  
    setIsAdding(true);
    addToCart(product, quantity); 
    
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 1000);
  };
  

  return (
    <>
      <div className={styles.card}>
        <img src={product.image} alt={product.title} className={styles.image} />
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.category}>{product.category}</p>
        <p className={styles.description}>
          {truncateDescription(product.description)}
        </p>
        <p className={styles.price}>${product.price}</p>
        <p className={styles.quantity}>{quantity}</p>
        <div className={styles.quantityControls}>
          <button onClick={handleDecrement}>-</button>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            onBlur={handleBlur}
            min="1"
          />
          <button onClick={handleIncrement}>+</button>
        </div>
        <button
          className={styles.button}
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          {isAdding ? "Added!" : "Add to cart"}
        </button>
      </div>
    </>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
     id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        category:PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
       
  }).isRequired
};

export default ProductCard;
