import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";

interface ChatMessage {
  message: string;
  response: string;
  timestamp: Date;
  isFiltered?: boolean;
}

interface ChatHistoryItem {
  id: string;
  title: string;
  date: string;
  messages: ChatMessage[];
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save current chat to history
  const saveCurrentChatToHistory = (messages: ChatMessage[]) => {
    if (messages.length === 0) return;

    const chatId = Date.now().toString();
    const firstMessage = messages[0].message;
    const title = firstMessage.length > 30 ? firstMessage.substring(0, 30) + '...' : firstMessage;
    
    const newChatHistory: ChatHistoryItem = {
      id: chatId,
      title,
      date: new Date().toLocaleDateString(),
      messages: [...messages]
    };

    const updatedHistory = [newChatHistory, ...chatHistory].slice(0, 10); // Keep only last 10 chats
    setChatHistory(updatedHistory);
    localStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
  };

  const sendMessage = async (message: string) => {
    setIsLoading(true);
    try {
      // Check connectivity first with timeout
      const healthController = new AbortController();
      const healthTimeout = setTimeout(() => healthController.abort(), 5000);
      
      try {
        const healthCheck = await fetch("/api/health", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          signal: healthController.signal
        });
        clearTimeout(healthTimeout);
        
        if (!healthCheck.ok) {
          throw new Error("Server connectivity issue");
        }
      } catch (healthError) {
        clearTimeout(healthTimeout);
        throw new Error("Sorry, I'm having trouble connecting right now. Please check your internet connection and try again.");
      }

      // Send chat message with timeout
      const chatController = new AbortController();
      const chatTimeout = setTimeout(() => chatController.abort(), 15000);
      const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, sessionId }),
        signal: chatController.signal
      });
      
      clearTimeout(chatTimeout);

      if (!response.ok) {
        if (response.status === 0 || response.status >= 500) {
          throw new Error("Sorry, I'm having trouble connecting right now. Please try again later.");
        } else if (response.status === 404) {
          throw new Error("Service temporarily unavailable. Please try again in a moment.");
        } else {
          throw new Error("Failed to send message. Please try again.");
        }
      }

      const data = await response.json();

      const newMessage: ChatMessage = {
        message,
        response: data.response,
        timestamp: new Date(),
        isFiltered: data.isFiltered
      };

      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      
      // Save to history after first message
      if (updatedMessages.length === 1) {
        saveCurrentChatToHistory(updatedMessages);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Mobile-specific error handling
      let errorResponse = "Sorry, I'm having trouble connecting right now. Please try again later.";
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorResponse = "Request timed out. Please try again with a shorter message.";
        } else if (error.message.includes("connectivity") || error.message.includes("connecting")) {
          errorResponse = error.message;
        } else if (error.message.includes("Network request failed") || error.message.includes("fetch")) {
          errorResponse = "Network connection issue. Please check your internet and try again.";
        } else if (error.message.includes("Failed to fetch")) {
          errorResponse = "Unable to reach server. Please check your connection and try again.";
        }
      }
      
      const errorMessage: ChatMessage = {
        message,
        response: errorResponse,
        timestamp: new Date(),
        isFiltered: false
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadChatHistory = (chatId: string) => {
    const chat = chatHistory.find(c => c.id === chatId);
    if (chat) {
      setMessages(chat.messages);
    }
  };

  const clearCurrentChat = () => {
    if (messages.length > 0) {
      saveCurrentChatToHistory(messages);
    }
    setMessages([]);
  };

  return {
    messages,
    sendMessage,
    isLoading,
    chatHistory,
    loadChatHistory,
    clearCurrentChat,
  };
}
