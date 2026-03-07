import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import Home from "./pages/Home";
import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 🔥 important for refresh

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <h2 className="text-center mt-5">Checking Authentication...</h2>;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/admin"
          element={user ? <AdminPanel /> : <AdminLogin />}
        />
        <Route path="/login" element={<AdminLogin />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;