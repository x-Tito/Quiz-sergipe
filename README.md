# Quiz Sergipe Front

Frontend React + Vite do Quiz Sergipe, consumindo a API separada.

## Configuracao da API

Crie um arquivo `.env` na raiz do projeto com:

```bash
VITE_API_URL=http://localhost:5095
```

Se a API estiver publicada no Render:

```bash
VITE_API_URL=https://sua-api.onrender.com
```

Existe um modelo em [.env.example](./.env.example).

## Rodar localmente

1. Instale as dependencias

```bash
npm install
```

2. Rode o frontend

```bash
npm run dev
```

3. Garanta que a API esteja rodando e com CORS liberado para a URL do Vite.

## Fluxo integrado

As fases agora:

- iniciam um quiz real na API
- carregam as perguntas de `GET /api/quiz/{quizId}/perguntas`
- enviam respostas para `POST /api/quiz/responder`
- finalizam com `POST /api/quiz/{quizId}/finalizar`

## Teste rapido

1. Suba a API.
2. Configure `VITE_API_URL`.
3. Suba o frontend.
4. Entre em uma fase.
5. Verifique se a pergunta exibida veio da API.
