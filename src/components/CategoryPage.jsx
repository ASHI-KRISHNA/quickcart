import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductList from './ProductList';

function CategoryPage({ products }) {
  const { category } = useParams();
  const { addToCart } = useCart();

  const filtered = products.filter(
    p => p.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <div>
      <h2>{category}</h2>
      <ProductList products={filtered} onAddToCart={addToCart} />
      {filtered.length === 0 && <p>No products here</p>}
    </div>
  );
}

export default CategoryPage;