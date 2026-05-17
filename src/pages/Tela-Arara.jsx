import { useEffect, useState } from 'react';
import './Tela-Arara.css';
import { useNavigate, useLocation } from 'react-router-dom';
import ModalResultado from './ModalResultado.jsx';
import somAcerto from '../assets/Audio/acerto.wav';
import somErro from '../assets/Audio/erro.mp3';

import imgPapagaio from '../Imagens/Personagens/PersPapagaio.jpeg';

import { Volume2, VolumeX } from "lucide-react";

function TelaArara() {

  const navigate = useNavigate();
  const location = useLocation();

  const tempoInicial =
    location.state?.tempoInicial || 30;

  const [menuAberto, setMenuAberto] = useState(false);
  const [pausado, setPausado] = useState(false);

  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [travado, setTravado] = useState(false);

  const [somAtivo, setSomAtivo] = useState(true);

  const [indicePergunta, setIndicePergunta] = useState(0);
  const [tempo, setTempo] = useState(tempoInicial);

  const [quizFinalizado, setQuizFinalizado] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);

  const perguntas = [
    {
      pergunta: "Qual é a capital de Sergipe?",
      alternativas: [
        "Aracaju",
        "Salvador",
        "Recife",
        "Maceió"
      ],
      correta: "Aracaju"
    },

    {
      pergunta: "Qual comida é típica de Sergipe?",
      alternativas: [
        "Sushi",
        "Caranguejada",
        "Lasanha",
        "Taco"
      ],
      correta: "Caranguejada"
    }
  ];

  useEffect(() => {

    if (pausado) return;

    if (tempo === 0) {
      proximaPergunta();
      return;
    }

    const timer = setInterval(() => {
      setTempo((prevTempo) => prevTempo - 1);
    }, 1000);

    return () => clearInterval(timer);

  }, [tempo, pausado]);

  function proximaPergunta() {

    if (indicePergunta < perguntas.length - 1) {

      setIndicePergunta(indicePergunta + 1);

      setTempo(tempoInicial);

    } else {

      setQuizFinalizado(true);
      setPausado(true);

    }

  }

  function verificarResposta(alternativa) {

    if (travado) return;

    setRespostaSelecionada(alternativa);

    setTravado(true);

    const correta =
      perguntas[indicePergunta].correta;

    if (alternativa === correta) {
       
      setAcertos((prev) => prev + 1);
      const audioAcerto =
        new Audio(somAcerto);

      if (somAtivo) {

        audioAcerto.play().catch((erro) => {
          console.log(erro);
        });

      }

    } else {

      setErros((prev) => prev + 1);

      const audioErro =
        new Audio(somErro);

      if (somAtivo) {

        audioErro.play().catch((erro) => {
          console.log(erro);
        });

      }

    }

    setTimeout(() => {

      setRespostaSelecionada(null);

      setTravado(false);

      proximaPergunta();

    }, 1200);

  }

  return (

    <div className="arara-page">

      <button
        className="btn-voltar-topo"
        onClick={() => {

          setMenuAberto(true);

          setPausado(true);

        }}
      >
        ← Voltar
      </button>

      <div className="quiz-card">

        <div className="top-controls">

          <div className="timer-box">
            ⏳ {tempo}s
          </div>

          <button
            className={`sound-btn ${somAtivo ? 'playing' : ''}`}
            onClick={() => setSomAtivo(!somAtivo)}
          >

            {
              somAtivo
              ? <Volume2 size={22} color="#2ecc71" />
              : <VolumeX size={22} />
            }

          </button>

        </div>

        <h1>Fase da Arara</h1>

        <div className="pergunta-container">

          <img
            src={imgPapagaio}
            alt="Personagem Papagaio"
            className="personagem-papagaio"
          />

          <div className="pergunta-box">

            <h2>
              {perguntas[indicePergunta].pergunta}
            </h2>

          </div>

        </div>

        <div className="alternativas-container">

          {
            perguntas[indicePergunta].alternativas.map(
              (alternativa, index) => (

                <button
                  key={index}

                  className={`alternativa-btn

                  ${
                    respostaSelecionada === alternativa
                      ? alternativa === perguntas[indicePergunta].correta
                        ? "correta"
                        : "errada"
                      : ""
                  }

                  `}

                  onClick={() =>
                    verificarResposta(alternativa)
                  }

                  disabled={travado}
                >

                  {alternativa}

                </button>

              )
            )
          }

        </div>

        {
          menuAberto && (

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

                    onClick={() => {

                      setIndicePergunta(0);

                      setTempo(tempoInicial);

                      setAcertos(0);

                      setErros(0);

                      setQuizFinalizado(false);

                      setMenuAberto(false);

                      setPausado(false);

                    }}
                  >
                    Reiniciar
                  </button>

                  <button
                    className="modal-btn home"

                    onClick={() => {

                      setMenuAberto(false);

                      setPausado(false);

                      navigate("/");

                    }}
                  >
                    Página Inicial
                  </button>

                </div>

              </div>

            </div>

          )
        }

      </div>
        {
          quizFinalizado && (
          <ModalResultado
          acertos={acertos}
          erros={erros}
          onHome={() => navigate("/")}
          onReiniciar={() => navigate("/fases")}
    />
  )
}
    </div>

  );

}

export default TelaArara;