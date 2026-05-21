import { useMemo } from "react";
import "./Tela-fogueira.css";
import QuizPhase from "./QuizPhase.jsx";
import imgFogueira from "../Imagens/Personagens/PersFogueira.jpeg";
import fundoCaju from "../Imagens/FundoCaju.jpeg";
import fundoCaranguejo from "../Imagens/FundoCaranguejo.jpeg";
import fundoCordel from "../Imagens/FundoCordel.jpeg";
import fundoFogueira from "../Imagens/FundoFogueira.jpeg";
import fundoPapagaio from "../Imagens/FundoPapagaio.jpeg";
import { pickRandomBackground } from "../utils/backgrounds";

function TelaFogueira() {
  const backgroundImage = useMemo(() => {
    const fundos = [fundoCaju, fundoCaranguejo, fundoCordel, fundoFogueira, fundoPapagaio];
    return pickRandomBackground(fundos);
  }, []);

  return (
    <QuizPhase
      title="Fase do São João"
      pageClassName="fogueira-page"
      pageStyle={{ backgroundImage: `url(${backgroundImage})` }}
      imageSrc={imgFogueira}
      imageAlt="Personagem Fogueira"
      imageClassName="personagem-fogueira"
      defaultTime={50}
      phaseIndex={0}
      phaseKey="saoJoao"
    />
  );
}

export default TelaFogueira;
