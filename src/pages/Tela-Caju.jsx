import "./Tela-Caju.css";
import QuizPhase from "./QuizPhase.jsx";
import imgCajuPersonagem from "../Imagens/Personagens/PersCaju.jpeg";

function TelaCaju() {
  return (
    <QuizPhase
      title="Fase do Caju"
      pageClassName="caju-page"
      imageSrc={imgCajuPersonagem}
      imageAlt="Personagem Caju"
      imageClassName="personagem-caju"
      defaultTime={25}
    />
  );
}

export default TelaCaju;
