import { useEffect, useState } from 'react';
import ProductList from './components/ProductList';
import Login from './components/Login';

function App() {
  const [token, setToken] = useState(null);
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) fetchProducts();
  }, [token]);

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
        <h1>GO Store</h1>
      </header>

      <div className="container">
        {!token ? (
          <Login onLogin={setToken} />
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}

export default App;