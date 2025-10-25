import type { PromptData, OptimizationResultData } from "@/types/types";

export const optimizePrompt = async (promptData: PromptData): Promise<OptimizationResultData> => {
  try {
    const response = await fetch('/api/optimize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(promptData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to optimize prompt');
    }

    const data = await response.json();
    return data as OptimizationResultData;

  } catch (error) {
    console.error("Error calling optimization API:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to optimize prompt. Please try again.");
  }
};

export const translateText = async (text: string, targetLanguage: string): Promise<string> => {
  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, targetLanguage }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to translate text');
    }

    const data = await response.json();
    return data.translatedText;

  } catch (error) {
    console.error("Error calling translation API:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to translate text. Please try again.");
  }
};
