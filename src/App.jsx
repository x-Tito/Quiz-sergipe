import { useState, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";


import Navbar from "./pages/Navbar";
import MapView from "./pages/MapView";

import Home from "./pages/Home";
import Fases from "./pages/Fases";
import TelaCaranguejo from "./pages/Tela-Caranguejo";
import TelaArara from "./pages/Tela-Arara";
import TelaCaju from "./pages/Tela-Caju";
import TelaCordel from "./pages/Tela-Cordel";
import TelaFogueira from "./pages/Tela-fogueira";
import ModalNome from "./pages/ModalNome";

// Áudio do Jogo
import temaJogo from "./assets/Audio/tema-jogo.mp3.mp3";

const PLAYER_NAME_STORAGE_KEY = "quiz-sergipe-player-name";

function MainContent({ isMuted, toggleMusic, playerName }) {
  const location = useLocation();
  const mostrarNavbar = location.pathname === "/";

  return (
    <>
      {mostrarNavbar && (
        <Navbar
          playerName={playerName}
          isMuted={isMuted}
          toggleMusic={toggleMusic}
        />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fases" element={<Fases />} />
        
        {/* ROTAS DAS FASES CONFIGURADAS */}
        <Route path="/caranguejo" element={<TelaCaranguejo />} />
        <Route path="/arara" element={<TelaArara />} />
        <Route path="/caju" element={<TelaCaju />} />
        <Route path="/fogueira" element={<TelaFogueira />} />
        <Route path="/cordel" element={<TelaCordel />} />

        {/* MAPA */}
        <Route path="/mapa" element={<MapView />} />
      </Routes>
    </>
  );
}

function App() {
  const nomeSalvo =
    typeof window !== "undefined"
      ? window.localStorage.getItem(PLAYER_NAME_STORAGE_KEY)?.trim()
      : "";

  const [isMuted, setIsMuted] = useState(true);
  const [playerName, setPlayerName] = useState(nomeSalvo || "Jogador");
  const [mostrarModal, setMostrarModal] = useState(!nomeSalvo);

  const audioRef = useRef(new Audio(temaJogo));

  const handleConfirmarNome = (nome) => {
    setPlayerName(nome);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(PLAYER_NAME_STORAGE_KEY, nome);
    }
    setMostrarModal(false); // Fecha o modal
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    audio.loop = true;

    if (isMuted) {
      audio.play().catch((e) => console.log("Erro áudio:", e));
      setIsMuted(false);
    } else {
      audio.pause();
      setIsMuted(true);
    }
  };

  return (
    <>
      {mostrarModal && (
        <ModalNome aoConfirmar={handleConfirmarNome} />
      )}

      <MainContent
        isMuted={isMuted}
        toggleMusic={toggleMusic}
        playerName={playerName}
      />
    </>
  );
}

export default App;
