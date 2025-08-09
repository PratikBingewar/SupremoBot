import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key" 
});

export interface ChatResponse {
  message: string;
  isError?: boolean;
}

export async function generateChatResponse(
  userMessage: string,
  pdfContext: string = ""
): Promise<ChatResponse> {
  try {
    const systemPrompt = `You are SupremoBot, a knowledgeable trading assistant for Supremo Traders Share Market Training Institute. 

IMPORTANT GUIDELINES:
- Focus only on trading, forex, cryptocurrency, stock market education, and Supremo Traders' courses/services
- Be helpful, professional, and encouraging
- Use the provided PDF content to answer questions about courses and services
- Do NOT discuss course fees or pricing - redirect users to contact the institute directly
- Keep responses concise but informative
- Use emojis sparingly and professionally

SUPREMO TRADERS INFORMATION:
- Established share market training institute
- Specializes in Stock Market, Forex, and Cryptocurrency training
- Offers comprehensive courses for beginners to advanced traders
- Multiple branches across Maharashtra (Aundh Pune, Swargate Pune, Ahilyanagar, Sangli, Sambhaji Nagar)
- Provides lifetime support and personalized trading plans

PDF CONTEXT:
${pdfContext}

Always be helpful and guide users toward learning and proper trading education.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    const botMessage = response.choices[0].message.content || "I apologize, but I couldn't generate a response. Please try again.";
    
    return {
      message: botMessage,
      isError: false
    };
  } catch (error) {
    console.error("OpenAI API error:", error);
    return {
      message: "I'm experiencing technical difficulties. Please try again in a moment.",
      isError: true
    };
  }
}
