import { fetchProducts, fetchProductById } from '../../services/api';
import { useState, useEffect } from 'react';
import Catagories from '../../components/shop/Catagories/Catagories';
import ProductCard from '../../components/shop/Product Card/ProductCard';
import styles from './ShopPage.module.css';

function ShopPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                const data = await fetchProducts();
                setProducts(data);
                console.log('Loaded products:', data);
            } catch (err) {
                setError(err.message);
                console.error('Error loading products:', err);
            } finally {
                setLoading(false);
            }
        };
        
        loadProducts();
    }, []);

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const getFilteredProducts = () => {
        if (selectedCategory === 'all') {
            return products;
        }
        return products.filter(product => product.category === selectedCategory);
    };

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.headerTitle}>Shop</h1>
            </div>
            
            <div className={styles.shopContainer}>
                {/* LEFT SIDE - Categories Sidebar */}
                <Catagories 
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                />
                
                {/* RIGHT SIDE - Products */}
                <div className={styles.mainContent}>
                    {loading && (
                        <div className={styles.loadingMessage}>
                            <p>Loading products...</p>
                        </div>
                    )}
                    
                    {error && (
                        <div className={styles.errorMessage}>
                            <p>Error: {error}</p>
                        </div>
                    )}

                    {!loading && !error && (
                        <div>
                            <div className={styles.productsHeader}>
                                <p className={styles.productCount}>
                                    Found {getFilteredProducts().length} products
                                </p>
                            </div>
                            
                            {getFilteredProducts().length === 0 ? (
                                <div className={styles.noProducts}>
                                    <p>No products found in this category</p>
                                </div>
                            ) : (
                                <div className={styles.productsGrid}>
                                    {getFilteredProducts().map(product => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ShopPage;