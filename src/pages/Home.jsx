import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMedalLabel,
  getPhaseMeta,
  getProgress,
  resetProgress
} from "../utils/progress";
import "./Home.css";

const phaseOrder = ["saoJoao", "cordel", "caranguejo"];
const flameIcon = "\uD83D\uDD25";

function Home() {
  const navigate = useNavigate();

  const progress = useMemo(() => getProgress(), []);
  const phaseMeta = useMemo(() => getPhaseMeta(), []);
  const completedCount = phaseOrder.filter((phaseKey) => progress.phases[phaseKey]?.completed).length;

  function handleResetProgress() {
    resetProgress();
    window.location.reload();
  }

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

        <section className="progress-panel">
          <div className="progress-header">
            <div>
              <p className="progress-kicker">Desafio em andamento</p>
              <h2>Chamas da Sergipanidade</h2>
            </div>
            <div className="progress-badge">{completedCount}/3 fases</div>
          </div>

          <div className="flame-track" aria-label="Progresso das chamas">
            {phaseOrder.map((phaseKey) => (
              <div
                key={phaseKey}
                className={`flame-node ${progress.phases[phaseKey]?.completed ? "active" : ""}`}
              >
                {flameIcon}
              </div>
            ))}
          </div>

          <div className="medal-grid">
            {phaseOrder.map((phaseKey) => {
              const phase = progress.phases[phaseKey];
              const meta = phaseMeta[phaseKey];

              return (
                <article
                  key={phaseKey}
                  className={`medal-card ${phase.completed ? "done" : ""}`}
                >
                  <span className="medal-phase">{meta.nome}</span>
                  <strong className="medal-name">
                    {phase.completed ? getMedalLabel(phase.medalha) : "Bloqueada"}
                  </strong>
                  <span className="medal-score">
                    {phase.completed ? `${phase.acertos}/${phase.totalPerguntas} acertos` : "Conclua a fase para liberar"}
                  </span>
                </article>
              );
            })}
          </div>
        </section>

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
            className="btn-iniciar secondary"
            onClick={() => navigate("/mapa")}
          >
            Conheça Sergipe
          </button>
        </div>
      </div>

      <button
        className="btn-reset-floating"
        onClick={handleResetProgress}
      >
        Resetar progresso
      </button>
    </div>
  );
}

export default Home;
