import React from "react";

export const Team = (props) => {
  return (
    <div id="exemplos" className="text-center">
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>Estilos mais populares</h2>
          <p>
          Temos uma enorme variedade de estilos para escolher. Temos certeza que você encontrará o perfeito para você. Sem restrições, sem pacotes. Você escolhe o que você quer.

          </p>
        </div>
        <div id="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-3 col-sm-6 team">
                  <div className="thumbnail">
                    {" "}
                    <img src={d.img} alt="..." className="team-img" />
                    <div className="caption">
                      <h4>{d.name}</h4>
                      <p>{d.job}</p>
                    </div>
                  </div>
                </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};
