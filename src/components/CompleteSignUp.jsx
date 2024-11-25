import React, { useEffect, useState } from "react";
import { auth } from "../firebaseConfig"; // Importa `auth` do seu arquivo de configuração
import { signInWithEmailLink } from "firebase/auth"; // Importa `signInWithEmailLink` diretamente

const CompleteSignUp = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const completeSignUp = async () => {
      const email = window.localStorage.getItem("emailForSignIn");
      if (!email) return;

      try {
        await signInWithEmailLink(auth, email, window.location.href);
        window.localStorage.removeItem("emailForSignIn");
        setMessage("Autenticação concluída com sucesso!");
      } catch (error) {
        setMessage(`Erro na autenticação: ${error.message}`);
      }
    };

    completeSignUp();
  }, []);

  return <div>{message}</div>;
};

export default CompleteSignUp;
