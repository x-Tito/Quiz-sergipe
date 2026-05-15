import React from "react";
import { useNavigate } from "react-router-dom";
import "./Fases.css";

function Fases() {
  const navigate = useNavigate();

  return (
    <div className="container-fases">
      {/* Botão de Voltar posicionado no canto superior esquerdo */}
      <button className="btn-voltar-topo" onClick={() => navigate("/")}>
        ← Voltar
      </button>

      <div className="card-fases">
        <h1>Escolha o Nível</h1>
        
        <div className="botoes-fases">
          <button 
            className="btn-nivel facil" 
            onClick={() => navigate("/caranguejo")}
          >
            Fácil
          </button>
          
          <button className="btn-nivel medio">
            Médio
          </button>
          
          <button className="btn-nivel dificil">
            Difícil
          </button>
        </div>
      </div>
    </div>
  );
}

export default Fases;