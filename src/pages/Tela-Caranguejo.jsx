import { useEffect, useState } from 'react';
import './Tela-Caranguejo.css';
import { useNavigate } from 'react-router-dom';

function TelaCaranguejo() {
  const navigate = useNavigate();
  const perguntas = [
    {
      pergunta: "Qual é a capital de Sergipe?",
      alternativas: [
        "Aracaju",
        "Salvador",
        "Recife",
        "Maceió"
      ]
    },
    {
      pergunta: "Qual comida é típica de Sergipe?",
      alternativas: [
        "Sushi",
        "Caranguejada",
        "Lasanha",
        "Taco"
      ]
    }
  ];

  const [indicePergunta, setIndicePergunta] = useState(0);
  const [tempo, setTempo] = useState(30);

  useEffect(() => {

    if (tempo === 0) {
      proximaPergunta();
      return;
    }

    const timer = setInterval(() => {
      setTempo((prevTempo) => prevTempo - 1);
    }, 1000);

    return () => clearInterval(timer);

  }, [tempo]);

  function proximaPergunta() {

    if (indicePergunta < perguntas.length - 1) {
      setIndicePergunta(indicePergunta + 1);
      setTempo(30);
    } else {
      alert("Fim do quiz!");
    }

  }

  return (
    <div className="caranguejo-page">

      <button className="btn-voltar-topo" onClick={() => navigate("/fases")}>
        ← Voltar
      </button>

      <div className="quiz-card">
          <div className="timer-box">
        ⏳ {tempo}s
          </div>

        <h1>Fase do Caranguejo</h1>

        <div className="pergunta-box">
          <h2>
            {perguntas[indicePergunta].pergunta}
          </h2>
        </div>

        <div className="alternativas-container">

          {perguntas[indicePergunta].alternativas.map(
            (alternativa, index) => (
              <button
                key={index}
                className="alternativa-btn"
              >
                {alternativa}
              </button>
            )
          )}

        </div>

      </div>
    </div>
  );
}

export default TelaCaranguejo;