function ProductList({ products }) {
  if (products.length === 0) return <p>Tidak ada produk ditemukan.</p>;

  return (
    <div className="product-grid">
      {products.map((p) => (
        <div className="product-card" key={p.id}>
          <img src={p.image} alt={p.title} />
          <h3>{p.title}</h3>
          <p>${p.price}</p>
          <p className="desc">{p.description.slice(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;