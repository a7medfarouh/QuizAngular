import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HintService {
  // IMPORTANT: For production, move this to an environment file or backend
  private apiKey = 'AIzaSyCFKNpXPiRqYnf2F32xr2ftQ6xLipPfqDg';

  async getAIHint(question: { question?: string; options?: { text?: string }[]; answers?: any[] }): Promise<string> {
    const qText = question?.question ?? '';
    const opts = (question.options ?? question.answers ?? [])
      .map((o: any) => (typeof o === 'string' ? o : o?.text ?? ''))
      .filter(Boolean)
      .join(', ');

    const systemPrompt = 'You are an expert educational assistant. Give a very clever and concise hint to the question without giving the answer directly.';
    const prompt = `Question: ${qText}\nOptions: ${opts}\nGive one concise hint (do not reveal the answer).`;

    if (!this.apiKey) {
      return 'Try eliminating options that contradict the question wording.';
    }

    try {
      // Use v1beta and gemini-1.5-flash
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`;

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // The REST API uses snake_case for system instructions
          system_instruction: {
            parts: [{ text: systemPrompt }]
          },
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }]
            }
          ]
        })
      });

      const data = await res.json();

      if (!res.ok) {
        // Log the error to see exactly why it's failing (400, 404, etc.)
        console.error('Gemini API Error Status:', res.status);
        console.error('Gemini API Error Data:', data);
        return 'Think about which options are best supported by the question details.';
      }

      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      return (text && String(text).trim()) || 'Look for key terms that connect the question to the options.';

    } catch (error) {
      console.error('Network/Fetch error:', error);
      return 'Unable to reach AI service; try narrowing choices by elimination.';
    }
  }
}
