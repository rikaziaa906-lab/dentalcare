import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const generateDHDiagnosisAnalysis = async (unmetNeed: string, selectedCauses: string[], selectedSigns: string[]) => {
  const prompt = `
    Berdasarkan pedoman diagnosis dental hygiene:
    Masalah: ${unmetNeed}
    Penyebab terpilih: ${selectedCauses.join(', ')}
    Tanda/Gejala terpilih: ${selectedSigns.join(', ')}

    Berikan analisis singkat (maksimal 3-4 kalimat) mengenai kondisi pasien ini dalam bahasa Indonesia.
    Fokus pada hubungan antara penyebab dan tanda yang muncul.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return response.text;
};

export const generateInterventionPlan = async (diagnosis: string) => {
  const prompt = `
    Berdasarkan diagnosis dental hygiene: "${diagnosis}", buatkan rencana intervensi TGM yang tepat.
    Berikan dalam format list singkat (maksimal 5 poin).
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return response.text;
};
