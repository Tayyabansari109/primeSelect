import { useState } from "react";
import "./AdminLogin.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful ✅");
    } catch (error) {
      alert("Login Failed ❌");
      console.log(error.message);
    }
  };

  return (
<div className="background">
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Admin Login</h2>
      <form  onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="form-control-1"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />
        <input
          type="password"
          placeholder="Password"
          className="form-control-1"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />
        <button type="submit" className="btn pink-btn">Login</button>
      </form>
      <h6 className="mt-5">If you want to login as Admin Please contact to E-mail: ta759777@gmail.ocm </h6>
    </div>
    </div>
  );
}

export default AdminLogin;