import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MessageBubble from "@/components/MessageBubble";
import TypingIndicator from "@/components/TypingIndicator";
import { useChat } from "@/hooks/useChat";
import { Send, MessageCircle, History, X, ArrowLeft } from "lucide-react";
import saraImage from "@assets/b29c6a04-837d-467d-b3f0-7e08c915893a_1754221628606.png";

export default function ChatInterface() {
  const [input, setInput] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, isLoading, chatHistory, loadChatHistory } = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const message = input.trim();
    setInput("");
    await sendMessage(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickSuggestions = [
    "What is Supremo",
    "What are the courses of Supremo",
    "Why Supremo is Better than Others"
  ];

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="relative h-screen flex flex-col w-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Futuristic Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px sm:50px sm:50px'
        }}></div>
      </div>

      {/* SARA Background Image - Center of chat screen */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div 
          className="absolute inset-0 flex items-center justify-center opacity-25"
          style={{
            backgroundImage: `url(${saraImage})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
          }}
        />
        
        {/* Futuristic Glowing Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-5 sm:top-20 sm:left-10 opacity-20 sm:opacity-30">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-xl animate-pulse"></div>
          </div>
          <div className="absolute bottom-10 right-5 sm:bottom-20 sm:right-10 opacity-20 sm:opacity-30">
            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          {/* Floating Trading Data - Hidden on mobile */}
          <div className="hidden md:block absolute top-1/4 right-20 opacity-40 animate-float">
            <div className="text-cyan-400 text-sm font-mono bg-slate-800/50 p-3 rounded-lg backdrop-blur border border-cyan-400/30">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Live Trading Data</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 p-3 sm:p-4 md:p-6">
        <div className="flex items-center justify-between">
          <Button
            onClick={() => window.location.href = '/dashboard'}
            variant="ghost"
            className="text-cyan-400 hover:text-cyan-300 hover:bg-slate-800/50 flex items-center space-x-2 p-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:block">Back to Dashboard</span>
          </Button>
          
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Jarvis-style SARA Logo */}
            <div className="relative">
              {/* Jarvis-style blue glow rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 border border-cyan-400/30 rounded-full animate-spin-slow"></div>
                <div className="absolute w-10 h-10 sm:w-14 sm:h-14 border border-blue-400/20 rounded-full animate-pulse"></div>
                <div className="absolute w-8 h-8 sm:w-12 sm:h-12 border border-cyan-300/40 rounded-full animate-ping"></div>
              </div>
              
              {/* SARA image in center */}
              <div className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-cyan-400 shadow-lg shadow-cyan-400/50 bg-gradient-to-br from-slate-800 to-slate-900">
                <img 
                  src={saraImage} 
                  alt="S.A.R.A." 
                  className="w-full h-full object-cover"
                />
                {/* Blue glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/20 via-transparent to-blue-400/20 rounded-full"></div>
              </div>
              
              {/* Outer glow effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full blur-xl animate-pulse"></div>
              </div>
            </div>
            
            <div className="text-center">
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">S.A.R.A.</h1>
              <p className="text-xs sm:text-sm text-slate-400">Supremo AI Response Assistant</p>
            </div>
          </div>
        </div>
        


          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white px-2 sm:px-3 py-2 rounded-lg flex items-center space-x-1 sm:space-x-2 border border-slate-600/50 hover:border-cyan-400/30 transition-all backdrop-blur touch-manipulation"
            >
              <History className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">History</span>
            </button>
          </div>
      </div>

      {/* Chat History Sidebar */}
      {showHistory && (
        <div className="fixed inset-0 z-20 sm:absolute sm:top-0 sm:right-0 sm:h-full sm:w-80 bg-slate-800/95 backdrop-blur-sm border-l border-slate-700/50 overflow-y-auto">
          <div className="p-3 sm:p-4 border-b border-slate-700/50 flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-semibold text-white">Chat History</h3>
            <button
              onClick={() => setShowHistory(false)}
              className="text-slate-400 hover:text-white p-1 rounded touch-manipulation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
            {chatHistory.length === 0 ? (
              <p className="text-slate-400 text-sm">No previous chats found</p>
            ) : (
              chatHistory.map((chat: any, index: number) => (
                <button
                  key={index}
                  onClick={() => {
                    loadChatHistory(chat.id);
                    setShowHistory(false);
                  }}
                  className="w-full text-left p-2.5 sm:p-3 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 hover:border-cyan-400/30 transition-all touch-manipulation"
                >
                  <div className="text-sm font-medium text-white truncate">{chat.title}</div>
                  <div className="text-xs text-slate-400 mt-1">{chat.date}</div>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-3 sm:space-y-4 relative z-10">
        {messages.length === 0 && (
          <>
            <MessageBubble
              message="Hey There, I am SARA your Stock Market AI Assistant. How can I help you ?"
              isBot={true}
              timestamp={new Date()}
            />
            
            {/* FAQ Section */}
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-xl border border-slate-700/50 mx-2 sm:mx-4">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-cyan-400 flex-shrink-0" />
                <span className="truncate">Frequently Asked Questions</span>
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {[
                  "What is Supremo",
                  "What are the courses of Supremo",
                  "Why Supremo is Better than Others",
                ].map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(question)}
                    className="w-full text-left p-2.5 sm:p-3 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 hover:border-cyan-400/30 transition-all text-slate-200 text-sm sm:text-base touch-manipulation backdrop-blur"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
        
        {messages.map((msg, index) => (
          <div key={index}>
            <MessageBubble
              message={msg.message}
              isBot={false}
              timestamp={msg.timestamp}
            />
            <MessageBubble
              message={msg.response}
              isBot={true}
              timestamp={msg.timestamp}
              isFiltered={msg.isFiltered}
            />
          </div>
        ))}
        
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-slate-700/50 bg-slate-900/95 backdrop-blur-sm p-3 sm:p-4 safe-area-inset-bottom relative z-10">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="flex-1 relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about trading, courses, or market insights..."
              className="w-full bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 rounded-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400/50 transition-all duration-200 text-sm sm:text-base backdrop-blur"
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-1.5 sm:right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-full w-7 h-7 sm:w-8 sm:h-8 p-0 transition-all duration-200 touch-manipulation shadow-lg shadow-cyan-500/30"
            >
              <Send className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>
          

        </div>
      </div>
    </div>
  );
}
