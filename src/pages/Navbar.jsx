import { Music, Music2 } from 'lucide-react';
import './Navbar.css';
import ProfileImg from "../Imagens/profile.jpeg";

function Navbar({ playerName, isMuted, toggleMusic }) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-left">
          <div className="profile-circle">
            <img src={ProfileImg} alt="Perfil" className="profile-img" />
          </div>
        </div>

        <div className="nav-right">
          <span className="player-name">{playerName || "Jailson"}</span>
          <div className="nav-icons">
            <button 
              className={`icon-btn ${!isMuted ? 'playing' : ''}`} 
              onClick={toggleMusic}
            >
              {isMuted ? <Music2 size={22} /> : <Music size={22} color="#2ecc71" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;