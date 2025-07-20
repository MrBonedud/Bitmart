import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchProducts } from "../../services/api";

function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoAdvancing, setIsAutoAdvancing] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  // Add this state to track animation direction
  const [animationClass, setAnimationClass] = useState('');
  const [lastInteractionType, setLastInteractionType] = useState('auto'); // 'auto', 'next', 'prev'

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        // Fetch all products first
        const allProducts = await fetchProducts();

        // Get one product from each category
        const categories = [
          "electronics",
          "jewelery",
          "men's clothing",
          "women's clothing",
        ];
        const featuredByCategory = categories
          .map((category) =>
            allProducts.find((product) => product.category === category)
          )
          .filter(Boolean); // Remove any undefined results

        setFeaturedProducts(featuredByCategory);
      } catch (error) {
        console.error("Error loading featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  // Keyboard navigation useEffect
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (featuredProducts.length === 0) return;

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          prevProduct();
          break;
        case "ArrowRight":
          event.preventDefault();
          nextProduct();
          break;
        default:
          break;
      }
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup function
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [featuredProducts.length]); // Re-run if products change

  // Update the auto-advance useEffect to include fade animation
  useEffect(() => {
    if (!isAutoAdvancing || isPaused || featuredProducts.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setLastInteractionType('auto');
      setAnimationClass('fadeTransition');
      setCurrentIndex((prevIndex) =>
        prevIndex === featuredProducts.length - 1 ? 0 : prevIndex + 1
      );
      // Clear animation class after animation completes
      setTimeout(() => setAnimationClass(''), 600);
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, [isAutoAdvancing, isPaused, featuredProducts.length, currentIndex]);

  // Update your nextProduct function
  const nextProduct = () => {
    setLastInteractionType('next');
    setAnimationClass('slideLeft');
    setCurrentIndex((prevIndex) =>
      prevIndex === featuredProducts.length - 1 ? 0 : prevIndex + 1
    );
    // Reset auto-advance timer when user manually navigates
    setIsAutoAdvancing(false);
    setTimeout(() => setIsAutoAdvancing(true), 1000);
    // Clear animation class after animation completes
    setTimeout(() => setAnimationClass(''), 500);
  };

  // Update your prevProduct function  
  const prevProduct = () => {
    setLastInteractionType('prev');
    setAnimationClass('slideRight');
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? featuredProducts.length - 1 : prevIndex - 1
    );
    // Reset auto-advance timer when user manually navigates
    setIsAutoAdvancing(false);
    setTimeout(() => setIsAutoAdvancing(true), 1000);
    // Clear animation class after animation completes
    setTimeout(() => setAnimationClass(''), 500);
  };

  // Update your goToProduct function for indicator clicks
  const goToProduct = (index) => {
    const direction = index > currentIndex ? 'next' : 'prev';
    setLastInteractionType(direction);
    setAnimationClass(direction === 'next' ? 'slideLeft' : 'slideRight');
    setCurrentIndex(index);
    // Reset auto-advance timer when user manually navigates
    setIsAutoAdvancing(false);
    setTimeout(() => setIsAutoAdvancing(true), 1000);
    // Clear animation class after animation completes
    setTimeout(() => setAnimationClass(''), 500);
  };

  // Add these handlers for mouse hover
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div>
      <section className={styles.Hero}>
        <div className={styles.heroContainer}>
          <h1>Shop Smart, Shop Digital</h1>
          <p>Browse thousands of products and find exactly what you need</p>
          <p>note: we are not a real shop, this is a demo</p>
          <Link to="/shop" className={styles.button}>
            Start Shopping
          </Link>
        </div>
      </section>

      <section className={styles.featuredProducts}>
        <div className={styles.container}>
          <h2>Featured Products</h2>

          {loading ? (
            <p>Loading featured products...</p>
          ) : (
            <div
              className={styles.slider}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={styles.prevButton}
                onClick={prevProduct}
                disabled={featuredProducts.length === 0}
              >
                ←
              </button>

              <div className={styles.productDisplay}>
                {featuredProducts.length > 0 && (
                  <div className={`${styles.productCard} ${styles[animationClass] || ''}`}>
                    <img
                      src={featuredProducts[currentIndex].image}
                      alt={featuredProducts[currentIndex].title}
                    />
                    <h3>{featuredProducts[currentIndex].title}</h3>
                    <p>${featuredProducts[currentIndex].price}</p>
                  </div>
                )}
              </div>

              <button
                className={styles.nextButton}
                onClick={nextProduct}
                disabled={featuredProducts.length === 0}
              >
                →
              </button>
              <div className={styles.indicators}>
                {featuredProducts.map((_, index) => (
                  <button
                    key={index}
                    className={
                      index === currentIndex
                        ? styles.indicatorActive
                        : styles.indicator
                    }
                    onClick={() => goToProduct(index)}
                  >
                    •
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default HomePage;