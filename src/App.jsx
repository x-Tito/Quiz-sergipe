import { useState, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Importação dos seus componentes e páginas
import Navbar from "./pages/Navbar"; 
import Home from "./pages/Home";
import Fases from "./pages/Fases";
import TelaCaranguejo from "./pages/Tela-Caranguejo";
import TelaArara from "./pages/Tela-Arara";
import TelaCaju from "./pages/Tela-Caju";
import TelaCordel from "./pages/Tela-Cordel";
import TelaFogueira from "./pages/Tela-fogueira";
import ModalNome from "./pages/ModalNome";

// Áudio (Ajustado para evitar extensão duplicada caso dê erro)
import temaJogo from './assets/Audio/tema-jogo.mp3.mp3'; 
import Telafogueira from "./pages/Tela-fogueira";

function MainContent({ isMuted, toggleMusic, playerName }) {
  const location = useLocation();
  const mostrarNavbar = location.pathname === "/";

  return (
    <>
      {/* Passamos o nome do jogador para a Navbar exibir no topo */}
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
        
        {/* ROTAS DAS FASES TOTALMENTE CONFIGURADAS */}
        <Route path="/caranguejo" element={<TelaCaranguejo />} />
        <Route path="/arara" element={<TelaArara />} /> 
        <Route path="/Caju" element={<TelaCaju />} />
        <Route path="/Fogueira" element={<TelaFogueira />} />
        <Route path="/Cordel" element={<TelaCordel />} />
      </Routes>
    </>
  );
}

function App() {
  const [isMuted, setIsMuted] = useState(true);
  const [playerName, setPlayerName] = useState("Jogador");
  
  // Definimos como TRUE para o modal aparecer sempre no início
  const [mostrarModal, setMostrarModal] = useState(true); 
  
  const audioRef = useRef(new Audio(temaJogo));

  // Função chamada quando o usuário clica em "Começar Desafio" no Modal
  const handleConfirmarNome = (nome) => {
    setPlayerName(nome);
    setMostrarModal(false); // Fecha o modal
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    audio.loop = true;
    if (isMuted) {
      audio.play().catch(e => console.log("Erro áudio:", e));
      setIsMuted(false);
    } else {
      audio.pause();
      setIsMuted(true);
    }
  };

  return (
    <BrowserRouter>
      {/* O Modal precisa estar aqui para ser renderizado */}
      {mostrarModal && <ModalNome aoConfirmar={handleConfirmarNome} />}
      
      <MainContent 
        isMuted={isMuted} 
        toggleMusic={toggleMusic} 
        playerName={playerName} 
      />
    </BrowserRouter>
  );
}

export default App;