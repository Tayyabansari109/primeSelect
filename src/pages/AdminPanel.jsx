import { useState, useEffect } from "react";
// import "./AdminPanel.scss";
import { db } from "../config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";

function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  // const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [affiliateLink, setAffiliateLink] = useState("");
  const [image, setImage] = useState("");
  const [editId, setEditId] = useState(null);

  const productsCollectionRef = collection(db, "products");

  // Fetch products
  const getProducts = async () => {
    const data = await getDocs(productsCollectionRef);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Add or Update product
  const handleAddOrUpdate = async () => {
    if (editId) {
      const productDoc = doc(db, "products", editId);
      await updateDoc(productDoc, {
        name,
        // price: Number(price),
        description,
        affiliateLink,
        image,
      });
      setEditId(null);
    } else {
      await addDoc(productsCollectionRef, {
        name,
        // price: Number(price),
        description,
        affiliateLink,
        image,
      });
    }
    setName(""); setDescription(""); setAffiliateLink(""); setImage("");
    getProducts();
  };

  // Edit product
  const handleEdit = (product) => {
    setEditId(product.id);
    setName(product.name);
    // setPrice(product.price);
    setDescription(product.description);
    setAffiliateLink(product.affiliateLink);
    setImage(product.image);
  };

  // Delete product
  const handleDelete = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
    getProducts();
  };

  return (
    <div className="container mt-4" id="set">
      <h2 id="top">Admin Panel</h2>

      <div className="mb-3">
        <input className="form-control mb-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        {/* <input className="form-control mb-2" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} /> */}
        <input className="form-control mb-2" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input className="form-control mb-2" placeholder="Affiliate Link" value={affiliateLink} onChange={(e) => setAffiliateLink(e.target.value)} />
        <input className="form-control mb-2" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
        <button className="btn pink-btn mb-3" onClick={handleAddOrUpdate}>{editId ? "Update Product" : "Add Product"}</button>
      </div>

<h3>Products List</h3>
<div className="table-responsive">
  <table className="table table-bordered">
    <thead>
      <tr>
        <th>Image</th>
        <th>Name</th>
        {/* <th>Price</th> */}
        <th>Description</th>
        <th>Affiliate Link</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {products.map((prod) => (
        <tr key={prod.id}>
          <td>
            {prod.image && (
              <img src={prod.image} alt={prod.name} style={{ width: "80px" }} />
            )}
          </td>
          <td>{prod.name}</td>
          {/* <td>${prod.price}</td> */}
          <td>{prod.description}</td>
          <td>
            <a href={prod.affiliateLink} target="_blank" rel="noreferrer">
              Link
            </a>
          </td>
          <td>
            <button
              className="btn btn-sm pink-btn me-2 mt-1"
              onClick={() => handleEdit(prod)}
            >
              Edit
            </button>
            <button
              className="btn btn-sm pink-btn mt-2"
              onClick={() => handleDelete(prod.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </div>
  );
}

export default AdminPanel;