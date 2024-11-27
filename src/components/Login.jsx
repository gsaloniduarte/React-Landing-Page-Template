import React from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { Google } from '@mui/icons-material';



const Login = (props) => {
  const provider = new GoogleAuthProvider();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const { googleSignIn, commonSignIn, user} = UserAuth();
  const navigate = useNavigate();

  const handleCommonSignIn = async () => {
    try {
      await commonSignIn(loginEmail,loginPassword);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    if (user != null) {
      props.setIsLoggedIn(true)
      navigate("/minhas-imagens");
    }
  }, [user]);


  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      /* if (user) {
        goToAccount();
      } */
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  /* const goToAccount = () => {
    // Substituímos o roteamento do Next.js por redirecionamento direto
    window.location.href = "/account";
  }; */


  return (
      <div id="portfolio" className="text-center">
        <div className="container">
          <div className="access-container">
            <div   className={`access-card  `}   >
            
            <div className="section-access">
              <h2 className="access-title">Login</h2>  
            </div>
            <div className="section-access">
              
              <button onClick={signIn} className="access-button" >
                <div className='access-banner' >
                  <Google  style={{ fontSize: '30px', margin:'10px' }} />
                  <h1  style={{ fontSize: '30px', margin:'10px' }} >
                    Entrar com Google 
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
              <input onChange={(event) => {setLoginEmail(event.target.value);}} id="email" type="email" className="access-input" placeholder="Seu e-mail" required />
            </div>       
            <div className="section-access">
              <input onChange={(event) => {setLoginPassword(event.target.value);}}  id="password" type="password" className="access-input" placeholder="Senha (pelo menos 10 caracteres)" required />
            </div>
  
            <div className="section-access">
              <Link to="/reset-password" className="text-blue-900 hover:text-gray-200 transition duration-150 ease-in-out">Esqueceu a senha?</Link>
            </div>
            <div className="section-access">
              <div className="w-full px-3">
                <button onClick={handleCommonSignIn} className="access-button">Entrar</button>
              </div>
            </div>
          <div className="section-access">
            Não possui acesso? <Link to="/signup" className="text-blue-900 hover:text-gray-200 transition duration-150 ease-in-out">Cadastrar</Link>
          </div>




  
            </div>
          </div>
        </div>
      </div>


  );
}

export default Login;