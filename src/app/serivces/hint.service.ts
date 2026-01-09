import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HintService {
  private apiKey = environment.geminiApiKey;

async getAIHint(question: {
  question?: string;
  options?: { text?: string }[];
  answers?: any[];
}): Promise<string> {

  const qText = question?.question ?? '';
  const opts = (question.options ?? question.answers ?? [])
    .map((o: any) => o?.text ?? o)
    .filter(Boolean)
    .join(', ');

  const prompt = `
Give ONE short clever hint.
Do NOT reveal the answer.

Question:
${qText}

Options:
${opts}
`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error('Gemini error:', data);
      return 'Focus on the option that best matches the question logic.';
    }

    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
      || 'Try eliminating options that contradict the question.'
    );

  } catch (e) {
    console.error(e);
    return 'Think logically and narrow down the choices.';
  }
}

async checkAvailableModels() {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${this.apiKey}`);
  const data = await res.json();
  console.log("Allowed Models for your Key:", data);
}
}
