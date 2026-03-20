import { useCart } from '../context/CartContext';
import '../styles/CartSidebar.css';

function CartSidebar() {
  const {
    cart,
    isCartOpen,
    toggleCart,
    updateQuantity,
    removeFromCart,
    getTotalPrice
  } = useCart();

  if (!isCartOpen) return null;
  if (!cart) return null;

  return (
    <div className="cart-sidebar">
      <button className="close-btn" onClick={toggleCart}>Close</button>

      <h2>Cart</h2>

      <div className="sidebar-items">
        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          cart.map(item => (
            <div className="sidebar-cart-item" key={item.id}>
              
              <img src={item.image} alt={item.name} className="sidebar-item-image" />
              
              <div className="sidebar-item-content">
                <p className="sidebar-item-name">{item.name}</p>
                
                <div className="sidebar-actions">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  <button style={{color: '#ef4444'}} onClick={() => removeFromCart(item.id)}>X</button>
                </div>
              </div>

            </div>
          ))
        )}
      </div>

      <h3 className="sidebar-total">Total: ₹{getTotalPrice()}</h3>
    </div>
  );
}

export default CartSidebar;