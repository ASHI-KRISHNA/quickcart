import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/Header.css';

function Header({ searchTerm, onSearchChange }) {
  const { getTotalItems, toggleCart } = useCart();

  const categories = ['Electronics', 'Accessories', 'Home', 'Sports'];

  return (
    <header className="header"a>
      <Link to="/">QuickCart</Link>

      <nav>
        {categories.map(cat => (
          <Link key={cat} to={`/category/${cat}`}>
            {cat}
          </Link>
        ))}
        <Link to="/cart">Cart</Link>
      </nav>

      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <button onClick={toggleCart}>
        🛒 {getTotalItems()}
      </button>
    </header>
  );
}

export default Header;