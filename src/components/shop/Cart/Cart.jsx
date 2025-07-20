import style from "./Cart.module.css";
import { useCartContext } from "../../../contexts/CartContext";
import CartItem from "../Cart Item/CartItem";
import { useState } from "react";

function Cart() {
  const { cart, clearCart } = useCartContext();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);

    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false);
      alert(
        "Checkout failed! Sorry, we're not a real shop - this is just a demo! 😅"
      );
    }, 2000); // 2 second delay to simulate processing
  };

  if (cart.items.length === 0) {
    return (
      <div className={style.cartContainer}>
        <h1>Your Cart</h1>
        <div className={style.emptyCart}>
          <p>Your cart is empty</p>
          <a href="/shop" className={style.continueShoppingLink}>
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={style.cartContainer}>
      <h1>Your Cart</h1>
      <div className={style.cartContent}>
        <div className={style.cartItems}>
          {cart.items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className={style.cartSummary}>
          <div className={style.totalItems}>Total Items: {cart.totalItems}</div>
          <div className={style.totalPrice}>
            Total: ${cart.totalPrice.toFixed(2)}
          </div>
          <div className={style.paymentSection}>
            <h4>Payment Method</h4>
            <div className={style.paymentOptions}>
              <div className={style.paymentOption}>
                <input type="radio" id="card" name="payment" defaultChecked />
                <label htmlFor="card">💳 Credit Card</label>
              </div>
              <div className={style.paymentOption}>
                <input type="radio" id="paypal" name="payment" />
                <label htmlFor="paypal">💰 PayPal</label>
              </div>
              <div className={style.paymentOption}>
                <input type="radio" id="apple" name="payment" />
                <label htmlFor="apple">📱 Apple Pay</label>
              </div>
            </div>
          </div>
          <button
            className={style.checkoutBtn}
            onClick={handleCheckout}
            disabled={isCheckingOut}
          >
            {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
          </button>
          <button className={style.clearCartBtn} onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
