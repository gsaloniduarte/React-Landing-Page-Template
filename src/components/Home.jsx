// src/components/Home.jsx

import { Link } from "react-router-dom";
import React from "react";
import { Header } from "./header";
import { Gallery } from "./gallery";
import { Testimonials } from "./testimonials";
import { Team } from "./Exemplos";
import { Contact } from "./contact";
import { Generate } from "./generate";

export const Home = (props) => {
  const headerData = {
    title: "Transforme selfies em Fotografias Profissionais",
    paragraph: "Obtenha suas fotos profissionais em segundos com nosso fotógrafo de IA. Carregue sua selfie e escolha o estilo que desejar.",
  };

  return (
    <div>
      {/* Seção do Cabeçalho */}
      <Header data={props.data.Header} />
      <Generate data={props.data}  />
      {/* <Gallery data={props.data.Gallery} /> */}
        {/* <Features data={landingPageData.Features} /> */}
        {/* <About data={landingPageData.About} /> */}
        {/* <Services data={landingPageData.Services} /> */}
        <Testimonials data={props.data.Testimonials} />
        <Team data={props.data.Team} />
        <Contact data={props.data.Contact} />
      {/* Seção de Galeria */}
      <section id="gallery" className="gallery-section">
        <h2>Estilos Populares</h2>
        <div className="gallery-grid">
          {["NAMORO", "FOTOS PROFISSIONAIS", "ESPORTES", "ANIVERSÁRIO", "VIAGEM", "CASAMENTO", "NATAL", "CULINÁRIA"].map(
            (style, index) => (
              <div key={index} className="gallery-item">
                <h3>{style}</h3>
                <button className="btn-select">Selecionar</button>
              </div>
            )
          )}
        </div>
      </section>

      {/* Seção de Exemplos */}
      <section id="examples" className="examples-section">
        <h2>Exemplos Reais</h2>
        <p>Todas as imagens abaixo foram geradas pela nossa IA. Nenhuma dessas são fotos reais.</p>
        <div className="examples-grid">
          {["Homem em roupa tradicional", "Mulher em cenário futurista", "Sessão de negócios urbanos", "Noiva em cenário clássico"].map(
            (example, index) => (
              <div key={index} className="example-item">
                <img src={`/images/example-${index + 1}.jpg`} alt={example} />
                <p>{example}</p>
              </div>
            )
          )}
        </div>
      </section>

      {/* Seção de Pacotes */}
      <section id="packages" className="packages-section">
        <h2>Pacotes de Fotos</h2>
        <div className="package-list">
          {[
            { title: "10 Fotos", price: "$15", description: "10 Estilos, Sem marca d'água, Pessoas ilimitadas" },
            { title: "30 Fotos", price: "$25", description: "20 Estilos, Sem marca d'água, Pessoas ilimitadas" },
            { title: "100 Fotos", price: "$45", description: "+30 Estilos, Sem marca d'água, Pessoas ilimitadas" },
          ].map((packageItem, index) => (
            <div key={index} className="package-item">
              <h3>{packageItem.title}</h3>
              <p>{packageItem.price}</p>
              <p>{packageItem.description}</p>
              <button className="btn-purchase">Comprar {packageItem.title}</button>
            </div>
          ))}
        </div>
      </section>

      {/* Seção de Perguntas Frequentes */}
      <section id="faq" className="faq-section">
        <h2>Perguntas Frequentes</h2>
        <div className="faq-list">
          {[
            "Quanto tempo levará para tirar uma foto com IA?",
            "Quanto tempo levará para criar meu personagem de IA?",
            "Como minhas fotos são tratadas após o processamento?",
            "Eu mantenho a propriedade das minhas fotos enviadas?",
            "Onde minhas fotos e dados são armazenados?",
          ].map((question, index) => (
            <div key={index} className="faq-item">
              <h4>{question}</h4>
              <p>Resposta para a pergunta: {question}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
export default Home; // Default export
