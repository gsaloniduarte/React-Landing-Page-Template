const express = require('express');
const stripe = require('stripe')('your-secret-key');  // Substitua pela sua chave secreta do Stripe
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Rota para criar uma sessão de checkout
app.post('/create-checkout-session', async (req, res) => {
  const { email } = req.body;

  try {
    // Cria a sessão de checkout no Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Pacote de Fotos',
            },
            unit_amount: 1500, // 15.00 USD
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      customer_email: email, // Passando o e-mail do cliente
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao criar sessão de checkout');
  }
});

// Iniciar o servidor
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
