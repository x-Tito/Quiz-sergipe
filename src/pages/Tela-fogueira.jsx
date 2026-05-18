import "./Tela-fogueira.css";
import QuizPhase from "./QuizPhase.jsx";
import imgFogueira from "../Imagens/Personagens/PersFogueira.jpeg";

function TelaFogueira() {
  return (
    <QuizPhase
      title="Fase do São João"
      pageClassName="fogueira-page"
      imageSrc={imgFogueira}
      imageAlt="Personagem Fogueira"
      imageClassName="personagem-fogueira"
      defaultTime={50}
    />
  );
}

export default TelaFogueira;
