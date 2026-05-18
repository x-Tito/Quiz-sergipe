import "./Tela-Caranguejo.css";
import QuizPhase from "./QuizPhase.jsx";
import imgCaranguejo from "../Imagens/Personagens/PersCaranguejo.jpeg";

function TelaCaranguejo() {
  return (
    <QuizPhase
      title="Fase do Caranguejo"
      pageClassName="caranguejo-page"
      imageSrc={imgCaranguejo}
      imageAlt="Personagem Caranguejo"
      imageClassName="personagem-caranguejo"
      defaultTime={15}
    />
  );
}

export default TelaCaranguejo;
