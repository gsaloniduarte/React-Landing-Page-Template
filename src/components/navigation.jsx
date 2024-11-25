import React from "react";

export const Navigation = ({ isLoggedIn, setIsLoggedIn, onLogout }) => {
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
          <>
          {isLoggedIn ? (
            <button onClick={() => setIsLoggedIn(false)}>Log Out</button>
          ) : (
            <button onClick={() => setIsLoggedIn(true)}>Log In</button>
          )}
          </>
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">            
            {!isLoggedIn ? (
              <>
                <li>
                  <a href="/signup" className="page-scroll">
                    Entrar
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
                  <button onClick={() => setIsLoggedIn(false)} className="logout-button">
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
