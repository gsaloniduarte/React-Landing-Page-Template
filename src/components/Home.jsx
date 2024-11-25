// src/components/Home.jsx

import { Link } from "react-router-dom";
import React from "react";
import { Header } from "./header";
import { Gallery } from "./gallery";
import { Testimonials } from "./testimonials";
import { Team } from "./Exemplos";
import { Contact } from "./contact";
import { Generate } from "./generate";
import { ExemplosReais } from "./ExemplosReais";
import { FAQ } from "./FAQ ";
import PaymentComponent from "./PaymentComponent";

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
        <ExemplosReais data={props.data} />
        <PaymentComponent/>
        {/* <Testimonials data={props.data.Testimonials} />
        <Team data={props.data.Team} /> */}
        <FAQ data={props.data.FAQ} image={props.data.FAQimg} Contact={props.data.Contact}/>
        {/* <Contact data={props.data.Contact} /> */}
 
    </div>
  );
}
export default Home; // Default export
