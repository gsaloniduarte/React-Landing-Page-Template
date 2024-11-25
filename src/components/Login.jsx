import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login realizado com sucesso!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div id="portfolio" className="text-center">
    <div className="container">
      <div className="section-title">
        <h2>Fazer Login</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
          dapibus leonec.
        </p>
      </div>
      <div className="row">
        <div className="portfolio-items">
          <div>
            <h2>Login</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
            />
            <button onClick={handleLogin}>Entrar</button>
            {error && <p>{error}</p>}
          </div>
          
        </div>
      </div>
    </div>
  </div>


  );
};

export default Login;
