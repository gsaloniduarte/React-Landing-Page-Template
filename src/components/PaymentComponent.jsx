import React from "react";
//import "./PaymentComponent.css";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

const PaymentComponent = () => {
  const navigate = useNavigate();

  const plans = [
    { 
      id: 1, 
      title: "10 Fotos", 
      price: 15, 
      originalPrice: 30, 
      description: "Ideal para poucas fotos",
      feature: [
        "10 estilos",
        "Sem marca d'água",
        "Entregue em segundos",
        "Pessoas ilimitadas",
        "Adequado para equipes",
      ]
    },
    { 
      id: 2, 
      title: "30 Fotos", 
      price: 25, 
      originalPrice: 50, 
      description: "Popular para redes sociais", 
      highlighted: true,
      feature: [
        "30 estilos",
        "Sem marca d'água",
        "Entregue em segundos",
        "Pessoas ilimitadas",
        "Adequado para equipes",
      ],
      badge: "76% escolhe esse plano",
    },
    { 
      id: 3, 
      title: "100 Fotos", 
      price: 45, 
      originalPrice: 90, 
      description: "Perfeito para grandes projetos",
      feature: [
        "+50 estilos",
        "Sem marca d'água",
        "Entregue em segundos",
        "Pessoas ilimitadas",
        "Adequado para equipes",
      ],
      badge: "Melhor valor"
    },
  ];

  const handlePlanClick = (planId) => {
    navigate(`/payment/${planId}`);
  };

  const features = [
    "xx estilos",
    "Sem marca d'água",
    "Entregue em segundos",
    "Pessoas ilimitadas",
    "Adequado para equipes",
  ];

  return (
    <div className="payment-component">
      <div className="client-banner">
        <p><strong>1,827,358</strong> fotos criadas para <strong>140,566 </strong> clientes </p>
      </div>
      <div className="discount-banner">
        <p>🔥 Aproveite! Todos os planos com <strong>50% de desconto</strong> por tempo limitado! 🔥</p>
      </div>
      <h2 className="title">Escolha seu plano</h2>
      <div className="plans-container">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`plan-card ${plan.highlighted ? "highlighted" : ""}`}
          >
            {plan.badge && <div className="plan-badge">{plan.badge}</div>}

            <h3 className="plan-title">{plan.title}</h3>
            <p className="plan-description">{plan.description}</p>
            <p className="plan-price">
              <span className="original-price">R$ {plan.originalPrice}</span> R$ {plan.price}
            </p>
            <ul className="features-list">
              {plan.feature.map((feature, index) => (
                <li key={index} className="feature-item">
                  <CheckCircleIcon className="feature-icon" /> {feature}
                </li>
              ))}
            </ul>
            <button
              className="buy-button"
              onClick={() => handlePlanClick(plan.id)}
            >
              Comprar {plan.title}
            </button>
          </div>
        ))}
        
      </div>
      <div className="garantia-banner">
        <WorkspacePremiumIcon style={{ fontSize: '100px', color: '#28a745' }} />
        <div>
          <p><strong>Garantia de devolução de dinheiro </strong> </p>
          <h4>Não se preocupe se nossa IA cometer um erro</h4>
        </div>
      </div>
    </div>
  );
};

export default PaymentComponent;
