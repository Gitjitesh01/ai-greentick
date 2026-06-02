import { GoogleGenAI } from "@google/genai";

// Always initialize with named parameter and direct process.env reference as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generate a response for the chatbot based on user input and context.
 * This connects to the 'AI Chatbot Builder' feature of AI Greentick.
 */
export const generateBotResponse = async (
  userMessage: string, 
  context: string
): Promise<string> => {
  try {
    // Using gemini-3-flash-preview as recommended for basic text tasks
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Context: ${context}\n\nUser: ${userMessage}\n\nBot:`,
      config: {
        systemInstruction: "You are a helpful customer support assistant for a brand on WhatsApp. Keep answers short, friendly, and emoji-rich.",
      }
    });
    
    // Accessing the .text property directly (not a method) as per guidelines
    return response.text || "Sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Error generating bot response:", error);
    throw error;
  }
};