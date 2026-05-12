import './Home.css';

function Home() {
  return (
    <div className="home-page">
      <div className="quiz-card">
        
        <h1 className="quiz-title">
          {/* QUIZ */}
          <span className="letter-green">Q</span>
          <span className="letter-orange">u</span>
          <span className="letter-blue">i</span>
          <span className="letter-red">z</span>
          <br />
          {/* SERGIPE */}
          <span className="letter-green">S</span>
          <span className="letter-orange">e</span>
          <span className="letter-blue">r</span>
          <span className="letter-red">g</span>
          <span className="letter-green">i</span>
          <span className="letter-orange">p</span>
          <span className="letter-blue">e</span>
        </h1>
        <a href="/Tela-Caranguejo.jsx">
          <button className="btn-iniciar">
          INICIAR 
        </button>
        </a>
       
      </div>
    </div>
  );
}

export default Home;