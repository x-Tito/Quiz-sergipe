import { User, Music, Settings } from 'lucide-react';
import './Navbar.css';

function Navbar({ playerName }) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Lado Esquerdo: Perfil */}
        <div className="nav-left">
          <div className="profile-circle">
            <User size={20} className="icon-user" />
          </div>
        </div>

        {/* Lado Direito: Nome e Ações */}
        <div className="nav-right">
          <span className="player-name">{playerName || "Jailson"}</span>
          
          <div className="nav-icons">
            <button className="icon-btn" title="Música">
              <Music size={22} />
            </button>
            <button className="icon-btn" title="Configurações">
              <Settings size={22} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;