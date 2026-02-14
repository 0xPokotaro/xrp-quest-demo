
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getConciergeInsight = async (userName: string, balances: { xrp: number, rlusd: number }) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Context: XRP Tokyo 2026 Conference.
User: ${userName}. 
Balances: ${balances.xrp} XRP, ${balances.rlusd} RLUSD.
Task: Provide a short, energetic "welcome back" or "next step" insight (max 1 sentence) for the conference participant. 
Language: Japanese.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 100,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini insight error:", error);
    return "XRP Tokyo 2026へようこそ。タスクを完了して報酬を獲得しましょう。";
  }
};
