AI-Powered Quiz Application (Angular 17)
An interactive, high-performance Single-Page Application (SPA) built with Angular 17 that delivers dynamic quizzes using the Open Trivia Database (OpenTDB) and leverages Google Gemini AI to provide smart, contextual hints.

🚀 Key Features
Modern Reactivity with Signals: Fully implemented using Angular 17 Signals for efficient, fine-grained state management and real-time UI updates.

AI Study Assistant: Integrated with Google’s Generative Language API (Gemini) to generate "nudge" hints. These hints help users think through the question without revealing the actual answer.

Dynamic Trivia Engine: Fetches a diverse range of categories, difficulties, and question types from the OpenTDB API.

Real-time Scoring: Instant feedback and score tracking as users progress through the quiz.

Clean SPA Architecture: Seamless transitions and lightning-fast performance typical of a modern Angular single-page app.

🛠️ Tech Stack
Frontend Framework: Angular 17

State Management: Angular Signals

Styling: CSS3 / SCSS (or Tailwind if applicable)

APIs:

Questions: Open Trivia Database API

AI Hints: Google Gemini API

HTTP Client: Angular HttpClient for seamless API communication.

📦 Installation & Setup
Clone the repository:

Bash

git clone https://github.com/a7medfarouh/QuizAngular.git
cd QuizAngular
Install dependencies:

Bash

npm install
Configure API Keys:

Obtain an API key from Google AI Studio.

Create or update your environment.ts file:

TypeScript

export const environment = {
  production: false,
  geminiApiKey: 'YOUR_GEMINI_API_KEY'
};
Run the application:

Bash

ng serve
Navigate to http://localhost:4200/.

🧠 How the AI Hints Work
Instead of providing a direct answer, the application sends the question and the multiple-choice options to the Gemini API with a specific system prompt:

"Provide a helpful hint for this question that guides the user toward the logic of the correct answer, but do NOT mention the answer itself."

This creates an educational experience rather than just a testing one.

📂 Project Structure
src/app/services: Contains the QuizService for OpenTDB and AiService for Gemini integration.

src/app/components: Modular UI components (Quiz, Question, Scoreboard, Hint).

Signals: Used across components to track currentQuestion, score, and loadingState.

🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

Created by Ahmed Farouh
