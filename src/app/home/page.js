"use client";

import { useState } from "react";
import axios from "../../libs/axios.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setToken(null);

    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });

      setToken(response.data.token); // Menyimpan token jika login sukses
      setError(""); // Reset error jika berhasil
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error || "Something went wrong!");
      } else {
        setError("Unable to connect to the server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {token && <p>Login successful! Token: {token}</p>}
    </div>
  );
};

export default Login;
