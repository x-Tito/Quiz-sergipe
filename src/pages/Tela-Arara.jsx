import "./Tela-Arara.css";
import QuizPhase from "./QuizPhase.jsx";
import imgPapagaio from "../Imagens/Personagens/PersPapagaio.jpeg";

function TelaArara() {
  return (
    <QuizPhase
      title="Fase da Arara"
      pageClassName="arara-page"
      imageSrc={imgPapagaio}
      imageAlt="Personagem Papagaio"
      imageClassName="personagem-papagaio"
      defaultTime={20}
    />
  );
}

export default TelaArara;
