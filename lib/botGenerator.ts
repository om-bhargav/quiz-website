import {callGeminiWithRotation} from "@/lib/gemini";
import { GenerateBotNamesPrompt } from "@/lib/prompts";

export async function generateExactBotNames(count: number): Promise<string[]> {
  const allNames: string[] = [];
  let retryCount = 0;
  const MAX_RETRIES = 3;

  while (allNames.length < count && retryCount < MAX_RETRIES) {
    const needed = count - allNames.length;
    
    const requestCount = needed <= 2 ? 4 : needed + 3;

    try {
      const prompt = GenerateBotNamesPrompt(requestCount);
      const responseText = await callGeminiWithRotation(prompt);
      
      const cleanedJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
      const newNames = JSON.parse(cleanedJson);

      if (Array.isArray(newNames)) {
        const validNames = newNames.filter(n => typeof n === 'string' && n.length > 2);
        
        // Add only unique names
        validNames.forEach(name => {
            if (!allNames.includes(name)) {
                allNames.push(name);
            }
        });
      }
      
    } catch (error) {
      console.error("Error generating bot names:", error);
    }
    
    retryCount++;
  }

  if (allNames.length < count) {
    throw new Error(`Failed to generate ${count} bot names. Only got ${allNames.length}.`);
  }

  return allNames.slice(0, count);
}