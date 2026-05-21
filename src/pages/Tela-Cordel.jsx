import { useMemo } from "react";
import "./Tela-Cordel.css";
import QuizPhase from "./QuizPhase.jsx";
import imgCordel from "../Imagens/Personagens/PersCordel.jpeg";
import fundoCaju from "../Imagens/FundoCaju.jpeg";
import fundoCaranguejo from "../Imagens/FundoCaranguejo.jpeg";
import fundoCordel from "../Imagens/FundoCordel.jpeg";
import fundoFogueira from "../Imagens/FundoFogueira.jpeg";
import fundoPapagaio from "../Imagens/FundoPapagaio.jpeg";
import { pickRandomBackground } from "../utils/backgrounds";

function TelaCordel() {
  const backgroundImage = useMemo(() => {
    const fundos = [fundoCaju, fundoCaranguejo, fundoCordel, fundoFogueira, fundoPapagaio];
    return pickRandomBackground(fundos);
  }, []);

  return (
    <QuizPhase
      title="Fase do Cordel"
      pageClassName="cordel-page"
      pageStyle={{ backgroundImage: `url(${backgroundImage})` }}
      imageSrc={imgCordel}
      imageAlt="Personagem Cordel"
      imageClassName="personagem-cordel"
      defaultTime={30}
      phaseIndex={1}
      phaseKey="cordel"
    />
  );
}

export default TelaCordel;
