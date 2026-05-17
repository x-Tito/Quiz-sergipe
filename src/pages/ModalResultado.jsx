import './ModalResultado.css';

function ModalResultado({
  acertos,
  erros,
  onHome,
  onReiniciar
}) {

  return (

    <div className="modal-overlay">

      <div className="modal-resultado">

        <h2>Fim do Quiz!</h2>

        <p className="resultado-texto">
          ✅ Acertos:
          <span className="acertos">
            {" "}{acertos}
          </span>
        </p>

        <p className="resultado-texto">
          ❌ Erros:
          <span className="erros">
            {" "}{erros}
          </span>
        </p>

        <div className="resultado-botoes">

          <button
            className="resultado-btn"
            onClick={onReiniciar}
          >
            Jogar Novamente
          </button>

          <button
            className="resultado-btn"
            onClick={onHome}
          >
            Página Inicial
          </button>

        </div>

      </div>

    </div>

  );

}

export default ModalResultado;