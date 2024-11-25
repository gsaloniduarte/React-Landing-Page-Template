import React, { useState } from "react";
import { auth, googleProvider } from "../firebaseConfig";
import { signInWithPopup, sendSignInLinkToEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Importe useNavigate

const SignUp = ({ setIsLogged }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Inicialize useNavigate

  // Configuração para o link de confirmação de cadastro
  const actionCodeSettings = {
    url: "http://localhost:3000/complete-signup", // Alterar para o URL de redirecionamento correto
    handleCodeInApp: true,
  };

  const handleSignUpWithEmail = async () => {
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignUp", email);
      setMessage("Link de confirmação de cadastro enviado! Verifique seu e-mail para continuar.");
    } catch (error) {
      setError(`Erro no cadastro: ${error.message}`);
    }
  };

  const handleSignUpWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Verifica se o usuário foi autenticado com sucesso
      if (user) {
        // Atualiza o estado de login para indicar que o usuário está logado
        setIsLogged(true);

        // Redireciona para a página de 'minhas-imagens'
        navigate("/minhas-imagens");
      }
    } catch (error) {
      setError(`Erro no login com Google: ${error.message}`);
    }
  };

  return (
    <div id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Cadastre-se</h2>
          <div className="row">
            <div className="portfolio-items">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu e-mail"
                />
                <button onClick={handleSignUpWithEmail}>Enviar link de confirmação</button>
                <button onClick={handleSignUpWithGoogle}>Cadastrar/Login com Google</button>
                {message && <p>{message}</p>}
                {error && <p>{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
