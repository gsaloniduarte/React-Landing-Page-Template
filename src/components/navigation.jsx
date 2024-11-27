import React, { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

export const Navigation = ({ isLoggedIn, setIsLoggedIn }) => {
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user); // Define true se o usuário existir, senão false
      setLoading(false); // Define o carregamento como concluído
    });

    return () => unsubscribe(); // Limpa o listener ao desmontar
  }, [setIsLoggedIn]);

  const signOut = () => {
    auth.signOut();
    navigate("/");
  };

  const signIn = () => {
    navigate("/login");
  };

  if (loading) {
    return null; // Evita renderizar enquanto o estado de autenticação está sendo determinado
  }

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
                  <a className="page-scroll">
                    <button onClick={signIn}>Entrar</button>
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
                  <a className="page-scroll">
                    <button onClick={signOut}>Sair</button>
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
