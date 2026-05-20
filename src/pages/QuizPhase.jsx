import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Volume2, VolumeX } from "lucide-react";

import ModalResultado from "./ModalResultado.jsx";
import somAcerto from "../assets/Audio/acerto.wav";
import somErro from "../assets/Audio/erro.mp3";
import fundoCaju from "../Imagens/FundoCaju.jpeg";
import fundoCaranguejo from "../Imagens/FundoCaranguejo.jpeg";
import fundoCordel from "../Imagens/FundoCordel.jpeg";
import fundoFogueira from "../Imagens/FundoFogueira.jpeg";
import fundoPapagaio from "../Imagens/FundoPapagaio.jpeg";
import {
  finalizarQuiz,
  iniciarQuiz,
  listarPerguntas,
  responderPergunta
} from "../services/quizApi";

const BACKGROUNDS = [
  fundoCaju,
  fundoCaranguejo,
  fundoCordel,
  fundoFogueira,
  fundoPapagaio
];

function sortearBackground() {
  const indice = Math.floor(Math.random() * BACKGROUNDS.length);
  return BACKGROUNDS[indice];
}

function QuizPhase({
  title,
  pageClassName,
  imageSrc,
  imageAlt,
  imageClassName,
  defaultTime = 30
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
  const [backgroundAtual] = useState(() => sortearBackground());

  const [quizId, setQuizId] = useState("");
  const [perguntas, setPerguntas] = useState([]);
  const [indicePergunta, setIndicePergunta] = useState(0);
  const [tempo, setTempo] = useState(tempoInicial);
  const [respostaSelecionadaId, setRespostaSelecionadaId] = useState(null);
  const [respostaCorreta, setRespostaCorreta] = useState(null);

  const [quizFinalizado, setQuizFinalizado] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);

  const finalizandoRef = useRef(false);
  const timeoutRespostaRef = useRef(null);

  const perguntaAtual = perguntas[indicePergunta] ?? null;

  const [perguntasRespondidas, setPerguntasRespondidas] = useState(0);

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
        setRespostaCorreta(null);
        setIndicePergunta(0);
        setAcertos(0);
        setErros(0);
        finalizandoRef.current = false;

        const quiz = await iniciarQuiz();
        const perguntasApi = await listarPerguntas(quiz.quizId);

        if (!ativo) {
          return;
        }

        setQuizId(quiz.quizId);
        setPerguntas(perguntasApi);
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

  async function concluirQuiz() {
    if (!quizId || finalizandoRef.current) {
      return;
    }

    finalizandoRef.current = true;

    try {
      const resultado = await finalizarQuiz(quizId);
      await finalizarQuiz(quizId);

      setQuizFinalizado(true);
      setPausado(true);
      setQuizFinalizado(true);
      setPausado(true);
    } catch (error) {
      setErroApi(error.message || "Nao foi possivel finalizar o quiz.");
    } finally {
      finalizandoRef.current = false;
    }
  }

  function avancarPergunta() {

  if (tempo <= 0) {
    concluirQuiz();
    return;
  }

  if (indicePergunta < perguntas.length - 1) {

    setIndicePergunta((indiceAtual) => indiceAtual + 1);

    setRespostaSelecionadaId(null);
    setRespostaCorreta(null);
    setTravado(false);

    return;
  }

  concluirQuiz();
}

  function tratarTempoEsgotado() {

  if (travado || quizFinalizado) {
    return;
  }

  concluirQuiz();
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

      setPerguntasRespondidas((valorAtual) => valorAtual + 1);

      timeoutRespostaRef.current = setTimeout(() => {
        avancarPergunta();
      }, 1200);
    } catch (error) {
      setErroApi(error.message || "Nao foi possivel enviar a resposta.");
      setTravado(false);
      setRespostaSelecionadaId(null);
      setRespostaCorreta(null);
    }
  }

  function reiniciarQuiz() {
    navigate("/fases");
  }

  const pageStyle = {
    backgroundImage: `url(${backgroundAtual})`
  };

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
                const classeResposta =
                  respostaSelecionadaId === alternativa.id
                  ? respostaCorreta === true
                  ? "correta"
                  : respostaCorreta === false
                  ? "errada"
                  : ""
                  : "";

                return (
                  <button
                    key={alternativa.id}
                    className={`alternativa-btn ${classeResposta}`}
                    onClick={() => verificarResposta(alternativa)}
                    disabled={travado}
                  >
                    {alternativa.letra}) {alternativa.texto}
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
          onHome={() => navigate("/")}
          onReiniciar={() => navigate("/fases")}
        />
      )}
    </div>
  );
}

export default QuizPhase;
