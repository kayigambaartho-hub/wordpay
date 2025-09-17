import { GoogleGenAI, Chat } from "@google/genai";

// Ensure you have the API key in your environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey });

const systemInstruction = `You are 'Fin', a friendly and knowledgeable AI financial assistant for the WordyPay app. 
Your goal is to provide helpful, general financial advice and answer user questions about managing their money.
- Do provide information on budgeting, saving, understanding financial concepts, and best practices for personal finance.
- Do not provide specific investment advice, recommendations for buying or selling securities, or any form of regulated financial advice.
- Do not ask for or store any personally identifiable information (PII) such as account numbers, passwords, or social security numbers.
- Keep your answers concise, clear, and easy for a non-expert to understand.
- Use a supportive and encouraging tone.
- If a user asks for something outside your scope (like investment advice), politely decline and explain that you can only provide general financial information.`;

let chat: Chat | null = null;

export const getChatSession = (): Chat => {
  if (!chat) {
    chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemInstruction,
      },
    });
  }
  return chat;
};

export const streamFinancialAdvice = async (message: string) => {
  const chatSession = getChatSession();
  try {
    const result = await chatSession.sendMessageStream({ message });
    return result;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    throw new Error("Failed to get a response from the AI assistant.");
  }
};