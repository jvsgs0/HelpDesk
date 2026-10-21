import { useNavigate } from "react-router-dom";
import {
  Headset,
  UserRound,
  Wrench,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <header className="home-topbar">
        <div className="home-brand">
          <div className="home-logo">
            <Headset size={24} />
          </div>

          <span>
            Help<span>Desk</span>
          </span>
        </div>

        <div className="home-system-status">
          <span className="status-dot"></span>
          Sistema de suporte
        </div>
      </header>

      <main className="home-main">
        <section className="home-intro">
          <div className="home-badge">
            <ShieldCheck size={15} />
            CENTRAL DE ATENDIMENTO
          </div>

          <h1>
            Como podemos
            <span> ajudar você?</span>
          </h1>

          <p>
            Acesse a plataforma de acordo com seu perfil
            e encontre as ferramentas necessárias.
          </p>
        </section>

        <section className="home-access">
          <button
            className="home-access-card client-access"
            onClick={() => navigate("/cliente")}
          >
            <div className="home-card-top">
              <div className="home-access-icon">
                <UserRound size={27} />
              </div>

              <ArrowRight className="home-arrow" size={22} />
            </div>

            <div className="home-card-text">
              <span className="home-card-label">ÁREA DO USUÁRIO</span>
              <h2>Sou Cliente</h2>
              <p>
                Registre um problema e envie informações
                para nossa equipe de suporte.
              </p>
            </div>

            <div className="home-card-footer">
              Acessar área do cliente
              <ArrowRight size={16} />
            </div>
          </button>

          <button
            className="home-access-card tech-access"
            onClick={() => navigate("/Tech")}
          >
            <div className="home-card-top">
              <div className="home-access-icon">
                <Wrench size={27} />
              </div>

              <ArrowRight className="home-arrow" size={22} />
            </div>

            <div className="home-card-text">
              <span className="home-card-label">ÁREA TÉCNICA</span>
              <h2>Sou Técnico</h2>
              <p>
                Gerencie chamados, visualize os problemas
                recebidos e acompanhe as resoluções.
              </p>
            </div>

            <div className="home-card-footer">
              Acessar painel técnico
              <ArrowRight size={16} />
            </div>
          </button>
        </section>

        <footer className="home-footer">
          <span className="home-footer-line"></span>
          <p>SUPORTE SIMPLES. SOLUÇÕES EFICIENTES.</p>
          <span className="home-footer-line"></span>
        </footer>
      </main>

      <div className="home-background-glow"></div>
    </div>
  );
}