// src/components/Payment.jsx
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements,useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

// Chave pública do Stripe
const stripePromise = loadStripe('pk_test_51QKOivJo2zcqfF2q4Vdu1qGrTFiaIQh5YaDNR2MUdNmsnoqlMYAroqt4yZ1ullMRFpzLPQxayRUQQOCIM718xTh700SnhCY6rO');  // Substitua pela sua chave pública

const Payment = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    // Chamar seu backend para criar uma sessão de pagamento com Stripe
    const response = await fetch('/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const session = await response.json();

    // Redireciona o usuário para o Stripe Checkout
    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) {
      console.error(error);
      setLoading(false);
    }
  };


  const handleCheckout = async (priceId) => {
    const stripe = await stripePromise;

    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: "price_1QP7fXJo2zcqfF2qEYuC81GW", // ID do preço do produto no Stripe
          quantity: 1,
        },
      ],
      mode: 'payment',
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/cancel`,
    });

    if (error) {
      console.error('Erro no Stripe Checkout:', error);
    }
  };




  return (
    <div className="payment-container">
      <h2>Pagamento</h2>
      <p>Escolha o seu plano para continuar criando imagens incríveis.</p>
      <div className="payment-summary">
        <h3>Plano Premium</h3>
        <p>R$ 29,90 / mês</p>
          <div className="payment-container">
              <h2>Pagamento</h2>
              <form onSubmit={handleSubmit}>
                <div className="email-input">
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                <button type="submit" disabled={loading || !email}>
                  {loading ? 'Processando...' : 'Pagar'}
                </button>
              </form>
            </div>
        {/* <button onClick={handlePayment} className="btn btn-primary">
          Realizar Pagamento
        </button> */}
      </div>

      <div className="payment-container">
      <h2>Escolha um plano</h2>
      <div className="plans">
        <div className="plan">
          <h3>10 Fotos</h3>
          <p>
            <s>$30.00</s> <strong>$15.00</strong>
          </p>
          <button onClick={() => handleCheckout('price_10_photos')}>Comprar</button>
        </div>
        <div className="plan highlighted">
          <h3>30 Fotos</h3>
          <p>
            <s>$50.00</s> <strong>$25.00</strong>
          </p>
          <button onClick={() => handleCheckout('price_30_photos')}>Comprar</button>
        </div>
        <div className="plan">
          <h3>100 Fotos</h3>
          <p>
            <s>$90.00</s> <strong>$45.00</strong>
          </p>
          <button onClick={() => handleCheckout('price_100_photos')}>Comprar</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Payment;
