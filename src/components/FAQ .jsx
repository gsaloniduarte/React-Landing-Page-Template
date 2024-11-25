import React, { useState } from "react";

export const FAQ = (props) => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setSelectedQuestion(selectedQuestion === index ? null : index);
  };
  console.log(props)

  return (
    <div className="faq-box">
       <h1 >Perguntas Frequentes</h1>
       {props.Contact ? (<p >Tem mais perguntas? Você pode escrever para nós em {props.Contact.email} </p> ) : (
       <p>Tem mais perguntas? Você pode escrever para nós em email@gmail.com </p>)}
       

      <div className="faq-container">
        <div className="faq-content">
          {/* Perguntas */}
          <div className="faq-questions">
            {props.data ? props.data.map((item, index) => (
                <div key={index} className="faq-item">
                  <button
                    className="faq-question"
                    onClick={() => toggleQuestion(index)}
                  >
                    {item.pergunta}
                  </button>
                  {selectedQuestion === index && (
                    <div className="faq-answer">{item.resposta}</div>
                  )}
                </div>
              )) : (
                <p>Carregando...</p>
              )}


            {/* {props.data.FAQ.map((item, index) => (
              <div key={index} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => toggleQuestion(index)}
                >
                  {item.pergunta}
                </button>
                {selectedQuestion === index && (
                  <div className="faq-answer">{item.resposta}</div>
                )}
              </div>
            ))} */}
          </div>
          {/* Imagem */}
          <div className="faq-image">


              {props.image ? ((
                <img
                src={props.image}
                alt="FAQ"
                className="faq-image-content"
              />
              )) : (
              <p>Carregando...</p>
            )}
          </div>
        </div>
      </div>
    </div>

  );
};
