
import { GoogleGenAI, Type } from "@google/genai";

export const getPriceRecommendation = async (productName: string, location: string, category: string) => {
  // Initialize AI with process.env.API_KEY directly as per SDK guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Recommend a competitive market price for ${productName} (${category}) in ${location}, Nigeria. Provide a minimum and maximum recommended price in Nigerian Naira (NGN), and a short reason based on current seasonal trends.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            minPrice: { type: Type.NUMBER },
            maxPrice: { type: Type.NUMBER },
            recommendedPrice: { type: Type.NUMBER },
            reason: { type: Type.STRING }
          },
          required: ["minPrice", "maxPrice", "recommendedPrice", "reason"]
        }
      }
    });

    // Extract text output using the .text property directly
    const responseText = response.text;
    if (!responseText) {
      console.warn("Gemini service returned an empty response.");
      return null;
    }

    return JSON.parse(responseText.trim());
  } catch (error) {
    console.error("AI Price Recommendation Error:", error);
    return null;
  }
};
