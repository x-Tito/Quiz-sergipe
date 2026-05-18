const API_BASE_URL = (import.meta.env.VITE_API_URL ?? "http://localhost:5095").replace(/\/$/, "");

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {})
    },
    ...options
  });

  if (!response.ok) {
    let message = "Falha ao comunicar com a API.";

    try {
      const data = await response.json();
      message = data?.mensagem ?? message;
    } catch {
      // Ignora corpo invalido e mantem a mensagem padrao.
    }

    throw new Error(message);
  }

  return response.json();
}

export function iniciarQuiz() {
  return request("/api/quiz/iniciar", {
    method: "POST"
  });
}

export function listarPerguntas(quizId) {
  return request(`/api/quiz/${quizId}/perguntas`);
}

export function responderPergunta(payload) {
  return request("/api/quiz/responder", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function finalizarQuiz(quizId) {
  return request(`/api/quiz/${quizId}/finalizar`, {
    method: "POST"
  });
}
