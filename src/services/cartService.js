/* eslint-env node */

class CartService {
  constructor() {
    this.storageKey = 'shopping-cart';
    this.cart = this.loadFromStorage();
  }

  loadFromStorage() {
    if (process.env.NODE_ENV === 'test') {
      return {
        items: [],
        totalItems: 0,
        totalPrice: 0
      };
    }

    try {
      const saved = localStorage.getItem(this.storageKey);
      return saved ? JSON.parse(saved) : {
        items: [],
        totalItems: 0,
        totalPrice: 0
      };
    } catch (error) {
      console.error('Error loading cart from storage:', error);
      return {
        items: [],
        totalItems: 0,
        totalPrice: 0
      };
    }
  }

  saveToStorage() {
    if (process.env.NODE_ENV === 'test') return; // Avoid writing in test environment
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  }

  calculateTotals(items) {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    return { totalItems, totalPrice };
  }

  addToCart(product, quantity = 1) {
    const existingItem = this.cart.items.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.items.push({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: quantity,
        image: product.image
      });
    }
    
    const totals = this.calculateTotals(this.cart.items);
    this.cart = { ...this.cart, ...totals };
    this.saveToStorage();
    
    return this.cart;
  }

  removeFromCart(productId) {
    this.cart.items = this.cart.items.filter(item => item.id !== productId);
    const totals = this.calculateTotals(this.cart.items);
    this.cart = { ...this.cart, ...totals };
    this.saveToStorage();
    
    return this.cart;
  }

  updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
      return this.removeFromCart(productId);
    }
    
    const item = this.cart.items.find(item => item.id === productId);
    if (item) {
      item.quantity = newQuantity;
      const totals = this.calculateTotals(this.cart.items);
      this.cart = { ...this.cart, ...totals };
      this.saveToStorage();
    }
    
    return this.cart;
  }

  clearCart() {
    this.cart = {
      items: [],
      totalItems: 0,
      totalPrice: 0
    };
    this.saveToStorage();
    
    return this.cart;
  }

  getCart() {
    return this.cart;
  }

  
  resetCart() {
    this.cart = {
      items: [],
      totalItems: 0,
      totalPrice: 0
    };
    this.saveToStorage();
  }
}

export const cartService = new CartService();
