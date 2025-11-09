import { GoogleGenAI } from "@google/genai";

export const getPhaseTip = async (phaseName: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Eres un coach de hackathon motivador. Genera un consejo corto y motivacional (menos de 40 palabras) en español para un equipo que se encuentra en la fase de "${phaseName}" de un hackathon. El tono debe ser enérgico e inspirador.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error fetching tip from Gemini API:", error);
    return "¡Sigan con el gran trabajo! Concéntrense en la colaboración y recuerden tomar descansos cortos.";
  }
};
