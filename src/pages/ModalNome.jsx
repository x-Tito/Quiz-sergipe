import React, { useState } from "react";
import "./ModalNome.css";

function ModalNome({ aoConfirmar }) {
  const [nome, setNome] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    aoConfirmar(nome.trim() !== "" ? nome : "Jogador");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-titulo-personalizado">
          Bem-vindo ao <br />
          <span className="letter-green">Q</span>
          <span className="letter-orange">u</span>
          <span className="letter-blue">i</span>
          <span className="letter-red">z</span>
          <span> </span>
          <span className="letter-green">S</span>
          <span className="letter-orange">e</span>
          <span className="letter-blue">r</span>
          <span className="letter-red">g</span>
          <span className="letter-green">i</span>
          <span className="letter-orange">p</span>
          <span className="letter-blue">e</span>
        </h2>

        <p className="modal-subtitulo">Como devemos te chamar?</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="modal-input"
            placeholder="Digite seu nome..."
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            autoFocus
          />
          <button type="submit" className="btn-modal-iniciar">
            COMEÇAR DESAFIO
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalNome;
