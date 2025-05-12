import { useEffect, useState } from 'react';
import ProductList from './components/ProductList';

function App() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://fakestoreapi.com/products');
      const data = await res.json();
      setProducts(data);
      setFiltered(data);
      setError(null);
    } catch (err) {
      setError('Gagal memuat produk.');
    }
    setLoading(false);
  };

  useEffect(() => {
    const lower = query.toLowerCase();
    const result = products.filter(p =>
      p.title.toLowerCase().includes(lower) || p.description.toLowerCase().includes(lower)
    );
    setFiltered(result);
  }, [query]);

  return (
    <div className="app">
      <header>
        <h1>Fake Store</h1>
      </header>
      <div className="container">
        <input
          type="text"
          placeholder="Cari produk..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={fetchProducts}>Muat Ulang</button>
        {loading && <p>Memuat produk...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <ProductList products={filtered} />
      </div>
    </div>
  );
}

export default App;