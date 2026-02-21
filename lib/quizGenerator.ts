import {callGeminiWithRotation} from "@/lib/gemini";
import { GenerateQuizPrompt } from "@/lib/prompts";

interface QuizParams {
  title: string;
  description: string;
  category: string;
  difficulty: string;
  count: number;
}

export async function generateExactQuestions(params: QuizParams) {
  const { title, description, category, difficulty, count } = params;
  
  let allQuestions: any[] = [];
  let retryCount = 0;
  const MAX_RETRIES = 3;

  while (allQuestions.length < count && retryCount < MAX_RETRIES) {
    const needed = count - allQuestions.length;
    
    const requestCount = needed <= 2 ? 3 : needed + 2;

    try {
      const prompt = GenerateQuizPrompt(
        title, 
        description, 
        category, 
        requestCount, 
        difficulty
      );
      const responseText = await callGeminiWithRotation(prompt);
      
      const cleanedJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
      const newQuestions = JSON.parse(cleanedJson);

      if (Array.isArray(newQuestions)) {
        const validQuestions = newQuestions.filter(q => 
          q.text && Array.isArray(q.options) && q.options.length === 4
        );
        
        allQuestions = [...allQuestions, ...validQuestions];
      }
      
    } catch (error) {
      console.error("Error generating questions:", error);
    }
    
    retryCount++;
  }

  if (allQuestions.length < count) {
    throw new Error(`Failed to generate ${count} questions. Only got ${allQuestions.length}.`);
  }

  return allQuestions.slice(0, count);
}