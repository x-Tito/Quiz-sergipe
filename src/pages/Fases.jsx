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
          onClick={() =>
          navigate("/Fogueira", {
          state: { tempoInicial: 50 }
          })
          }
          >
              Fácil
          </button>
          
          <button className="btn-nivel medio"
          onClick={() =>
          navigate("/Cordel", {
          state: { tempoInicial: 30 }
          })
          } 
          >
            Médio
          </button>
          
          <button
            className="btn-nivel dificil"
            onClick={() =>
            navigate("/caranguejo", {
             state: { tempoInicial: 15 }
            })
            }     
            >
            Difícil
            </button>
        </div>
      </div>
    </div>
  );
}

export default Fases;