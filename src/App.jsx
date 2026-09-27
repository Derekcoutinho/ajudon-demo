import { useEffect, useState } from "react";
import "./App.css";

const whatsappNumber = "5511942754326";
const whatsappUrl = `https://wa.me/${whatsappNumber}`;
const instagramUrl = "https://www.instagram.com/ajudoncontabilidade/";
const siteUrl = "https://ajudon.com.br/";
const emailAddress = "atendimento@ajudon.com.br";

const services = [
  {
    icon: "01",
    title: "Contabilidade para tecnologia",
    text: "Uma rotina contábil pensada para profissionais, startups e empresas que vivem de tecnologia.",
  },
  {
    icon: "02",
    title: "Abertura de empresa",
    text: "Da ideia à formalização, com orientação para você começar com mais clareza.",
  },
  {
    icon: "03",
    title: "Gestão contábil",
    text: "Acompanhamento para manter a empresa organizada e suas obrigações em dia.",
  },
  {
    icon: "04",
    title: "Planejamento tributário",
    text: "Análise do cenário tributário para apoiar decisões mais conscientes para o negócio.",
  },
  {
    icon: "05",
    title: "Emissão de notas fiscais",
    text: "Orientação para a emissão e rotina fiscal da sua empresa, sem complicação.",
  },
  {
    icon: "06",
    title: "Ajudon Express",
    text: "Serviços pontuais para resolver uma demanda específica sem contratar mensalidade.",
  },
];

const expressServices = [
  "Abertura, alteração e encerramento",
  "Regularização cadastral",
  "Emissão de certidões",
  "Inscrição estadual",
  "Consultas e pesquisas cadastrais",
  "Serviços por demanda",
];

const faqs = [
  [
    "A Ajudon atende somente tecnologia?",
    "A Ajudon tem foco em profissionais e empresas de tecnologia, mas também atende micro e pequenas empresas e prestadores de serviços. Fale com a equipe para confirmar o seu caso.",
  ],
  [
    "Posso contratar apenas um serviço?",
    "Sim. A Ajudon Express foi pensada para demandas pontuais, sem necessidade de contratar uma mensalidade contábil.",
  ],
  [
    "O atendimento é online?",
    "A proposta é oferecer uma experiência digital com atendimento humano. A equipe orienta você de acordo com a necessidade.",
  ],
  [
    "A Ajudon atende empresas de outros estados?",
    "A disponibilidade varia conforme o estado e o serviço. Entre em contato para confirmar o atendimento.",
  ],
];

function Arrow({ light = false }) {
  return (
    <span className={light ? "arrow arrow-light" : "arrow"}>
      ↗
    </span>
  );
}

function Spark() {
  return (
    <span className="spark-symbol" aria-hidden="true">
      ✦
    </span>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="whatsapp-icon"
    >
      <path d="M16 3.2A12.6 12.6 0 0 0 5.2 22.3L3.5 28.8l6.7-1.7A12.6 12.6 0 1 0 16 3.2Zm0 22.9a10.2 10.2 0 0 1-5.2-1.4l-.4-.2-3.9 1 1-3.8-.3-.4A10.2 10.2 0 1 1 16 26.1Zm5.6-7.6c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.3 8.3 0 0 1-2.5-1.5 9.3 9.3 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.7l.5-.5.3-.5c.1-.2 0-.4 0-.6s-.7-1.8-1-2.5c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4s-1.2 1.2-1.2 2.8 1.2 3.2 1.4 3.4a13.1 13.1 0 0 0 5 4.4c.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.9-.8 2.2-1.5s.3-1.3.2-1.5-.2-.3-.5-.4Z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="share-icon-svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 15V4" />
      <path d="m7.5 8.5 4.5-4.5 4.5 4.5" />
      <path d="M5 12.5v5A2.5 2.5 0 0 0 7.5 20h9a2.5 2.5 0 0 0 2.5-2.5v-5" />
    </svg>
  );
}

function HeroDashboard() {
  return (
    <div
      className="hero-dashboard"
      aria-label="Painel visual da Ajudon"
    >
      <div className="dashboard-glow" />
      <div className="dashboard-orbit orbit-one" />
      <div className="dashboard-orbit orbit-two" />

      <div className="dashboard-topbar">
        <div className="window-dots">
          <i />
          <i />
          <i />
        </div>

        <span>ajudon.</span>

        <div className="topbar-status">
          <b />
          online
        </div>
      </div>

      <div className="dashboard-main">
        <div className="dashboard-copy">
          <span className="mini-label">
            CONTABILIDADE DIGITAL
          </span>

          <h2>
            Accounting that
            <br />
            <em>moves with you.</em>
          </h2>

          <p>
            Organização, orientação e tecnologia para deixar sua
            empresa em movimento.
          </p>
        </div>

        <div className="dashboard-metrics">
          <div className="metric-card metric-large">
            <div className="metric-head">
              <span>Rotina fiscal</span>
              <b>●</b>
            </div>

            <div className="metric-value">
              Organizada
            </div>

            <div className="metric-bars">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>

            <small>
              mais clareza para decidir
            </small>
          </div>

          <div className="metric-card metric-side">
            <span>Atendimento</span>

            <strong>Humano</strong>

            <div className="avatar-row">
              <b>a.</b>
              <b>+</b>
              <b>→</b>
            </div>
          </div>

          <div className="metric-card metric-side">
            <span>Soluções</span>

            <strong>Digitais</strong>

            <div className="ring">
              <span>24/7</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-footer">
        <span>MAIS TEMPO PARA O QUE IMPORTA</span>

        <span>
          <i /> AJUDON
        </span>
      </div>
    </div>
  );
}

function FlyingBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Olá! 👋 Sou o assistente da Ajudon. Posso te orientar sobre abertura de empresa, contabilidade para tecnologia, Ajudon Express e outros serviços.",
    },
  ]);

  const suggestions = [
    "Quero abrir uma empresa",
    "Sou DEV / trabalho com tecnologia",
    "O que é a Ajudon Express?",
    "Preciso de uma certidão",
    "Quero falar com a equipe",
  ];

  function sendMessage(text) {
    const question = text.trim();
    if (!question) return;

    setMessages((current) => [
      ...current,
      { from: "user", text: question },
    ]);

    const normalized = question
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    let answer =
      "Posso te orientar sobre as soluções da Ajudon. Se preferir, você também pode continuar o atendimento com a equipe pelo WhatsApp.";

    if (
      /(abrir|abertura|criar|formalizar|cnpj).*(empresa|negocio|pj)|(empresa|negocio).*(abrir|abertura|cnpj)/.test(
        normalized
      )
    ) {
      answer =
        "A Ajudon trabalha com abertura de CNPJ e formalização de empresas, com orientação durante o processo. A abertura pode ser feita sem sair de casa. Se quiser, posso te encaminhar para a equipe pelo WhatsApp.";
    } else if (
      /(dev|desenvolvedor|designer|programador|tecnologia|ti|marketing digital|representante comercial|prestador)/.test(
        normalized
      )
    ) {
      answer =
        "Sim. A Ajudon tem contabilidade especializada para profissionais de TI, DEV's, designers, marketing digital, prestadores de serviços, representantes comerciais e empresas de tecnologia. O atendimento é digital e humanizado.";
    } else if (
      /(nota fiscal|nota|emissao de nota|emitir nota)/.test(normalized)
    ) {
      answer =
        "A Ajudon também trabalha com habilitação e orientação para emissão de nota fiscal, além da rotina contábil e fiscal da empresa.";
    } else if (
      /(express|dbe|coleta web|certidao|regularizacao|regularizar|alteracao|alterar|baixa|pesquisa|inscricao estadual|inteiro teor|simplificada|especifica)/.test(
        normalized
      )
    ) {
      answer =
        "A Ajudon Express oferece serviços rápidos e pontuais, sem compromisso de fidelidade ou mensalidade. Entre eles estão DBE/Coleta Web, pesquisas, certidões, regularização, abertura, alteração, baixa, Certidão de Inteiro Teor, Certidão Simplificada, Certidão Específica e serviços relacionados à inscrição estadual.";
    } else if (
      /(preco|valor|quanto custa|orcamento|mensalidade)/.test(normalized)
    ) {
      answer =
        "O valor depende do serviço e da necessidade da empresa. Para receber uma proposta, posso te encaminhar diretamente para a equipe da Ajudon.";
    } else if (
      /(fora de sp|outro estado|outro lugar|minas|rj|parana|bahia|estado)/.test(
        normalized
      )
    ) {
      answer =
        "Não tem problema não ser de São Paulo. A Ajudon orienta o cliente a entrar em contato para verificar a disponibilidade do serviço no estado desejado.";
    } else if (
      /(imposto|tribut|economizar|economia|planejamento tributario|simples|lucro)/.test(
        normalized
      )
    ) {
      answer =
        "A Ajudon oferece planejamento tributário e contabilidade digital para ajudar o negócio a tomar decisões com mais clareza. A análise depende do perfil e da atividade da empresa.";
    } else if (
      /(contato|whatsapp|falar|humano|equipe|atendente)/.test(normalized)
    ) {
      answer =
        "Claro. Clique em 'Continuar no WhatsApp' e sua conversa será encaminhada para a equipe da Ajudon.";
    } else if (
      /(o que voces fazem|servicos|solucoes|ajudon)/.test(normalized)
    ) {
      answer =
        "A Ajudon oferece soluções contábeis digitais com atendimento humanizado, incluindo abertura de empresa, contabilidade para tecnologia, planejamento tributário, emissão de notas fiscais e Ajudon Express para serviços pontuais.";
    }

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        { from: "bot", text: answer },
      ]);
    }, 350);
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
    sendMessage(input.value);
    input.value = "";
  }

  return (
    <div className="assistant-wrap">
      {isOpen && (
        <section className="assistant-panel" aria-label="Assistente virtual da Ajudon">
          <header className="assistant-header">
            <div className="assistant-avatar">a.</div>
            <div className="assistant-heading">
              <strong>Assistente Ajudon</strong>
              <span><i /> online · atendimento digital</span>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Fechar">×</button>
          </header>

          <div className="assistant-messages" aria-live="polite">
            {messages.map((message, index) => (
              <div className={`assistant-message ${message.from}`} key={`${index}-${message.from}`}>
                {message.text}
              </div>
            ))}

            <div className="assistant-actions">
              {suggestions.map((suggestion) => (
                <button type="button" key={suggestion} onClick={() => sendMessage(suggestion)}>
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <form className="assistant-compose" onSubmit={handleSubmit}>
            <input name="message" placeholder="Digite sua dúvida..." autoComplete="off" aria-label="Digite sua dúvida" />
            <button type="submit" aria-label="Enviar">↑</button>
          </form>

          <button className="assistant-whatsapp" type="button" onClick={openWhatsApp}>
            Continuar no WhatsApp <Arrow />
          </button>
        </section>
      )}

      <button
        className={`flying-bot ${isOpen ? "is-open" : ""}`}
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        aria-expanded={isOpen}
        aria-label="Abrir assistente Ajudon"
      >
        <img src="/ajudon-bot.png" alt="Assistente Ajudon" onError={(event) => { event.currentTarget.style.display = "none"; }} />
        <span>Posso ajudar?</span>
      </button>
    </div>
  );
}

function WelcomeModal({ onClose }) {
  return (
    <div
      className="welcome-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section className="welcome-modal">

        <button
          className="welcome-close"
          type="button"
          onClick={onClose}
          aria-label="Fechar anúncio"
        >
          ×
        </button>

        <div className="welcome-content">

          <div className="welcome-kicker">
            <span className="live-dot" />
            AJUDON
          </div>

          <span className="welcome-badge">
            CONTABILIDADE · TECNOLOGIA · PESSOAS
          </span>

          <h2 id="welcome-title">
            Conheça uma contabilidade
            <br />
            <span>que acompanha seu ritmo.</span>
          </h2>

          <p>
            Soluções contábeis, tecnologia e atendimento humano
            para deixar sua empresa mais organizada e em movimento.
          </p>

          <div className="welcome-actions">

            <a
              className="button button-primary"
              href="#solucoes"
              onClick={onClose}
            >
              Conhecer trabalhos
              <Arrow />
            </a>

            <a
              className="button button-ghost"
              href="#sobre"
              onClick={onClose}
            >
              Conhecer o site
            </a>

          </div>

          <a
            className="welcome-contact"
            href="#contato"
            onClick={onClose}
          >
            Prefiro falar com a equipe
            <Arrow />
          </a>

        </div>

        <div className="welcome-visual" aria-hidden="true">

          <div className="welcome-visual-brand">
            ajudon<span>.</span>
          </div>

          <div className="welcome-visual-line">
            <i />
            atendimento humano
          </div>

          <div className="welcome-visual-card">
            <small>SEU NEGÓCIO</small>

            <strong>
              EM MOVIMENTO
            </strong>

            <div className="welcome-visual-bars">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>

          <div className="welcome-visual-orbit" />

        </div>

      </section>
    </div>
  );
}
function App() {
  const [welcomeOpen, setWelcomeOpen] = useState(true);

  useEffect(() => {
    if (!welcomeOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setWelcomeOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [welcomeOpen]);

  // resto do seu código...
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const openWhatsApp = (message) => {
    window.open(
      `${whatsappUrl}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const updateForm = (event) => {
    const { name, value } = event.target;

    if (name === "phone") {
      const digits = value.replace(/\D/g, "");

      const limitedDigits = digits.slice(0, 11);

      let formatted = limitedDigits;

      if (limitedDigits.length > 2) {
        formatted = `(${limitedDigits.slice(
          0,
          2
        )}) ${limitedDigits.slice(2)}`;
      }

      if (limitedDigits.length > 7) {
        formatted = `(${limitedDigits.slice(
          0,
          2
        )}) ${limitedDigits.slice(
          2,
          7
        )}-${limitedDigits.slice(7, 11)}`;
      }

      setForm((current) => ({
        ...current,
        phone: formatted,
      }));

      return;
    }

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  function submitForm(event) {
    event.preventDefault();

    const message =
      `Olá, Ajudon! Vim pelo site e gostaria de conversar com a equipe.\n\n` +
      `Nome: ${form.name}\n` +
      `E-mail profissional: ${form.email}\n` +
      `Telefone: ${form.phone || "Não informado"}\n` +
      `Como podemos ajudar: ${form.service || "Ainda não sei"}\n\n` +
      `Necessidade: ${form.message}`;

    openWhatsApp(message);
  }

  function shareSite() {
    if (navigator.share) {
      navigator
        .share({
          title: "Ajudon",
          text: "Conheça a Ajudon.",
          url: siteUrl,
        })
        .catch(() => {});
    } else if (navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(siteUrl)
        .then(() => alert("Link do site copiado!"));
    } else {
      window.prompt(
        "Copie o link do site:",
        siteUrl
      );
    }
  }

  return (
    <div className="site-shell">

{welcomeOpen && (
  <WelcomeModal
    onClose={() => setWelcomeOpen(false)}
  />
)}
      {/* HEADER */}

      <header className="header">
        <nav className="nav container">

          <a
            className="brand"
            href="#inicio"
            onClick={closeMenu}
          >
            ajudon<span>.</span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            onClick={() =>
              setMenuOpen((value) => !value)
            }
            aria-label="Menu"
          >
            {menuOpen ? "×" : "☰"}
          </button>

          <div
            className={`nav-links ${
              menuOpen ? "nav-open" : ""
            }`}
          >
            <a href="#solucoes" onClick={closeMenu}>
              Soluções
            </a>

            <a href="#express" onClick={closeMenu}>
              Ajudon Express
            </a>

            <a href="#sobre" onClick={closeMenu}>
              Empresa
            </a>

            <a href="#faq" onClick={closeMenu}>
              Dúvidas
            </a>

            <a
              className="nav-cta"
              href="#contato"
              onClick={closeMenu}
            >
              Fale com a gente
              <Arrow light />
            </a>
          </div>

        </nav>
      </header>

      <main>

        {/* HERO */}

        <section className="hero" id="inicio">

          <div className="hero-backdrop" />

          <div className="container hero-inner">

            <div className="hero-copy">

              <div className="eyebrow">
                <span className="live-dot" />
                CONTABILIDADE DIGITAL PARA NEGÓCIOS EM MOVIMENTO
              </div>

              <h1>
                Contabilidade que
                <br />
                <span>
                  acompanha o seu ritmo.
                </span>
              </h1>

              <p>
                Mais clareza para cuidar da sua empresa.
                Ajudon combina contabilidade, tecnologia
                e atendimento humano para simplificar suas
                decisões e facilitar o dia a dia do seu negócio.
              </p>

              <div className="hero-actions">

                <a
                  className="button button-primary"
                  href="#contato"
                >
                  Começar uma conversa
                  <Arrow />
                </a>

                <a
                  className="button button-ghost"
                  href="#solucoes"
                >
                  Conhecer soluções
                </a>

              </div>

              <div className="hero-trust">

                <span>
                  <b>✓</b>
                  Atendimento humano
                </span>

                <span>
                  <b>✓</b>
                  Experiência digital
                </span>

                <span>
                  <b>✓</b>
                  Tecnologia que simplifica
                </span>

              </div>

            </div>

            <HeroDashboard />

          </div>

          <div className="hero-bottom-line container">
            <span>
              01 — AJUDON
            </span>

            <span>
              CONTABILIDADE · TECNOLOGIA · PESSOAS
            </span>
          </div>

        </section>

        {/* MARQUEE */}

        <section
          className="marquee"
          aria-label="Diferenciais"
        >
          <div className="marquee-track">

            <div className="marquee-group">

              {[
                "CONTABILIDADE",
                "TECNOLOGIA",
                "ATENDIMENTO HUMANO",
                "SOLUÇÕES DIGITAIS",
                "EMPRESAS EM MOVIMENTO",
              ].map((item) => (
                <span key={item}>
                  {item}
                  <i>✦</i>
                </span>
              ))}

            </div>

            <div
              className="marquee-group"
              aria-hidden="true"
            >

              {[
                "CONTABILIDADE",
                "TECNOLOGIA",
                "ATENDIMENTO HUMANO",
                "SOLUÇÕES DIGITAIS",
                "EMPRESAS EM MOVIMENTO",
              ].map((item) => (
                <span key={item}>
                  {item}
                  <i>✦</i>
                </span>
              ))}

            </div>

          </div>
        </section>

        {/* SOLUÇÕES */}

        <section
          className="section solutions"
          id="solucoes"
        >

          <div className="container">

            <div className="section-head">

              <div>

                <span className="section-index">
                  02 / SOLUÇÕES
                </span>

                <h2>
                  Um lugar para organizar
                  <br />
                  <span>a próxima fase.</span>
                </h2>

              </div>

              <p>
                Do primeiro CNPJ à rotina de uma empresa
                em crescimento, a Ajudon está perto para
                simplificar o que parece complicado.
              </p>

            </div>

            <div className="service-grid">

              {services.map((service) => (

                <article
                  className="service-card"
                  key={service.icon}
                >

                  <div className="service-number">
                    {service.icon}
                  </div>

                  <div className="service-icon">
                    <Spark />
                  </div>

                  <h3>
                    {service.title}
                  </h3>

                  <p>
                    {service.text}
                  </p>

                  <a href="#contato">
                    Tenho interesse
                    <Arrow />
                  </a>

                </article>

              ))}

            </div>

          </div>

        </section>

        {/* EXPRESS */}

        <section
          className="express"
          id="express"
        >

          <div className="container express-inner">

            <div className="express-copy">

              <span className="section-index">
                03 / AJUDON EXPRESS
              </span>

              <h2>
                Precisa resolver
                <br />
                <span>algo específico?</span>
              </h2>

              <p>
                Serviços pontuais para demandas empresariais,
                sem precisar contratar uma mensalidade contábil.
              </p>

              <a
                className="button button-light"
                href="#contato"
              >
                Consultar um serviço
                <Arrow light />
              </a>

            </div>

            <div className="express-panel">

              <div className="express-panel-head">

                <span>
                  AJUDON EXPRESS
                </span>

                <span>
                  01 — 06
                </span>

              </div>

              {expressServices.map(
                (service, index) => (

                  <div
                    className="express-item"
                    key={service}
                  >

                    <span>
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <strong>
                      {service}
                    </strong>

                    <b>↗</b>

                  </div>
                )
              )}

              <small>
                Consulte disponibilidade,
                documentação necessária e valores
                com a equipe.
              </small>

            </div>

          </div>

        </section>

        {/* SOBRE */}

        <section
          className="section about"
          id="sobre"
        >

          <div className="container about-grid">

            <div className="about-art">

              <div className="about-grid-lines" />

              <div className="about-orbit" />

              <div className="about-card">

                <span>
                  ajudon.
                </span>

                <small>
                  KNOWLEDGE × TECHNOLOGY × PEOPLE
                </small>

                <strong>
                  Menos complicação.
                  <br />
                  Mais movimento.
                </strong>

                <i>
                  ✦
                </i>

              </div>

              <div className="about-float">
                + tecnologia
                <br />
                <b>
                  + proximidade
                </b>
              </div>

            </div>

            <div className="about-copy">

              <span className="section-index">
                04 / SOBRE A AJUDON
              </span>

              <h2>
                Contabilidade sem
                <br />
                <span>
                  cara de burocracia.
                </span>
              </h2>

              <p>
                A Ajudon nasceu para aproximar
                contabilidade e tecnologia. A ideia é
                transformar processos que parecem
                complexos em uma experiência mais clara,
                digital e humana.
              </p>

              <p>
                Você continua focado no seu negócio
                enquanto a equipe ajuda a organizar a
                parte contábil, fiscal e empresarial.
              </p>

              <a
                className="text-link"
                href="#contato"
              >
                Quero conversar com a Ajudon
                <Arrow />
              </a>

            </div>

          </div>

        </section>

        {/* MOMENTOS */}

        <section className="next-step">

          <div className="container next-step-inner">

            <div>

              <span className="section-index">
                05 / QUAL É O SEU MOMENTO?
              </span>

              <h2>
                Por onde
                <br />
                <span>
                  começamos?
                </span>
              </h2>

              <p>
                Escolha o que mais parece com seu momento
                e siga direto para uma conversa.
              </p>

            </div>

            <div className="moment-grid">

              <a href="#contato">
                <span>01</span>

                <strong>
                  Estou começando
                </strong>

                <small>
                  Quero abrir ou estruturar minha empresa.
                </small>

                <b>↗</b>
              </a>

              <a href="#contato">
                <span>02</span>

                <strong>
                  Já tenho empresa
                </strong>

                <small>
                  Quero organizar minha rotina contábil.
                </small>

                <b>↗</b>
              </a>

              <a href="#contato">
                <span>03</span>

                <strong>
                  Preciso de algo pontual
                </strong>

                <small>
                  Quero resolver uma demanda específica.
                </small>

                <b>↗</b>
              </a>

            </div>

          </div>

        </section>

        {/* FAQ */}

        <section
          className="faq section"
          id="faq"
        >

          <div className="container faq-grid">

            <div>

              <span className="section-index">
                06 / DÚVIDAS
              </span>

              <h2>
                Antes de
                <br />
                <span>
                  começar.
                </span>
              </h2>

              <p>
                Algumas respostas rápidas para facilitar
                o primeiro contato.
              </p>

            </div>

            <div className="faq-list">

              {faqs.map(
                ([question, answer], index) => (

                  <article
                    className={`faq-item ${
                      faqOpen === index
                        ? "open"
                        : ""
                    }`}
                    key={question}
                  >

                    <button
                      type="button"
                      onClick={() =>
                        setFaqOpen(
                          faqOpen === index
                            ? null
                            : index
                        )
                      }
                    >

                      <span>
                        {question}
                      </span>

                      <b>
                        {faqOpen === index
                          ? "−"
                          : "+"}
                      </b>

                    </button>

                    {faqOpen === index && (
                      <p>
                        {answer}
                      </p>
                    )}

                  </article>

                )
              )}

            </div>

          </div>

        </section>

        {/* CONTATO */}

        <section
          className="contact"
          id="contato"
        >

          <div className="container contact-inner">

            <div className="contact-copy">

              <span className="section-index">
                07 / VAMOS CONVERSAR?
              </span>

              <h2>
                Seu próximo passo
                <br />
                <span>
                  começa aqui.
                </span>
              </h2>

              <p>
                Conte o que você precisa. A equipe Ajudon
                entende seu cenário e indica o próximo caminho.
              </p>

              <div className="contact-links">

                <a
                  className="contact-icon email-icon"
                  href={`mailto:${emailAddress}`}
                  aria-label="Enviar e-mail para a Ajudon"
                  title="Enviar e-mail"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                    />

                    <path d="m4 7 8 6 8-6" />
                  </svg>
                </a>

                <a
                  className="contact-icon instagram-icon-only"
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram da Ajudon"
                  title="Instagram da Ajudon"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient
                        id="instagramGradient"
                        x1="0%"
                        y1="100%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#FFDC80"
                        />

                        <stop
                          offset="25%"
                          stopColor="#FCB045"
                        />

                        <stop
                          offset="50%"
                          stopColor="#FD1D1D"
                        />

                        <stop
                          offset="75%"
                          stopColor="#E1306C"
                        />

                        <stop
                          offset="100%"
                          stopColor="#833AB4"
                        />
                      </linearGradient>
                    </defs>

                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="5"
                      fill="none"
                      stroke="url(#instagramGradient)"
                      strokeWidth="2"
                    />

                    <circle
                      cx="12"
                      cy="12"
                      r="4.2"
                      fill="none"
                      stroke="url(#instagramGradient)"
                      strokeWidth="2"
                    />

                    <circle
                      cx="17.4"
                      cy="6.6"
                      r="1.15"
                      fill="url(#instagramGradient)"
                    />
                  </svg>
                </a>

                <button
                  className="contact-icon share-icon-only"
                  type="button"
                  onClick={shareSite}
                  aria-label="Compartilhar site da Ajudon"
                  title="Compartilhar site"
                >
                  <ShareIcon />
                </button>

              </div>

            </div>

            <form
              className="contact-form"
              onSubmit={submitForm}
            >

              <div className="form-top">

                <span>
                  FALE COM A AJUDON
                </span>

                <i>
                  ↗
                </i>

              </div>

              <div className="form-grid">

                <label>
                  Nome

                  <input
                    name="name"
                    value={form.name}
                    onChange={updateForm}
                    placeholder="Como podemos chamar você?"
                    autoComplete="name"
                    required
                  />
                </label>

                <label>
                  E-mail profissional

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={updateForm}
                    placeholder="voce@empresa.com.br"
                    autoComplete="email"
                    required
                  />
                </label>

              </div>

              <div className="form-grid">

                <label>
                  Telefone

                  <small>
                    (opcional)
                  </small>

                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={updateForm}
                    placeholder="(11) 99999-9999"
                    autoComplete="tel"
                    inputMode="numeric"
                    maxLength={15}
                  />
                </label>

                <label>
                  Como podemos ajudar?

                  <select
                    name="service"
                    value={form.service}
                    onChange={updateForm}
                  >
                    <option value="">
                      Escolha uma opção
                    </option>

                    <option value="Contabilidade">
                      Contabilidade
                    </option>

                    <option value="Abertura de empresa">
                      Abertura de empresa
                    </option>

                    <option value="Alteração contratual">
                      Alteração contratual
                    </option>

                    <option value="Encerramento de empresa">
                      Encerramento de empresa
                    </option>

                    <option value="Tecnologia">
                      Tecnologia
                    </option>

                    <option value="Outro">
                      Outro
                    </option>
                  </select>
                </label>

              </div>

              <label>
                Conte um pouco sobre sua necessidade

                <textarea
                  name="message"
                  value={form.message}
                  onChange={updateForm}
                  placeholder="O que você gostaria de resolver?"
                  rows="5"
                  required
                />
              </label>

              <button
                className="button button-primary form-button"
                type="submit"
              >
                Abrir conversa no WhatsApp
                <Arrow />
              </button>

              <small className="form-note">
                Você poderá revisar a mensagem antes de enviar.
              </small>

            </form>

          </div>

        </section>

      </main>

      <footer className="footer">

        <div className="container footer-main">

          <a
            className="brand footer-brand"
            href="#inicio"
          >
            ajudon<span>.</span>
          </a>

          <p>
            Contabilidade, tecnologia e pessoas.
          </p>

          <div className="footer-links">

            <a href="#solucoes">
              Soluções
            </a>

            <a href="#express">
              Express
            </a>

            <a href="#sobre">
              Empresa
            </a>

            <a href="#contato">
              Contato
            </a>

          </div>

        </div>

        <div className="container footer-bottom">

          <span>
            © {new Date().getFullYear()} Ajudon.
            Todos os direitos reservados.
          </span>

          <a href="#inicio">
            Voltar ao topo ↑
          </a>

        </div>

      </footer>

      <FlyingBot />

      <a
        className="whatsapp-float"
        href={`${whatsappUrl}?text=${encodeURIComponent(
          "Olá! Vim pelo site da Ajudon e gostaria de atendimento."
        )}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com a Ajudon pelo WhatsApp"
      >
        <WhatsAppIcon />
      </a>

    </div>
  );
}

export default App;