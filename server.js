import express from "express";
import cors from "cors";

const app = express();

const PORT = 3001;
const OLLAMA_URL = "http://127.0.0.1:11434/api/chat";
const MODEL = "llama3.2";

app.use(cors());
app.use(express.json());

const AJUDON_KNOWLEDGE = `
Você é a Assistente Virtual da Ajudon Contabilidade.

Responda em português do Brasil.

REGRAS:
- Seja curta, humana e direta.
- Responda em no máximo 3 frases.
- Não invente preços, prazos, impostos, documentos ou informações jurídicas.
- Não diga que é ChatGPT ou modelo de linguagem.
- Não invente serviços da Ajudon.
- Se precisar de uma análise específica, diga que a equipe da Ajudon precisa avaliar o caso.
- Não force o WhatsApp em todas as respostas.

SOBRE A AJUDON:

A Ajudon é uma contabilidade digital especializada em tecnologia.

Atende:
- Programadores
- DEVs
- Profissionais de TI
- Empresas de tecnologia
- Designers
- Marketing digital
- Prestadores de serviços
- Profissionais que trabalham para empresas estrangeiras

SERVIÇOS:
- Contabilidade para tecnologia
- Abertura de empresa
- Gestão contábil
- Planejamento tributário
- Notas fiscais

AJUDON EXPRESS:
- DBE / Coleta Web
- Certidões
- Pesquisas
- Regularizações
- Abertura
- Alteração
- Baixa

AJUDON PARALEGAL:
- Abertura
- Alteração contratual
- Encerramento
- Regularização
- Documentação empresarial

CONTATOS:
WhatsApp: (11) 94275-4326
Instagram: @ajudoncontabilidade
E-mail: atendimento@ajudon.com.br
`;

function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function routeQuestion(message) {
  const text = normalize(message);

  const tecnologia =
    text.includes("programador") ||
    text.includes("programadora") ||
    text.includes("desenvolvedor") ||
    text.includes("desenvolvedora") ||
    text.includes("developer") ||
    text.includes("dev") ||
    text.includes("software") ||
    text.includes("tecnologia") ||
    text.includes("profissional de ti") ||
    text.includes("empresa dos estados unidos") ||
    text.includes("empresa americana") ||
    text.includes("empresa estrangeira") ||
    text.includes("trabalho para o exterior") ||
    text.includes("trabalho para uma empresa estrangeira");

  if (tecnologia) {
    if (
      text.includes("abrir empresa") ||
      text.includes("abrir cnpj") ||
      text.includes("preciso abrir") ||
      text.includes("cnpj")
    ) {
      return `Depende de como você presta o serviço e recebe os pagamentos. A Ajudon é especializada em profissionais de tecnologia e pode analisar seu caso para indicar o melhor caminho.`;
    }

    return `A Ajudon é especializada em contabilidade para profissionais e empresas de tecnologia, inclusive quem trabalha para empresas estrangeiras.`;
  }

  const paralegal =
    text.includes("alteracao contratual") ||
    text.includes("alterar contrato") ||
    text.includes("alterar contrato social") ||
    text.includes("encerramento") ||
    text.includes("fechar empresa") ||
    text.includes("baixar empresa") ||
    text.includes("documentacao empresarial") ||
    text.includes("documentacao da empresa");

  if (paralegal) {
    return `A Ajudon oferece serviços paralegais para abertura, alteração contratual, encerramento e regularização empresarial.`;
  }

  const express =
    text.includes("certidao") ||
    text.includes("certidoes") ||
    text.includes("dbe") ||
    text.includes("coleta web") ||
    text.includes("regularizacao") ||
    text.includes("servico pontual") ||
    text.includes("servico rapido");

  if (express) {
    return `O Ajudon Express atende serviços pontuais, como DBE, certidões, pesquisas e regularizações.`;
  }

  if (
    text.includes("abrir empresa") ||
    text.includes("abertura de empresa") ||
    text.includes("abrir um cnpj") ||
    text.includes("abrir cnpj")
  ) {
    return `A Ajudon trabalha com abertura de empresas e CNPJ. Para indicar a melhor opção, precisamos analisar a atividade e a situação do negócio.`;
  }

  if (
    text.includes("whatsapp") ||
    text.includes("contato") ||
    text.includes("atendente") ||
    text.includes("humano") ||
    text.includes("equipe")
  ) {
    return `Claro. Você pode falar diretamente com a Ajudon pelo WhatsApp: (11) 94275-4326.`;
  }

  return null;
}

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    message: "Backend Ajudon funcionando.",
    model: MODEL,
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages)) {
      return res.status(400).json({
        error: "Mensagens inválidas.",
      });
    }

    const lastUserMessage = [...messages]
      .reverse()
      .find(
        (message) =>
          message?.role === "user" &&
          typeof message.content === "string"
      );

    if (!lastUserMessage) {
      return res.status(400).json({
        error: "Nenhuma pergunta encontrada.",
      });
    }

    const routedReply = routeQuestion(lastUserMessage.content);

    if (routedReply) {
      console.log("ROTEADOR AJUDON:", lastUserMessage.content);

      return res.json({
        reply: routedReply,
        source: "ajudon-router",
      });
    }

    const cleanMessages = messages
      .filter(
        (message) =>
          message &&
          (message.role === "user" || message.role === "assistant") &&
          typeof message.content === "string"
      )
      .slice(-6);

    const ollamaResponse = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        stream: false,
        messages: [
          {
            role: "system",
            content: AJUDON_KNOWLEDGE,
          },
          ...cleanMessages,
        ],
        options: {
          temperature: 0.1,
          top_p: 0.7,
          num_predict: 100,
        },
      }),
    });

    if (!ollamaResponse.ok) {
      return res.status(500).json({
        error: "Erro ao consultar a inteligência artificial.",
      });
    }

    const data = await ollamaResponse.json();

    const reply =
      data?.message?.content?.trim() ||
      "Não consegui responder agora.";

    res.json({
      reply,
      source: "ollama",
    });
  } catch (error) {
    console.error("Erro:", error);

    res.status(500).json({
      error: "Não consegui conectar à inteligência artificial.",
    });
  }
});

app.listen(PORT, () => {
  console.log("");
  console.log("======================================");
  console.log("        AJUDON AI BACKEND");
  console.log("======================================");
  console.log(`Servidor: http://localhost:${PORT}`);
  console.log(`Modelo: ${MODEL}`);
  console.log("Ollama: http://127.0.0.1:11434");
  console.log("======================================");
  console.log("");
});