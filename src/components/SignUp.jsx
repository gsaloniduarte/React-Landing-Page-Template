import React, { useState } from "react";
import { auth, googleProvider } from "../firebaseConfig";
import { signInWithPopup, sendSignInLinkToEmail } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom"; // Importe useNavigate
import { Google } from "@mui/icons-material";

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
      //setError(`Erro no cadastro: ${error.message}`);
      setError("Verifique se o e-mail está correto");

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
      <div className="access-container">
        <div   className={`access-card  `}   >
        
        <div className="section-access">
          <h2 className="access-title">Cadastre-se</h2>  
        </div>
        <div className="section-access">
          <button onClick={handleSignUpWithGoogle} className="access-button" >
            <div className='access-banner' >
              <Google  style={{ fontSize: '30px', margin:'10px' }} />
 
              <h1  style={{ fontSize: '30px', margin:'10px' }} >
              Cadastrar com Google 
              </h1>

            </div>
          </button>
        </div>
        <div className="section-access">
            <div className="flex gap-2 items-center">
              OU
            </div>
        </div>
        
        <div className="section-access">
           <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu e-mail"
          className="access-input"
        />
        {message && <p>{message}</p>}
        {error && <p>{error}</p>}
         </div>       
 

        <div className="section-access">
          <Link to="/reset-password" className="text-blue-900 hover:text-gray-200 transition duration-150 ease-in-out">Esqueceu a senha?</Link>
        </div>
        <div className="section-access">
          <div className="w-full px-3">
            <button onClick={handleSignUpWithEmail} className="access-button">Enviar link de confirmação</button>
          </div>
        </div>
      <div className="section-access">
        Possui acesso? <Link to="/login" className="text-blue-900 hover:text-gray-200 transition duration-150 ease-in-out">Fazer login</Link>
      </div>



 

        </div>
      </div>
    </div>
  </div>

  );
};

export default SignUp;
