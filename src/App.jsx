import { useState } from "react";
import "./App.css";

const whatsappNumber = "5511942754326";
const whatsappUrl = `https://wa.me/${whatsappNumber}`;
const instagramUrl = "https://www.instagram.com/ajudoncontabilidade/";
const siteUrl = "https://ajudon.com.br/";
const emailAddress = "atendimento@ajudon.com.br";

const services = [
  {
    number: "01",
    icon: "⌘",
    title: "Contabilidade para tecnologia",
    description:
      "Apoio contábil para desenvolvedores, designers e profissionais de tecnologia que trabalham por conta própria ou para empresas.",
  },
  {
    number: "02",
    icon: "↗",
    title: "Abertura de empresa",
    description:
      "Orientação para formalizar seu negócio e entender os próximos passos para começar a empreender.",
  },
  {
    number: "03",
    icon: "▤",
    title: "Gestão contábil",
    description:
      "Suporte para manter as obrigações fiscais e contábeis da empresa organizadas ao longo do ano.",
  },
  {
    number: "04",
    icon: "＋",
    title: "Planejamento tributário",
    description:
      "Análise do enquadramento e das possibilidades tributárias para buscar uma gestão mais eficiente.",
  },
  {
    number: "05",
    icon: "▧",
    title: "Emissão de notas fiscais",
    description:
      "Orientação para emitir notas fiscais e compreender os processos envolvidos na rotina da empresa.",
  },
  {
    number: "06",
    icon: "✓",
    title: "Ajudon Express",
    description:
      "Serviços pontuais, como abertura, alteração, encerramento, regularização e emissão de certidões.",
  },
];

const expressServices = [
  "Abertura, alteração e encerramento de empresas",
  "Regularização cadastral",
  "Emissão de certidões",
  "Inscrição estadual",
  "Consultas e pesquisas cadastrais",
  "Serviços por demanda, sem mensalidade contábil",
];

const faqs = [
  {
    question: "A Ajudon atende somente profissionais de tecnologia?",
    answer:
      "A Ajudon tem foco em profissionais e empresas de tecnologia. Também oferece serviços para micro e pequenas empresas e prestadores de serviços. Consulte a equipe para confirmar se sua atividade pode ser atendida.",
  },
  {
    question: "Posso contratar apenas um serviço?",
    answer:
      "Sim. A Ajudon Express reúne serviços pontuais, sem necessidade de contratar uma mensalidade contábil. A equipe pode confirmar a disponibilidade e os detalhes do serviço desejado.",
  },
  {
    question: "O atendimento é online?",
    answer:
      "A proposta da Ajudon é oferecer atendimento digital, com suporte humano. Entre em contato para entender como funciona o atendimento para o seu caso.",
  },
  {
    question: "A Ajudon atende empresas de outros estados?",
    answer:
      "A disponibilidade pode variar conforme o estado e o serviço. Entre em contato para confirmar se a equipe consegue atender sua empresa.",
  },
];

function Arrow() {
  return (
    <span aria-hidden="true" className="arrow">
      <svg viewBox="0 0 20 20" focusable="false">
        <path d="M5 15L15 5" />
        <path d="M8 5H15V12" />
      </svg>
    </span>
  );
}
function FlyingBot() {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      from: "bot",
      text:
        "Olá! Sou a Assistente Virtual da Ajudon. Posso ajudar com contabilidade para tecnologia, Ajudon Express ou serviços paralegais.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const suggestions = [
    "Quero abrir uma empresa",
    "Sou profissional de tecnologia",
    "Preciso alterar meu contrato social",
    "Quero conhecer a Ajudon Express",
  ];

  async function sendMessage(text) {
    const question = text.trim();

    if (!question || loading) return;

    const userMessage = {
      from: "user",
      text: question,
    };

    setMessages((current) => [...current, userMessage]);
    setLoading(true);

    try {
      const history = [
        ...messages.map((message) => ({
          role: message.from === "user" ? "user" : "assistant",
          content: message.text,
        })),
        {
          role: "user",
          content: question,
        },
      ];

      const response = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: history,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao consultar a IA.");
      }

      setMessages((current) => [
        ...current,
        {
          from: "bot",
          text: data.reply,
        },
      ]);
    } catch (error) {
      console.error("Erro no assistente:", error);

      setMessages((current) => [
        ...current,
        {
          from: "bot",
          text:
            "Tive um problema para me conectar agora. Verifique se o assistente da Ajudon está ativo ou continue seu atendimento pelo WhatsApp.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function openWhatsApp() {
    const message =
      "Olá! Estou no site da Ajudon e gostaria de continuar meu atendimento com a equipe.";

    window.open(
      `${whatsappUrl}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    const input = event.currentTarget.elements.message;
    const value = input.value;

    if (!value.trim()) return;

    input.value = "";
    sendMessage(value);
  }

  return (
    <div className="ajudon-assistant">
      {isOpen && (
        <section
          className="assistant-panel"
          aria-label="Assistente virtual da Ajudon"
        >
          <header className="assistant-header">
            <div className="assistant-avatar" aria-hidden="true">
              a.
            </div>

            <div className="assistant-heading">
              <strong>Assistente Ajudon</strong>
              <span>
                <i /> {loading ? "Pensando..." : "Online"}
              </span>
            </div>

            <button
              className="assistant-close"
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Fechar assistente"
            >
              ×
            </button>
          </header>

          <div className="assistant-messages" aria-live="polite">
            {messages.map((message, index) => (
              <div
                className={`assistant-message ${message.from}`}
                key={`${index}-${message.from}`}
              >
                {message.text}
              </div>
            ))}

            {loading && (
              <div className="assistant-message bot assistant-loading">
                <span />
                <span />
                <span />
              </div>
            )}

            {!loading && messages.length === 1 && (
              <div className="assistant-actions">
                {suggestions.map((suggestion) => (
                  <button
                    type="button"
                    key={suggestion}
                    onClick={() => sendMessage(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form className="assistant-compose" onSubmit={handleSubmit}>
            <input
              name="message"
              aria-label="Digite sua dúvida"
              placeholder={
                loading
                  ? "A Ajudon está pensando..."
                  : "Digite sua dúvida..."
              }
              autoComplete="off"
              disabled={loading}
            />

            <button
              type="submit"
              aria-label="Enviar mensagem"
              disabled={loading}
            >
              ↑
            </button>
          </form>

          <button
            className="assistant-whatsapp"
            type="button"
            onClick={openWhatsApp}
          >
            Continuar no WhatsApp <Arrow />
          </button>
        </section>
      )}

      <button
        type="button"
        className={`flying-bot ${isOpen ? "is-open" : ""}`}
        onClick={() => setIsOpen((open) => !open)}
        aria-label={
          isOpen
            ? "Fechar assistente Ajudon"
            : "Abrir assistente Ajudon"
        }
        aria-expanded={isOpen}
        title="Posso ajudar?"
      >
        <img src="/bot-ajudon.png" alt="" />

        {!isOpen && (
          <span className="bot-message">
            Posso ajudar?
          </span>
        )}
      </button>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [welcomeOpen, setWelcomeOpen] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  function closeMenu() {
    setMenuOpen(false);
  }

  function updateForm(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function openWhatsApp(message) {
    const url = `${whatsappUrl}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const message =
      `Olá, Ajudon! Vim pelo site e gostaria de atendimento.\n\n` +
      `Nome: ${form.name}\n` +
      `E-mail: ${form.email}\n` +
      `WhatsApp: ${form.phone || "Não informado"}\n` +
      `Assunto: ${form.service || "Informações gerais"}\n\n` +
      `Mensagem: ${form.message}`;

    openWhatsApp(message);
  }

  function handleContactClick() {
    openWhatsApp(
      "Olá! Acessei o site da Ajudon e gostaria de conversar com a equipe."
    );
  }

  async function shareSite() {
    const shareData = {
      title: "Ajudon | Contabilidade digital",
      text: "Conheça a Ajudon: contabilidade digital e serviços para sua empresa.",
      url: siteUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(siteUrl);
        alert("Link do site copiado!");
      } else {
        window.prompt("Copie o link do site:", siteUrl);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        window.prompt("Copie o link do site:", siteUrl);
      }
    }
  }

  return (
    <>
      {welcomeOpen && (
        <div className="welcome-overlay" role="dialog" aria-modal="true" aria-label="Mensagem de boas-vindas">
          <div className="welcome-modal">
            <button
              className="welcome-close"
              type="button"
              onClick={() => setWelcomeOpen(false)}
              aria-label="Fechar mensagem"
            >
              ×
            </button>

            <span className="welcome-eyebrow">
              <i /> AJUDON
            </span>

            <h2>
              Olá! <span>👋</span>
            </h2>

            <p>
              Bem-vindo à Ajudon. Como podemos ajudar sua empresa hoje?
            </p>

            <div className="welcome-actions">
              <button
                type="button"
                className="welcome-primary"
                onClick={() => {
                  setWelcomeOpen(false);
                  handleContactClick();
                }}
              >
                Falar com a Ajudon <Arrow />
              </button>

              <button
                type="button"
                className="welcome-secondary"
                onClick={() => setWelcomeOpen(false)}
              >
                Agora não
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* =========================
           BOAS-VINDAS
        ========================= */
        .welcome-overlay {
          position: fixed;
          inset: 0;
          z-index: 5000;
          display: grid;
          place-items: center;
          padding: 24px;
          background: rgba(2, 9, 17, 0.74);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          animation: welcomeOverlayIn 220ms ease forwards;
        }

        .welcome-modal {
          position: relative;
          width: min(100%, 430px);
          padding: 38px;
          border: 1px solid rgba(72, 217, 244, 0.22);
          border-radius: 22px;
          background:
            radial-gradient(circle at 100% 0%, rgba(72, 217, 244, 0.10), transparent 38%),
            #07111f;
          box-shadow:
            0 30px 100px rgba(0, 0, 0, 0.55),
            0 0 50px rgba(72, 217, 244, 0.08);
          color: #fff;
          animation: welcomeModalIn 350ms cubic-bezier(.2,.8,.2,1);
        }

        .welcome-close {
          position: absolute;
          top: 14px;
          right: 16px;
          width: 34px;
          height: 34px;
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 50%;
          background: rgba(255,255,255,.04);
          color: #fff;
          font-size: 22px;
          line-height: 1;
          cursor: pointer;
          transition: .2s ease;
        }

        .welcome-close:hover {
          background: rgba(255,255,255,.09);
          transform: rotate(90deg);
        }

        .welcome-eyebrow {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 18px;
          color: #48d9f4;
          font-family: "DM Mono", monospace;
          font-size: 11px;
          letter-spacing: .14em;
        }

        .welcome-eyebrow i {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #48d9f4;
          box-shadow: 0 0 14px #48d9f4;
        }

        .welcome-modal h2 {
          margin: 0 0 12px;
          font-size: clamp(34px, 6vw, 46px);
          line-height: .95;
          letter-spacing: -.05em;
        }

        .welcome-modal h2 span {
          font-size: .75em;
        }

        .welcome-modal p {
          max-width: 340px;
          margin: 0 0 28px;
          color: #91a6bb;
          font-size: 15px;
          line-height: 1.65;
        }

        .welcome-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .welcome-primary {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          width: 100%;
          min-height: 50px;
          border: 0;
          border-radius: 12px;
          background: #48d9f4;
          color: #04101b;
          font-weight: 800;
          cursor: pointer;
          transition: transform .2s ease, box-shadow .2s ease;
        }

        .welcome-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(72, 217, 244, .22);
        }

        .welcome-primary .arrow {
          display: inline-flex;
        }

        .welcome-secondary {
          min-height: 44px;
          border: 0;
          background: transparent;
          color: #7f94aa;
          cursor: pointer;
          transition: color .2s ease;
        }

        .welcome-secondary:hover {
          color: #fff;
        }

        @keyframes welcomeOverlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes welcomeModalIn {
          from {
            opacity: 0;
            transform: translateY(18px) scale(.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* =========================
           LETREIRO INFINITO
        ========================= */
        .trust-strip {
          width: 100%;
          overflow: hidden;
        }

        .ticker-track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: ajudonTicker 30s linear infinite;
        }

        .ticker-group {
          display: flex;
          flex: 0 0 auto;
          align-items: center;
          gap: 30px;
          padding-right: 30px;
          white-space: nowrap;
        }

        .ticker-group span {
          white-space: nowrap;
        }

        .ticker-group i {
          flex: 0 0 auto;
        }

        @keyframes ajudonTicker {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @media (max-width: 600px) {
          .welcome-modal {
            padding: 32px 24px 26px;
            border-radius: 18px;
          }

          .ticker-group {
            gap: 20px;
            padding-right: 20px;
          }

          .ticker-track {
            animation-duration: 24s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .welcome-overlay,
          .welcome-modal {
            animation: none;
          }

          .ticker-track {
            animation-duration: 90s;
          }
        }
      `}</style>

      <header className="site-header">
        <nav className="nav container" aria-label="Navegação principal">
          <a className="brand" href="#inicio" onClick={closeMenu}>
            ajudon<span>.</span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "×" : "☰"}
          </button>

          <div className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
            <a href="#inicio" onClick={closeMenu}>
              Início
            </a>
            <a href="#solucoes" onClick={closeMenu}>
              Soluções
            </a>
            <a href="#express" onClick={closeMenu}>
              Ajudon Express
            </a>
            <a href="#sobre" onClick={closeMenu}>
              Sobre
            </a>
            <a className="nav-contact" href="#contato" onClick={closeMenu}>
              Fale com a Ajudon <Arrow />
            </a>
          </div>
        </nav>
      </header>

      <FlyingBot />
      <a
        className="whatsapp-float"
        href={`${whatsappUrl}?text=${encodeURIComponent("Olá! Vim pelo site da Ajudon e gostaria de atendimento.")}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com a Ajudon pelo WhatsApp"
        title="Falar com a Ajudon pelo WhatsApp"
      >
        <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
          <path d="M16 3.2A12.6 12.6 0 0 0 5.2 22.3L3.5 28.8l6.7-1.7A12.6 12.6 0 1 0 16 3.2Zm0 22.9a10.2 10.2 0 0 1-5.2-1.4l-.4-.2-3.9 1 1-3.8-.3-.4A10.2 10.2 0 1 1 16 26.1Zm5.6-7.6c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.3 8.3 0 0 1-2.5-1.5 9.3 9.3 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.7l.5-.5.3-.5c.1-.2 0-.4 0-.6s-.7-1.8-1-2.5c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4s-1.2 1.2-1.2 2.8 1.2 3.2 1.4 3.4a13.1 13.1 0 0 0 5 4.4c.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.9-.8 2.2-1.5s.3-1.3.2-1.5-.2-.3-.5-.4Z" />
        </svg>
      </a>



      <main>
        <section className="hero" id="inicio">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                CONTABILIDADE DIGITAL E HUMANA
              </div>

              <h1>
                Você cuida das suas ideias.
                <span> A gente cuida da sua empresa.</span>
              </h1>

              <p className="hero-description">
                Contabilidade e serviços para quem empreende — com soluções
                digitais, orientação especializada e atendimento próximo.
              </p>

              <div className="hero-actions">
                <a className="button button-primary" href="#contato">
                  Vamos conversar <Arrow />
                </a>
                <a className="button button-secondary" href="#solucoes">
                  Conheça as soluções
                </a>
              </div>

              <div className="hero-points">
                <span>
                  <b>✓</b> Suporte próximo
                </span>
                <span>
                  <b>✓</b> Soluções online
                </span>
              </div>
            </div>

            <div
              className="hero-art"
              aria-label="Ilustração de organização contábil"
            >
              <div className="art-orbit orbit-a" />
              <div className="art-orbit orbit-b" />

              <div className="art-window">
                <div className="window-bar">
                  <div className="window-dots">
                    <i />
                    <i />
                    <i />
                  </div>
                  <span>ajudon.</span>
                </div>

                <div className="window-content">
                  <span className="art-label">MAIS TEMPO PARA VOCÊ</span>
                  <h3 className="art-heading">Seu negócio em boas mãos.</h3>
                  <p className="art-description">
                    Organização e orientação para você seguir em frente.
                  </p>

                  <div className="art-status">
                    <span className="status-check">✓</span>
                    <strong>Conte com a Ajudon</strong>
                  </div>
                </div>
              </div>

              <div className="floating-note note-top">
                <span className="note-symbol">↗</span>
                <div>
                  <strong>Seu negócio</strong>
                  <small>em movimento</small>
                </div>
              </div>

              <div className="floating-note note-bottom">
                <span className="note-symbol note-green">✓</span>
                <div>
                  <strong>Mais tranquilidade</strong>
                  <small>na rotina da empresa</small>
                </div>
              </div>

              <div className="art-spark spark-one">✳</div>
              <div className="art-spark spark-two">✦</div>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Diferenciais da Ajudon">
          <div className="ticker-track">
            <div className="ticker-group">
              <span>CONTABILIDADE</span>
              <i>✳</i>
              <span>TECNOLOGIA</span>
              <i>✳</i>
              <span>ATENDIMENTO HUMANO</span>
              <i>✳</i>
              <span>SOLUÇÕES DIGITAIS</span>
              <i>✳</i>
            </div>

            <div className="ticker-group" aria-hidden="true">
              <span>CONTABILIDADE</span>
              <i>✳</i>
              <span>TECNOLOGIA</span>
              <i>✳</i>
              <span>ATENDIMENTO HUMANO</span>
              <i>✳</i>
              <span>SOLUÇÕES DIGITAIS</span>
              <i>✳</i>
            </div>
          </div>
        </section>

        <section className="section solutions-section" id="solucoes">
          <div className="container">
            <div className="section-heading">
              <div>
                <div className="eyebrow">COMO PODEMOS AJUDAR</div>
                <h2>
                  Soluções para cada etapa
                  <span> do seu negócio.</span>
                </h2>
              </div>

              <p>
                Da formalização à rotina contábil, encontre o apoio que faz
                sentido para sua empresa.
              </p>
            </div>

            <div className="service-grid">
              {services.map((service) => (
                <article className="service-card" key={service.number}>
                  <div className="service-card-top">
                    <span className="service-icon">{service.icon}</span>
                    <span className="service-number">{service.number}</span>
                  </div>

                  <h3>{service.title}</h3>
                  <p>{service.description}</p>

                  <a className="text-link" href="#contato">
                    Tenho interesse <Arrow />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="express-section" id="express">
          <div className="container express-grid">
            <div className="express-copy">
              <div className="eyebrow eyebrow-light">
                SERVIÇOS POR DEMANDA
              </div>

              <h2>
                Precisa resolver algo específico?
                <span> Conheça a Ajudon Express.</span>
              </h2>

              <p>
                Serviços pontuais para demandas empresariais, sem precisar
                contratar uma mensalidade contábil.
              </p>

              <a className="button button-light" href="#contato">
                Consultar um serviço <Arrow />
              </a>
            </div>

            <div className="express-list">
              {expressServices.map((service, index) => (
                <div className="express-item" key={service}>
                  <span className="express-check">✓</span>
                  <span>{service}</span>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                </div>
              ))}

              <p className="express-footnote">
                Consulte a equipe para confirmar disponibilidade, documentação
                necessária e valores.
              </p>
            </div>
          </div>
        </section>

        <section className="section about-section" id="sobre">
          <div className="container about-grid">
            <div className="about-visual">
              <div className="about-circle circle-one" />
              <div className="about-circle circle-two" />

              <div className="about-brand-card">
                <span className="about-brand">
                  ajudon<span>.</span>
                </span>

                <div className="about-card-line" />

                <p>
                  Conhecimento contábil.
                  <br />
                  Tecnologia. Pessoas.
                </p>

                <span className="about-card-mark">✳</span>
              </div>
            </div>

            <div className="about-copy">
              <div className="eyebrow">SOBRE A AJUDON</div>

              <h2>
                Mais clareza para cuidar
                <span> do que você está construindo.</span>
              </h2>

              <p>
                A Ajudon combina uma plataforma digital com atendimento
                próximo para apoiar empresas e profissionais em sua rotina.
              </p>

              <p>
                O objetivo é tornar os processos contábeis mais claros e
                acessíveis, para que você tenha mais tranquilidade ao cuidar
                do seu negócio.
              </p>

              <a className="text-link" href="#contato">
                Conheça a Ajudon de perto <Arrow />
              </a>
            </div>
          </div>
        </section>

        <section className="faq-section">
          <div className="container faq-grid">
            <div className="faq-intro">
              <div className="eyebrow">DÚVIDAS FREQUENTES</div>

              <h2>
                Quer saber
                <span> mais?</span>
              </h2>

              <p>
                Reunimos algumas respostas para ajudar você a dar o próximo
                passo.
              </p>

              <a className="text-link" href="#contato">
                Fale com a equipe <Arrow />
              </a>
            </div>

            <div className="faq-list">
              {faqs.map((faq) => (
                <details className="faq-item" key={faq.question}>
                  <summary>
                    {faq.question}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

        <section className="contact-section" id="contato">
          <div className="container contact-grid">
            <div className="contact-copy">
              <div className="eyebrow eyebrow-light">VAMOS CONVERSAR?</div>

              <h2>
                Sua empresa tem
                <span> novos planos?</span>
              </h2>

              <p>
                Conte um pouco sobre o que você precisa. A equipe da Ajudon
                poderá orientar você sobre os próximos passos.
              </p>

              <div className="contact-details">
                <a href={`mailto:${emailAddress}`}>
                  <span className="contact-detail-icon">✉</span>
                  <span>
                    <small>E-mail</small>
                    {emailAddress}
                  </span>
                </a>

                <a
                  className="contact-instagram"
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="contact-detail-icon">◎</span>
                  <span>
                    <small>Instagram</small>
                    @ajudoncontabilidade
                  </span>
                </a>
              </div>

              <button
                type="button"
                className="share-site-button"
                onClick={shareSite}
              >
                Compartilhar o site
              </button>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Fale com a Ajudon</h3>
              <p>Preencha os campos para preparar sua mensagem.</p>

              <div className="form-row">
                <label>
                  Seu nome
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={updateForm}
                    placeholder="Como podemos te chamar?"
                    autoComplete="name"
                    required
                  />
                </label>

                <label>
                  Seu e-mail
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={updateForm}
                    placeholder="voce@empresa.com"
                    autoComplete="email"
                    required
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  WhatsApp <span className="optional">(opcional)</span>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={updateForm}
                    placeholder="(11) 99999-9999"
                    autoComplete="tel"
                  />
                </label>

                <label>
                  Serviço de interesse
                  <select
                    name="service"
                    value={form.service}
                    onChange={updateForm}
                  >
                    <option value="">Selecione uma opção</option>
                    <option>Contabilidade para tecnologia</option>
                    <option>Abertura de empresa</option>
                    <option>Gestão contábil</option>
                    <option>Planejamento tributário</option>
                    <option>Emissão de notas fiscais</option>
                    <option>Ajudon Express</option>
                    <option>Outro assunto</option>
                  </select>
                </label>
              </div>

              <label>
                Como podemos ajudar?
                <textarea
                  name="message"
                  value={form.message}
                  onChange={updateForm}
                  rows="4"
                  placeholder="Conte um pouco sobre seu negócio..."
                  required
                />
              </label>

              <button
                className="button button-primary form-button"
                type="submit"
              >
                Preparar mensagem <Arrow />
              </button>

              <small className="form-disclaimer">
                O WhatsApp será aberto com a mensagem preenchida. Você poderá
                revisar e confirmar o envio.
              </small>
            </form>
          </div>
        </section>


      <footer className="site-footer">
        <div className="container footer-main">
          <a className="brand footer-brand" href="#inicio">
            ajudon<span>.</span>
          </a>

          <p>Contabilidade digital com atendimento próximo.</p>

          <div className="footer-links">
            <a href="#solucoes">Soluções</a>
            <a href="#express">Ajudon Express</a>
            <a href="#sobre">Sobre</a>
            <a href="#contato">Contato</a>
          </div>
        </div>s

        <div className="container footer-contact">
          <button
            type="button"
            className="button button-primary"
            onClick={handleContactClick}
          >
            Falar com a Ajudon <Arrow />
          </button>
        </div>

        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Ajudon</span>
          <a href={siteUrl} target="_blank" rel="noreferrer">
            Site oficial <Arrow />
          </a>
        </div>
      </footer>
    </>
  );
}

export default App;