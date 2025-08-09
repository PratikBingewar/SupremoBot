interface ChatMessage {
  message: string;
  response: string;
  timestamp: Date;
  isFiltered?: boolean;
}

const STORAGE_KEY = "supremo_chat_history";
const MAX_MESSAGES = 50; // Limit stored messages

export function saveChatMessage(message: ChatMessage): void {
  try {
    const history = loadChatHistory();
    const updatedHistory = [...history, message].slice(-MAX_MESSAGES);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error("Failed to save chat message:", error);
  }
}

export function loadChatHistory(): ChatMessage[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    return parsed.map((msg: any) => ({
      ...msg,
      timestamp: new Date(msg.timestamp)
    }));
  } catch (error) {
    console.error("Failed to load chat history:", error);
    return [];
  }
}

export function clearChatHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear chat history:", error);
  }
}
