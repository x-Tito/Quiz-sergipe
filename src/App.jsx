import { useState, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import MapView from "./pages/MapView";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Fases from "./pages/Fases";
import TelaCaranguejo from "./pages/Tela-Caranguejo";
import TelaArara from "./pages/Tela-Arara";
import TelaCaju from "./pages/Tela-Caju";
import TelaCordel from "./pages/Tela-Cordel";
import TelaFogueira from "./pages/Tela-fogueira";
import ModalNome from "./pages/ModalNome";

import temaJogo from "./assets/Audio/tema-jogo.mp3.mp3";

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
        <Route path="/caranguejo" element={<TelaCaranguejo />} />
        <Route path="/arara" element={<TelaArara />} />
        <Route path="/caju" element={<TelaCaju />} />
        <Route path="/fogueira" element={<TelaFogueira />} />
        <Route path="/cordel" element={<TelaCordel />} />

        {/* SEU MAPA */}
        <Route path="/mapa" element={<MapView />} />
      </Routes>
    </>
  );
}

function App() {
  const [isMuted, setIsMuted] = useState(true);
  const [playerName, setPlayerName] = useState("Jogador");
  const [mostrarModal, setMostrarModal] = useState(true);

  const audioRef = useRef(new Audio(temaJogo));

  const handleConfirmarNome = (nome) => {
    setPlayerName(nome);
    setMostrarModal(false);
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    audio.loop = true;

    if (isMuted) {
      audio.play().catch(() => {});
      setIsMuted(false);
    } else {
      audio.pause();
      setIsMuted(true);
    }
  };

  return (
    <BrowserRouter>
      {mostrarModal && (
        <ModalNome aoConfirmar={handleConfirmarNome} />
      )}

      <MainContent
        isMuted={isMuted}
        toggleMusic={toggleMusic}
        playerName={playerName}
      />
    </BrowserRouter>
  );
}

export default App;
