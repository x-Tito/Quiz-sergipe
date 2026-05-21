import { useMemo } from "react";
import "./Tela-Caranguejo.css";
import QuizPhase from "./QuizPhase.jsx";
import imgCaranguejo from "../Imagens/Personagens/PersCaranguejo.jpeg";
import fundoCaju from "../Imagens/FundoCaju.jpeg";
import fundoCaranguejo from "../Imagens/FundoCaranguejo.jpeg";
import fundoCordel from "../Imagens/FundoCordel.jpeg";
import fundoFogueira from "../Imagens/FundoFogueira.jpeg";
import fundoPapagaio from "../Imagens/FundoPapagaio.jpeg";
import { pickRandomBackground } from "../utils/backgrounds";

function TelaCaranguejo() {
  const backgroundImage = useMemo(() => {
    const fundos = [fundoCaju, fundoCaranguejo, fundoCordel, fundoFogueira, fundoPapagaio];
    return pickRandomBackground(fundos);
  }, []);

  return (
    <QuizPhase
      title="Fase do Caranguejo"
      pageClassName="caranguejo-page"
      pageStyle={{ backgroundImage: `url(${backgroundImage})` }}
      imageSrc={imgCaranguejo}
      imageAlt="Personagem Caranguejo"
      imageClassName="personagem-caranguejo"
      defaultTime={15}
      phaseIndex={2}
      phaseKey="caranguejo"
    />
  );
}

export default TelaCaranguejo;
