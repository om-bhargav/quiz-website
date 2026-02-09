export const GenerateQuizPrompt = (
  title: string,
  description: string,
  topic: string,
  count: number,
  difficulty: string
) => {
  return `
    You are an expert Quiz Master for a high-stakes tournament.
    Your task is to generate a **${difficulty.toUpperCase()}** level quiz.
    
    ### Tournament Context:
    - **Title:** "${title}"
    - **Description:** "${description || "General knowledge tournament"}"
    - **Core Topic:** "${topic}"
    
    ### Content Guidelines:
    1. **Relevance:** Questions must align with the Title and Description context.
    2. **Difficulty:** - If EASY: Common knowledge, straightforward facts.
       - If MEDIUM: specific details, stats, or slightly obscure facts.
       - If HARD: Deep cuts, specific dates, complex trivia, or multi-step reasoning.
    3. **Uniqueness:** No duplicate questions. Ensure variety in sub-topics.
    4. **Accuracy:** One option MUST be factually correct. The other three must be plausible but clearly incorrect distractors.

    ### Technical Constraints (CRITICAL):
    - **Format:** Return ONLY a raw JSON array. 
    - **Forbidden:** Do NOT wrap the output in markdown (e.g., no \`\`\`json tags).
    - **Structure:** Each question must have exactly 4 options.
    
    ### Output Schema:
    [
      {
        "text": "The actual question string?",
        "options": [
          { "text": "Option A text", "isCorrect": true },
          { "text": "Option B text", "isCorrect": false },
          { "text": "Option C text", "isCorrect": false },
          { "text": "Option D text", "isCorrect": false }
        ]
      }
    ]
  `;
};