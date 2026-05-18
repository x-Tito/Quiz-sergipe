import React from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-card">
        <h1 className="quiz-title">
          <span className="letter-green">Q</span>
          <span className="letter-orange">u</span>
          <span className="letter-blue">i</span>
          <span className="letter-red">z</span>
          <br />
          <span className="letter-green">S</span>
          <span className="letter-orange">e</span>
          <span className="letter-blue">r</span>
          <span className="letter-red">g</span>
          <span className="letter-green">i</span>
          <span className="letter-orange">p</span>
          <span className="letter-blue">e</span>
        </h1>

        {/* Container para forçar a centralização e largura do botão */}
        <div className="btn-iniciar-container">
          <button 
            className="btn-iniciar"
            onClick={() => navigate("/Fases")}
          >
            Iniciar
          </button>
        </div>
        <div className="btn-iniciar-container">
          <button 
            className="btn-iniciar"
            onClick={() => navigate("/mapa")}
          >
            Mapa
          </button>
        </div>
      </div>
    </div>
  );
}
         

export default Home;