import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./pages/Navbar"; // Mudando de components para pages
import Home from "./pages/Home";
import Fases from "./pages/Fases";
import TelaCaranguejo from "./pages/Tela-Caranguejo";

// Criamos esse componente para a lógica funcionar
function MainContent() {
  const location = useLocation();
  
  // A Navbar só renderiza se o caminho for exatamente "/"
  const mostrarNavbar = location.pathname === "/";

  return (
    <>
      {mostrarNavbar && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Fases" element={<Fases />} />
        <Route path="/caranguejo" element={<TelaCaranguejo />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MainContent />
    </BrowserRouter>
  );
}

export default App;