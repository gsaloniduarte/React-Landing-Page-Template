// src/components/Payment.jsx

import React from "react";

const Payment = () => {
  const handlePayment = () => {
    // Aqui você adiciona a lógica para processar o pagamento.
    alert("Pagamento realizado com sucesso!");
  };

  return (
    <div className="payment-container">
      <h2>Pagamento</h2>
      <p>Escolha o seu plano para continuar criando imagens incríveis.</p>
      <div className="payment-summary">
        <h3>Plano Premium</h3>
        <p>R$ 29,90 / mês</p>
        <button onClick={handlePayment} className="btn btn-primary">
          Realizar Pagamento
        </button>
      </div>
    </div>
  );
};

export default Payment;
