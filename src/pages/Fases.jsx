import React from "react";
import { useNavigate } from "react-router-dom";
import "./Fases.css";

function Fases() {
  const navigate = useNavigate();

  return (
    <div className="container-fases">
      <button className="btn-voltar-topo" onClick={() => navigate("/")}>
        Voltar
      </button>

      <div className="card-fases">
        <h1>Escolha o Nível</h1>

        <div className="botoes-fases">
          <button
            className="btn-nivel facil"
            onClick={() =>
              navigate("/Fogueira", {
                state: { tempoInicial: 50 }
              })
            }
          >
            <span className="nivel-titulo">Fácil</span>
            <span className="nivel-fase">Fase São João</span>
          </button>

          <button
            className="btn-nivel medio"
            onClick={() =>
              navigate("/Cordel", {
                state: { tempoInicial: 30 }
              })
            }
          >
            <span className="nivel-titulo">Médio</span>
            <span className="nivel-fase">Fase Cordel</span>
          </button>

          <button
            className="btn-nivel dificil"
            onClick={() =>
              navigate("/caranguejo", {
                state: { tempoInicial: 15 }
              })
            }
          >
            <span className="nivel-titulo">Difícil</span>
            <span className="nivel-fase">Fase Caranguejo</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Fases;
