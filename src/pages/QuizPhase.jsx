import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Volume2, VolumeX } from "lucide-react";

import ModalResultado from "./ModalResultado.jsx";
import somAcerto from "../assets/Audio/acerto.wav";
import somErro from "../assets/Audio/erro.mp3";
import { getMedalLabel, savePhaseProgress } from "../utils/progress";
import {
  finalizarQuiz,
  iniciarQuiz,
  listarPerguntas,
  responderPergunta
} from "../services/quizApi";

const PERGUNTAS_POR_FASE = 10;
const flameIcon = "\uD83D\uDD25";
const letrasAlternativas = ["A", "B", "C", "D"];

function hashString(value) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return Math.abs(hash >>> 0);
}

function shuffleAlternatives(alternativas, quizId, perguntaId) {
  const resultado = [...alternativas];
  let seed = hashString(`${quizId}-${perguntaId}`);

  for (let index = resultado.length - 1; index > 0; index -= 1) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const randomIndex = seed % (index + 1);
    [resultado[index], resultado[randomIndex]] = [resultado[randomIndex], resultado[index]];
  }

  return resultado.map((alternativa, index) => ({
      ...alternativa,
      letraExibida: letrasAlternativas[index] ?? alternativa.letra
    }));
}

const chamasContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  marginBottom: "18px",
  padding: "16px 18px",
  borderRadius: "22px",
  background: "rgba(255, 248, 234, 0.96)",
  border: "2px solid #ebcfaa",
  boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.04)"
};

const chamasHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  flexWrap: "wrap"
};

const chamasTituloStyle = {
  margin: 0,
  fontFamily: "Fredoka, sans-serif",
  fontSize: "1.05rem",
  fontWeight: 700,
  color: "#1F3955"
};

const chamasTextoStyle = {
  margin: 0,
  fontFamily: "Fredoka, sans-serif",
  fontSize: "0.9rem",
  color: "#5a4633"
};

const chamasContadorStyle = {
  padding: "8px 12px",
  borderRadius: "14px",
  background: "#D56B2C",
  color: "#fff",
  fontFamily: "Fredoka, sans-serif",
  fontWeight: 700,
  fontSize: "0.9rem",
  boxShadow: "0 4px 0 #B35D10"
};

const chamasListaStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px"
};

const chamaBadgeStyle = {
  minWidth: "32px",
  height: "42px",
  padding: "0 8px",
  borderRadius: "999px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(180deg, #fff2b6 0%, #ffca58 32%, #ff8f2b 68%, #cb4d10 100%)",
  color: "#7a2400",
  fontFamily: "Fredoka, sans-serif",
  fontWeight: 700,
  fontSize: "1rem",
  boxShadow: "0 5px 0 rgba(157, 67, 12, 0.28)"
};

const chamaExtraStyle = {
  minWidth: "52px",
  height: "42px",
  padding: "0 10px",
  borderRadius: "999px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#1F3955",
  color: "#fff",
  fontFamily: "Fredoka, sans-serif",
  fontWeight: 700,
  fontSize: "0.9rem"
};

function QuizPhase({
  title,
  pageClassName,
  pageStyle,
  imageSrc,
  imageAlt,
  imageClassName,
  defaultTime = 30,
  phaseIndex = 0,
  phaseKey
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const tempoInicial = location.state?.tempoInicial || defaultTime;

  const [menuAberto, setMenuAberto] = useState(false);
  const [pausado, setPausado] = useState(false);
  const [somAtivo, setSomAtivo] = useState(true);
  const [travado, setTravado] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [erroApi, setErroApi] = useState("");

  const [quizId, setQuizId] = useState("");
  const [perguntasApi, setPerguntasApi] = useState([]);
  const [indicePergunta, setIndicePergunta] = useState(0);
  const [tempo, setTempo] = useState(tempoInicial);
  const [respostaSelecionadaId, setRespostaSelecionadaId] = useState(null);
  const [respostaCorreta, setRespostaCorreta] = useState(false);
  const [alternativaCorretaId, setAlternativaCorretaId] = useState(null);

  const [quizFinalizado, setQuizFinalizado] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  const [medalhaConquistada, setMedalhaConquistada] = useState("");

  const finalizandoRef = useRef(false);
  const timeoutRespostaRef = useRef(null);

  const perguntasDaFase = useMemo(() => {
    const inicio = phaseIndex * PERGUNTAS_POR_FASE;
    const fim = inicio + PERGUNTAS_POR_FASE;
    return perguntasApi.slice(inicio, fim).map((pergunta) => ({
      ...pergunta,
      alternativas: shuffleAlternatives(pergunta.alternativas, quizId, pergunta.id)
    }));
  }, [perguntasApi, phaseIndex, quizId]);

  const perguntaAtual = perguntasDaFase[indicePergunta] ?? null;
  const totalPerguntasFase = perguntasDaFase.length;
  const chamasExibidas = Math.min(acertos, 12);
  const chamasExtras = acertos - chamasExibidas;

  useEffect(() => {
    return () => {
      if (timeoutRespostaRef.current) {
        clearTimeout(timeoutRespostaRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let ativo = true;

    async function carregarQuiz() {
      try {
        setCarregando(true);
        setErroApi("");
        setQuizFinalizado(false);
        setMenuAberto(false);
        setPausado(false);
        setTravado(false);
        setRespostaSelecionadaId(null);
        setRespostaCorreta(false);
        setAlternativaCorretaId(null);
        setIndicePergunta(0);
        setAcertos(0);
        setErros(0);
        setMedalhaConquistada("");
        finalizandoRef.current = false;

        const quiz = await iniciarQuiz();
        const perguntas = await listarPerguntas(quiz.quizId);

        if (!ativo) {
          return;
        }

        setQuizId(quiz.quizId);
        setPerguntasApi(perguntas);
        setTempo(tempoInicial);
      } catch (error) {
        if (ativo) {
          setErroApi(error.message || "Nao foi possivel carregar o quiz.");
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarQuiz();

    return () => {
      ativo = false;
    };
  }, [tempoInicial]);

  useEffect(() => {
    if (carregando || pausado || travado || quizFinalizado || !perguntaAtual) {
      return undefined;
    }

    const timer = setInterval(() => {
      setTempo((tempoAtual) => {
        if (tempoAtual <= 1) {
          clearInterval(timer);
          tratarTempoEsgotado();
          return 0;
        }

        return tempoAtual - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [carregando, pausado, travado, quizFinalizado, perguntaAtual]);

  useEffect(() => {
    setTempo(tempoInicial);
  }, [indicePergunta, tempoInicial]);

  async function concluirQuiz() {
    if (!quizId || finalizandoRef.current) {
      return;
    }

    finalizandoRef.current = true;

    try {
      await finalizarQuiz(quizId);
      const progresso = savePhaseProgress(phaseKey, acertos, totalPerguntasFase);
      setMedalhaConquistada(getMedalLabel(progresso.medalha));
      setQuizFinalizado(true);
      setPausado(true);
    } catch (error) {
      setErroApi(error.message || "Nao foi possivel finalizar o quiz.");
    } finally {
      finalizandoRef.current = false;
    }
  }

  function avancarPergunta() {
    if (indicePergunta < perguntasDaFase.length - 1) {
      setIndicePergunta((indiceAtual) => indiceAtual + 1);
      setRespostaSelecionadaId(null);
      setRespostaCorreta(false);
      setAlternativaCorretaId(null);
      setTravado(false);
      return;
    }

    concluirQuiz();
  }

  function tratarTempoEsgotado() {
    if (travado || quizFinalizado) {
      return;
    }

    setErros((valorAtual) => valorAtual + 1);
    setTravado(true);

    timeoutRespostaRef.current = setTimeout(() => {
      avancarPergunta();
    }, 500);
  }

  async function verificarResposta(alternativa) {
    if (travado || !perguntaAtual) {
      return;
    }

    setTravado(true);
    setRespostaSelecionadaId(alternativa.id);

    try {
      const resultado = await responderPergunta({
        quizId,
        perguntaId: perguntaAtual.id,
        alternativaId: alternativa.id
      });

      setRespostaCorreta(resultado.acertou);
      setAlternativaCorretaId(resultado.alternativaCorreta?.id ?? null);

      if (resultado.acertou) {
        setAcertos((valorAtual) => valorAtual + 1);

        if (somAtivo) {
          new Audio(somAcerto).play().catch(() => {});
        }
      } else {
        setErros((valorAtual) => valorAtual + 1);

        if (somAtivo) {
          new Audio(somErro).play().catch(() => {});
        }
      }

      timeoutRespostaRef.current = setTimeout(() => {
        avancarPergunta();
      }, 1200);
    } catch (error) {
      setErroApi(error.message || "Nao foi possivel enviar a resposta.");
      setTravado(false);
      setRespostaSelecionadaId(null);
      setRespostaCorreta(false);
    }
  }

  function reiniciarQuiz() {
    window.location.reload();
  }

  return (
    <div className={pageClassName} style={pageStyle}>
      <button
        className="btn-voltar-topo"
        onClick={() => {
          setMenuAberto(true);
          setPausado(true);
        }}
      >
        Voltar
      </button>

      <div className="quiz-card">
        <div className="top-controls">
          <div className="timer-box">Tempo: {tempo}s</div>

          <button
            className={`sound-btn ${somAtivo ? "playing" : ""}`}
            onClick={() => setSomAtivo((valorAtual) => !valorAtual)}
          >
            {somAtivo ? <Volume2 size={22} color="#2ecc71" /> : <VolumeX size={22} />}
          </button>
        </div>

        <h1>{title}</h1>

        <section style={chamasContainerStyle} aria-label="Desafio das chamas">
          <div style={chamasHeaderStyle}>
            <div>
              <p style={chamasTituloStyle}>Desafio das Chamas</p>
              <p style={chamasTextoStyle}>Cada resposta certa acende uma nova chama da sua jornada.</p>
            </div>
            <div style={chamasContadorStyle}>Chamas: {acertos}</div>
          </div>

          <div style={chamasListaStyle}>
            {Array.from({ length: chamasExibidas }).map((_, indice) => (
              <div key={`chama-${indice}`} style={chamaBadgeStyle} aria-hidden="true">
                {flameIcon}
              </div>
            ))}
            {chamasExtras > 0 && <div style={chamaExtraStyle}>+{chamasExtras}</div>}
          </div>
        </section>

        {!carregando && !erroApi && totalPerguntasFase > 0 && (
          <div style={{ marginBottom: "18px", fontFamily: "Fredoka, sans-serif", color: "#1F3955", fontSize: "0.95rem" }}>
            Pergunta {indicePergunta + 1} de {totalPerguntasFase}
          </div>
        )}

        {carregando && (
          <div className="pergunta-box" style={{ marginBottom: "20px" }}>
            <h2>Carregando...</h2>
          </div>
        )}

        {!carregando && erroApi && (
          <div className="pergunta-box" style={{ marginBottom: "20px" }}>
            <h2>{erroApi}</h2>
          </div>
        )}

        {!carregando && !erroApi && totalPerguntasFase === 0 && (
          <div className="pergunta-box" style={{ marginBottom: "20px" }}>
            <h2>Nao ha perguntas suficientes para esta fase.</h2>
          </div>
        )}

        {!carregando && !erroApi && perguntaAtual && (
          <>
            <div className="pergunta-container">
              <img
                src={imageSrc}
                alt={imageAlt}
                className={imageClassName}
              />

              <div className="pergunta-box">
                <h2>{perguntaAtual.enunciado}</h2>
              </div>
            </div>

            <div className="alternativas-container">
              {perguntaAtual.alternativas.map((alternativa) => {
                let classeResposta = "";

                if (respostaSelecionadaId === alternativa.id) {
                  classeResposta = respostaCorreta ? "correta" : "errada";
                } else if (!respostaCorreta && alternativaCorretaId === alternativa.id) {
                  classeResposta = "reveal-correta";
                }

                return (
                  <button
                    key={alternativa.id}
                    className={`alternativa-btn ${classeResposta}`}
                    onClick={() => verificarResposta(alternativa)}
                    disabled={travado}
                  >
                    {alternativa.letraExibida}) {alternativa.texto}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {menuAberto && (
          <div className="modal-overlay">
            <div className="modal-pausa">
              <h2>Quiz Pausado</h2>

              <div className="modal-botoes">
                <button
                  className="modal-btn continuar"
                  onClick={() => {
                    setMenuAberto(false);
                    setPausado(false);
                  }}
                >
                  Continuar
                </button>

                <button
                  className="modal-btn reiniciar"
                  onClick={reiniciarQuiz}
                >
                  Reiniciar
                </button>

                <button
                  className="modal-btn home"
                  onClick={() => navigate("/")}
                >
                  Pagina Inicial
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {quizFinalizado && (
        <ModalResultado
          acertos={acertos}
          erros={erros}
          medalha={medalhaConquistada}
          onHome={() => navigate("/")}
          onReiniciar={() => navigate("/fases")}
        />
      )}
    </div>
  );
}

export default QuizPhase;
