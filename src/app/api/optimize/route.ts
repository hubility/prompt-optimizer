import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = "AIzaSyBNxRIP_2e3LOM88YfZFo3Ntra2m-rLhwY" //process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    optimized_prompt: {
      type: Type.STRING,
      description: "The complete, enhanced, and optimized prompt, formatted in Markdown for readability (using headings, lists, bold text, etc.)."
    },
    improvements: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of 3-5 key improvements made. Each item MUST be a single, ultra-short sentence (maximum 10-12 words) in plain text without any markdown formatting, asterisks, or special characters."
    },
    tips: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of 3-5 practical tips. Each item MUST be a brief, actionable sentence (maximum 12-15 words) in plain text without any markdown formatting, asterisks, or special characters."
    },
    techniques_applied: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of specific prompt engineering techniques used (e.g., 'Role Prompting', 'Chain-of-Thought')."
    }
  },
  required: ['optimized_prompt', 'improvements', 'tips', 'techniques_applied']
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { originalPrompt, purpose, optionalParams } = body;

    if (!originalPrompt || !purpose) {
      return NextResponse.json(
        { error: 'Missing required fields: originalPrompt and purpose' },
        { status: 400 }
      );
    }

    const metaPrompt = `
    You are a world-class expert in prompt engineering. Your task is to optimize a user-provided prompt to maximize the quality and relevance of the results from AI systems.

    CONTEXT:
    - User's Goal/Purpose: ${purpose}
    - Optional Parameters Provided: ${JSON.stringify(optionalParams)}

    ORIGINAL PROMPT:
    "${originalPrompt}"

    YOUR TASK:
    Analyze the original prompt and the user's context. Rewrite and enhance the prompt by applying the best practices of prompt engineering. The final optimized prompt should be significantly more effective than the original.

    ---
    **CRITICAL FORMATTING INSTRUCTIONS:**
    Your entire response must be a single JSON object matching the provided schema.

    1.  **optimized_prompt Field:** This field MUST be a string formatted using clear and structured Markdown for maximum readability. Follow these rules strictly:
        *   **Use Headings:** Employ '#' and '##' for titles and main sections.
        *   **Use Paragraphs:** Separate distinct ideas into paragraphs. A paragraph is created by leaving a blank line (i.e., pressing Enter twice). **DO NOT** output a single, long wall of text.
        *   **Use Lists:** Use bullet points ('* ' or '- ') for key elements, parameters, or steps. Ensure each list item is on a new line.
        *   **Use Bold Text:** Use '**bold text**' to highlight crucial keywords and concepts.

    2.  **improvements Field:** This field MUST be an array of 3-5 ultra-short sentences (maximum 10-12 words each) in PLAIN TEXT. NO markdown, NO asterisks, NO special formatting. Each sentence should be direct and concise.
        Example: "Added specific technical parameters for better clarity"

    3.  **tips Field:** This field MUST be an array of 3-5 brief, actionable sentences (maximum 12-15 words each) in PLAIN TEXT. NO markdown, NO asterisks, NO special formatting.
        Example: "Use specific numbers and measurements for more precise results"

    4.  **techniques_applied Field:** This field MUST be an array of strings listing technique names only (e.g., 'Role Prompting', 'Chain-of-Thought').

    **GOOD FORMATTING EXAMPLE FOR 'optimized_prompt':**
    \`\`\`markdown
    ## Image Generation Prompt: Whimsical Green Dog

    A highly detailed, whimsical, and vibrant image of a **bright lime green Labrador puppy** joyfully eating a large, **vibrant strawberry ice cream cone**.

    ### Key Elements
    * **Subject:** A cute, young Labrador puppy with fur that is a distinct, cheerful lime green.
    * **Action:** The puppy is actively eating the ice cream, with its tongue out, a smear of pink ice cream on its snout.
    * **Setting:** A sunny, enchanting park scene with a softly blurred background (bokeh effect), featuring lush green foliage and a clear, bright blue sky.
    \`\`\`
    ---

    Return your response ONLY in the specified JSON format.
  `;

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: metaPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    const parsedResponse = JSON.parse(jsonText);

    if (!parsedResponse.optimized_prompt || !Array.isArray(parsedResponse.improvements) || !Array.isArray(parsedResponse.tips) || !Array.isArray(parsedResponse.techniques_applied)) {
      return NextResponse.json(
        { error: 'Invalid response format from AI' },
        { status: 500 }
      );
    }

    return NextResponse.json(parsedResponse);

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to optimize prompt' },
      { status: 500 }
    );
  }
}
