import React, { useState } from "react";
import { Image } from "./image";
import SearchIcon from '@mui/icons-material/Search';

export const ExemplosReais = (props) => {

  const [expandedImage, setExpandedImage] = useState(null); // Para armazenar a imagem expandida

  const handleImageClick = (image) => {
    setExpandedImage(image); // Define a imagem a ser expandida
  };

  const closeExpandedImage = () => {
    setExpandedImage(null); // Fecha a imagem expandida
  };

  return (
    <div id="exemplos" className="text-center">
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>O gerador de sessão fotográfica de IA mais realista</h2>
          <p>
          Sessões de fotos de IA que são indistinguíveis das fotos reais. Com uma enorme variedade de estilos para escolher. Perfeito para redes profissionais e todas as redes sociais.
          </p>
        </div>

      </div>
      <div className="container">
        <div className=" section-title">
          
    
            {props.data.exemplos
              ? props.data.exemplos.map((items, index) => (
                <>
                    <div className="row-container1">                        
                      <img title="aaaa" src={items.img} />
                      <img title="aaaa" src={items.arrow} />
                    </div>
                
                    <div className="row-container"  key={index}>


                        {items.images.map((item, i) => (
                          <div key={i} className="col-6-container col-md-2-container my-2">
                            <button
                              className="btn-image"
                              onClick={() => handleImageClick(item.largeimg)}
                            >
                              <div className="image-container">
                                <Image title="aaaa" smallImage={item.img} />
                                <div className="overlay">
                                  <SearchIcon className="icon-loupe"/>
                                  
                                 
                                </div>
                              </div>
                            </button>
                          </div>
                        ))}

                        {/* Modal para exibir a imagem expandida */}
                        {expandedImage && (
                          <div className="expanded-image-container">
                            <div className="expanded-image-overlay" onClick={closeExpandedImage}></div>
                            <div className="expanded-image">
                              <button className="close-button" onClick={closeExpandedImage}>
                                &times;
                              </button>
                              <img src={expandedImage} alt="Expanded" />
                            </div>
                          </div>
                        )}
                      </div>
                      </>
                ))
              : "loading"}
 


 

        </div>

      </div>

    </div>
  );
};
