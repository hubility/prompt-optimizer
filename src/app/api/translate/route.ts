import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";

const API_KEY = "AIzaSyBNxRIP_2e3LOM88YfZFo3Ntra2m-rLhwY" //process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, targetLanguage } = body;

    if (!text || !targetLanguage) {
      return NextResponse.json(
        { error: 'Missing required fields: text and targetLanguage' },
        { status: 400 }
      );
    }

    const prompt = `Translate the following text to ${targetLanguage}. The original text is in Markdown format, so preserve the Markdown syntax (like ##, *, **, etc.) in the translated text. Return ONLY the translated Markdown text, without any introductory phrases, comments, or explanations.\n\nTEXT TO TRANSLATE:\n"""\n${text}\n"""`;

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
      config: {
        temperature: 0.1,
      },
    });

    if (response && typeof response.text === 'string') {
      return NextResponse.json({ translatedText: response.text.trim() });
    }

    return NextResponse.json(
      { error: 'Invalid response from AI' },
      { status: 500 }
    );

  } catch (error) {
    console.error("Error calling Gemini API for translation:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to translate text' },
      { status: 500 }
    );
  }
}
