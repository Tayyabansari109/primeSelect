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
  const [search, setSearch] = useState(""); // 🔥 search state
  const [category, setCategory] = useState("All"); // 🔥 category state

  const productsCollectionRef = collection(db, "products");

  // 🔥 First load
  const getProducts = async () => {
    setLoading(true);
    const q = query(productsCollectionRef, limit(9));
    const data = await getDocs(q);
    const productsData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setProducts(productsData);
    setLastDoc(data.docs[data.docs.length - 1]);
    setLoading(false);
  };

  // 🔥 Load more
  const loadMore = async () => {
    if (!lastDoc) return;
    setMoreLoading(true);
    const q = query(productsCollectionRef, startAfter(lastDoc), limit(9));
    const data = await getDocs(q);
    const newProducts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setProducts((prev) => [...prev, ...newProducts]);
    setLastDoc(data.docs[data.docs.length - 1]);
    setMoreLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return <h2 className="text-center" id="margin">Loading Products...</h2>;
  }

  // 🔥 Filter products by search and category
  const filteredProducts = products.filter((prod) => {
    const matchesCategory = category === "All" || prod.category === category;
    const matchesSearch = prod.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="home">
      <Hero />

      <div className="container mt-4 " id="products">

        {/* 🔥 Search + Category Filter */}
        <div className="row mb-4 justify-content-center align-items-center ">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control search-bar"

              placeholder="Search Products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              />
          </div>
          {/* <div className="col-md-6">
            <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            >
            <option value="All">All Categories</option>
            <option value="Health">Health</option>
            <option value="Tech">Tech</option>
            <option value="Fitness">Fitness</option>
            {/* Add more categories here */}
            {/* </select> */}
          {/* </div> */} 
        </div>
            <h2>Products</h2>

        <div className="row">
          {filteredProducts.map((prod) => (
            <div className="col-md-4 mb-4" key={prod.id}>
              <div className="card product-card">
                <img
                  src={prod.image}
                  className="card-img-top"
                  alt={prod.name}
                  loading="lazy"
                />
                <div className="card-body">
                  {/* <h5 className="card-title-custom">{prod.name}</h5> */}
                  <p className="card-desc">{prod.description}</p>
                  {/* <h6>${prod.price}</h6> */}
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

        {/* 🔥 Load More Button */}
        {lastDoc && (
          <div className="text-center mt-4">
            <button
              className="btn pink-btn"
              onClick={loadMore}
              disabled={moreLoading}
            >
              {moreLoading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;