import "./ModalResultado.css";

function ModalResultado({
  acertos,
  erros,
  medalha,
  onHome,
  onReiniciar
}) {
  return (
    <div className="modal-overlay">
      <div className="modal-resultado">
        <h2>Fim do Quiz!</h2>

        <p className="resultado-texto">
          Acertos:
          <span className="acertos"> {acertos}</span>
        </p>

        <p className="resultado-texto">
          Erros:
          <span className="erros"> {erros}</span>
        </p>

        {medalha && (
          <div className="medalha-box">
            <span className="medalha-label">Medalha conquistada</span>
            <strong className="medalha-valor">{medalha}</strong>
          </div>
        )}

        <div className="resultado-botoes">
          <button
            className="resultado-btn"
            onClick={onReiniciar}
          >
            Jogar novamente
          </button>

          <button
            className="resultado-btn"
            onClick={onHome}
          >
            Página inicial
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalResultado;
