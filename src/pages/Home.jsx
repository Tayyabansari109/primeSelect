import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import "./Home.scss";
import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
} from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import Hero from "../components/Hero";

function Home() {
  const [products, setProducts] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [moreLoading, setMoreLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const productsCollectionRef = collection(db, "products");

  // 🔥 Load initial products
  const getProducts = async () => {
    setLoading(true);
    try {
      const q = query(productsCollectionRef, limit(9));
      const data = await getDocs(q);
      const productsData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProducts(productsData);
      setLastDoc(data.docs[data.docs.length - 1] || null);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  // 🔥 Load more products (infinite scroll)
  const loadMore = async () => {
    if (!lastDoc || moreLoading) return;
    setMoreLoading(true);

    try {
      const q = query(productsCollectionRef, startAfter(lastDoc), limit(9));
      const data = await getDocs(q);
      const newProducts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      setProducts((prev) => {
        const allProducts = [...prev, ...newProducts];
        // Remove duplicates
        const uniqueProducts = allProducts.filter(
          (item, index, self) => index === self.findIndex((p) => p.id === item.id)
        );
        return uniqueProducts;
      });

      setLastDoc(data.docs[data.docs.length - 1] || null);
    } catch (error) {
      console.error("Error loading more products:", error);
    }

    setMoreLoading(false);
  };

  // 🔥 Infinite scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
        !moreLoading &&
        lastDoc
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastDoc, moreLoading]);

  // 🔥 Load products on mount
  useEffect(() => {
    getProducts();
  }, []);

  // 🔥 Filter products
  const filteredProducts = products.filter((prod) => {
    const matchesCategory = category === "All" || prod.category === category;
    const matchesSearch = prod.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return <h2 className="text-center" id="margin">Loading Products...</h2>;
  }

  return (
    <div className="home">
      <Hero />

      <div className="container mt-4" id="products">
        <div className="row mb-4 justify-content-center align-items-center">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control search-bar"
              placeholder="Search Products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <h2>Products</h2>

        <div className="row">
          {filteredProducts.map((prod) => (
            <div className="col-6 col-md-4 col-lg-3 mb-4" key={prod.id}>
              <div className="card product-card">
                <img
                  src={prod.image}
                  className="card-img-top"
                  alt={prod.name}
                  loading="lazy"
                />
                <div className="card-body">
                  <p className="card-desc">{prod.description}</p>
                  <a
                    href={prod.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn pink-btn"
                  >
                    See More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && !loading && (
          <p className="text-center">No products found.</p>
        )}

        {moreLoading && (
          <p className="text-center mt-3">Loading more products...</p>
        )}
      </div>
    </div>
  );
}

export default Home;