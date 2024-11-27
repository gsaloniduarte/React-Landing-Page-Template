import React from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { useState } from 'react';
function ResetPassword() {
  const { resetUserPassword, user } = UserAuth();
  const [loginEmail, setLoginEmail] = useState("");

  

  const resetPassword = async () => {
    /* console.log("email");
    console.log(loginEmail) */
    try {
      await resetUserPassword(loginEmail)
    } catch (error) {
      console.log(error);
    }
    
    console.log("Fim");

  };





 function changeEmail(event) {
  localStorage.setItem("email",event.target.value);
};

  return (

    <div id="portfolio" className="text-center">
    <div className="container">
      <div className="access-container">
        <div   className={`access-card  `}   >
        
        <div className="section-access">
          <h2 className="access-title">Esqueceu a senha?</h2>  
          <p  >Enviaremos um e-mail com sua nova senha.</p>
        </div>
        <div className="section-access">
          <input id="email" type="email" className="access-input" placeholder="Seu e-mail" onChange={(event) => {setLoginEmail(event.target.value);}} required />
        </div>       
 
        <div className="section-access">
          <div className="w-full px-3">
            <button onClick={resetPassword} className="access-button">Reset Senha</button>
          </div>
        </div>
      <div className="section-access">
        <Link to="/login" className="access-button">Cancelar</Link>
      </div>
        </div>
      </div>
    </div>
  </div>


  );
}

export default ResetPassword;