import { useCart } from '../context/CartContext';
import ProductList from './ProductList';

function HomePage({ products, searchTerm }) {
  const { addToCart } = useCart();

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <ProductList products={filtered} onAddToCart={addToCart} />
      {filtered.length === 0 && <p>No products found</p>}
    </div>
  );
}

export default HomePage;