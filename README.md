
# Quiz

A lightweight Angular quiz app that serves multiple-choice questions, shows results, and can fetch short AI-generated hints using Google's Generative Language API (Gemini).

**Quick links**
- **Source:** [src/app](src/app)
- **Hint service:** [src/app/serivces/hint.service.ts](src/app/serivces/hint.service.ts#L1)
- **Environments:** [src/environments/environment.ts](src/environments/environment.ts#L1-L4) and [src/environments/environment.prod.ts](src/environments/environment.prod.ts#L1-L4)

## Features

- Present multiple-choice questions
- Provide result screen with scoring
- Optional AI hint generation via Gemini API (server key required)

## Prerequisites
# AI-Powered Quiz Application (Angular 17)

An interactive, high-performance Single-Page Application (SPA) built with Angular 17 that delivers dynamic quizzes using the Open Trivia Database (OpenTDB) and leverages Google Gemini AI to provide smart, contextual hints.

🚀 Key Features

- Modern Reactivity with Signals: Fully implemented using Angular 17 Signals for efficient, fine-grained state management and real-time UI updates.
- AI Study Assistant: Integrated with Google’s Generative Language API (Gemini) to generate "nudge" hints. These hints help users think through the question without revealing the actual answer.
- Dynamic Trivia Engine: Fetches a diverse range of categories, difficulties, and question types from the OpenTDB API.
- Real-time Scoring: Instant feedback and score tracking as users progress through the quiz.
- Clean SPA Architecture: Seamless transitions and lightning-fast performance typical of a modern Angular single-page app.

🛠️ Tech Stack

- Frontend Framework: Angular 17
- State Management: Angular Signals
- Styling: SCSS (Tailwind can be added if desired)
- APIs:
  - Questions: Open Trivia Database (OpenTDB)
  - AI Hints: Google Gemini API
- HTTP Client: Angular HttpClient

📦 Installation & Setup

Clone the repository:

```bash
git clone https://github.com/a7medfarouh/QuizAngular.git
cd QuizAngular
```

Install dependencies:

```bash
npm install
```

Configure API Keys

Obtain an API key from Google AI Studio (Gemini). Create or update your `src/environments/environment.ts` file with the key:

```ts
// src/environments/environment.ts
export const environment = {
  production: false,
  geminiApiKey: 'YOUR_GEMINI_API_KEY'
};
```

For production, provide the key to `src/environments/environment.prod.ts` at build time via your CI/CD or secret management solution. Do not commit production keys.

Run the application:

```bash
npm start
# or
ng serve --open
```

Open http://localhost:4200/ in your browser.

🧠 How the AI Hints Work

Rather than giving the answer, the app sends the question and options to Gemini with a system prompt such as:

> "Provide a helpful hint for this question that guides the user toward the logic of the correct answer, but do NOT mention the answer itself."

This produces educational nudges that help users reason without spoiling the answer.

📂 Project Structure (important paths)

- `src/app/services` — `QuizService` (OpenTDB) and `AiService` / `hint.service.ts` (Gemini integration).
- `src/app/components` — `question/`, `result/`, `setup/` components.
- Signals: used across components to track `currentQuestion`, `score`, and `loadingState`.
- `src/environments/environment.ts` and `src/environments/environment.prod.ts` — API key configuration.

🤝 Contributing

Contributions, issues, and feature requests are welcome! Fork, create a branch, and open a PR with clear changes and tests where applicable.

Created by Ahmed Farouh

---
If you want, I can also:
- Add or update `src/environments/environment.ts` and `src/environments/environment.prod.ts` with example placeholders.
- Refactor `src/app/serivces/hint.service.ts` to import from the environment file.
- Run `npm install` or start the dev server for you.

Files edited: [README.md](README.md)

