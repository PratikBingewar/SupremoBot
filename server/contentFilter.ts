export interface FilterResult {
  isAllowed: boolean;
  reason?: string;
}

const BLOCKED_KEYWORDS = [
  // Course fee related
  'fee', 'fees', 'cost', 'price', 'pricing', 'amount', 'money', 'payment', 'charge',
  'how much', 'what is the cost', 'what does it cost', 'rupees', 'rs.',
  
  // Personal/identity questions
  'who are you', 'what are you', 'your name', 'personal information',
  'where do you live', 'your age', 'your background',
  
  // Weak points / negative questions
  'weak points', 'weakness', 'weaknesses', 'disadvantages', 'problems', 'issues',
  'negative', 'bad', 'worst', 'poor', 'lacking', 'drawbacks', 'cons',
  
  // Personal life of mentors/team
  'personal life', 'family', 'wife', 'husband', 'children', 'home', 'private',
  'relationship', 'married', 'single', 'dating', 'girlfriend', 'boyfriend',
  
  // Vulgar/offensive content (basic examples)
  'damn', 'hell', 'stupid', 'idiot', 'fool',
];

const NON_FINANCIAL_TOPICS = [
  'weather', 'sports', 'movies', 'music', 'food', 'travel', 'politics',
  'health', 'medicine', 'relationships', 'dating', 'entertainment',
  'gaming', 'fashion', 'shopping', 'recipes', 'cooking'
];

const DOCUMENT_RELATED_KEYWORDS = [
  'pdf', 'document', 'file upload', 'attachment', 'download',
  'upload document', 'pdf file', 'file download', 'document upload'
];

export function filterContent(message: string): FilterResult {
  const lowerMessage = message.toLowerCase();
  
  // Check for course fee related questions
  const feeKeywords = ['fee', 'fees', 'cost', 'price', 'pricing', 'amount', 'money', 'payment', 'charge', 'how much', 'what is the cost', 'rupees', 'rs.'];
  if (feeKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return {
      isAllowed: false,
      reason: "Course fee inquiries should be directed to our admissions team. Please contact us directly for pricing information."
    };
  }
  
  // Check for weak points / negative questions
  const weakPointKeywords = ['weak points', 'weakness', 'weaknesses', 'disadvantages', 'problems', 'issues', 'negative', 'bad', 'worst', 'poor', 'lacking', 'drawbacks', 'cons'];
  if (weakPointKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return {
      isAllowed: false,
      reason: "This bot does not respond to questions other than stock market"
    };
  }
  
  // Check for personal life questions about mentors/team
  const personalLifeKeywords = ['personal life', 'family', 'wife', 'husband', 'children', 'home', 'private', 'relationship', 'married', 'single', 'dating', 'girlfriend', 'boyfriend'];
  if (personalLifeKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return {
      isAllowed: false,
      reason: "This bot does not respond to questions other than stock market"
    };
  }
  
  // Check for personal/identity questions
  const personalKeywords = ['who are you', 'what are you', 'your name', 'personal information', 'where do you live', 'your age'];
  if (personalKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return {
      isAllowed: false,
      reason: "I'm S.A.R.A., your trading assistant. Let's focus on trading and market education topics!"
    };
  }
  
  // Check for vulgar/offensive content
  const vulgarKeywords = ['damn', 'hell', 'stupid', 'idiot', 'fool'];
  if (vulgarKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return {
      isAllowed: false,
      reason: "Please keep our conversation professional and respectful."
    };
  }
  
  // Check for non-financial topics
  if (NON_FINANCIAL_TOPICS.some(topic => lowerMessage.includes(topic))) {
    return {
      isAllowed: false,
      reason: "This bot does not respond to questions other than stock market"
    };
  }
  
  // Check for document/file related questions
  if (DOCUMENT_RELATED_KEYWORDS.some(keyword => lowerMessage.includes(keyword))) {
    return {
      isAllowed: false,
      reason: "I focus on providing trading education and information. Please ask me about stock market, forex, cryptocurrency, or Supremo Traders courses."
    };
  }
  
  return { isAllowed: true };
}
