import "./Tela-Cordel.css";
import QuizPhase from "./QuizPhase.jsx";
import imgCordel from "../Imagens/Personagens/PersCordel.jpeg";

function TelaCordel() {
  return (
    <QuizPhase
      title="Fase do Cordel"
      pageClassName="cordel-page"
      imageSrc={imgCordel}
      imageAlt="Personagem Cordel"
      imageClassName="personagem-cordel"
      defaultTime={30}
    />
  );
}

export default TelaCordel;
