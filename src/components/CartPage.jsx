import { useCart } from '../context/CartContext';
import '../styles/CartPage.css';

function CartPage() {
  const { cart, updateQuantity, removeFromCart, getTotalPrice } = useCart();

  if (!cart || cart.length === 0) {
    return <h2>Cart is empty</h2>;
  }

  return (
    <div className="cart-page">
      {cart.map(item => (
        <div className="cart-item" key={item.id}>
          
          <img src={item.image} alt={item.name} className="cart-item-image" />
          
          <div className="cart-item-info">
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
          </div>

          <div className="cart-actions">
            <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
              -
            </button>
            
            <span>{item.quantity}</span>
            
            <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
              +
            </button>

            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </div>
        </div>
      ))}

      <h2 className="total-price">Total: ₹{getTotalPrice()}</h2>
    </div>
  );
}

export default CartPage;