import styles from "./Catagories.module.css";
import PropTypes from 'prop-types';


function Catagories({ selectedCategory, onCategoryChange }) {
  const categories = [
  { id: "all", name: "All Products", icon: "🛍️" },
  { id: "electronics", name: "Electronics", icon: "🔌" },
  { id: "jewelery", name: "Jewelry", icon: "💎" },
  { id: "men's clothing", name: "Men's Clothing", icon: "👔" },
  { id: "women's clothing", name: "Women's Clothing", icon: "👗" },
];
  

  return (
    <div className={styles.sidebar}>
      <h3 className={styles.title}>Categories</h3>
  
      {categories.map((category) => (
        <div
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={
            selectedCategory === category.id ? styles.active : styles.item
          }
        >
          <span className={styles.icon}>{category.icon}</span>
          <span className={styles.name}>{category.name}</span>
        </div>
      ))}
    </div>
  );
}

Catagories.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired
};

export default Catagories;

