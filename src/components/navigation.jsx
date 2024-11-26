import React from "react";
import { UserAuth } from "../context/AuthContext";
import { auth } from '../firebaseConfig';
import { useNavigate } from "react-router-dom";


export const Navigation = ({ isLoggedIn, setIsLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const {  user,app } = UserAuth();
  console.log( user)
  if (user?.uid){
      setIsLoggedIn(true)
  }

  const signOut = () => {
    auth.signOut();
    setIsLoggedIn(false)
    navigate("/");
  };

  const signIn = () => {
    auth.signOut();
    navigate("/login");
  };

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="/">
            Estúdio de Fotos
          </a>{" "}

        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">            
            {!isLoggedIn ? (
              <>
                <li>
                  <a  className="page-scroll">
                    <button onClick={signIn}  >
                      Entrar
                    </button>
                  </a> 
                  
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href="/gerar" className="page-scroll">
                    Gerar
                  </a>
                </li>
                <li>
                  <a href="/minhas-imagens" className="page-scroll">
                    Minhas Imagens
                  </a>
                </li>
                <li>
                  <a href="/comprar" className="page-scroll">
                    Comprar Créditos
                  </a>
                </li>
                <li>
                  <button onClick={signOut} className="logout-button">
                    Sair
                  </button>
                </li>
              </>
              
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
