import { format } from "date-fns";
import { User, AlertTriangle } from "lucide-react";
import saraImage from "@assets/b29c6a04-837d-467d-b3f0-7e08c915893a_1754221628606.png";

interface MessageBubbleProps {
  message: string;
  isBot: boolean;
  timestamp: Date;
  isFiltered?: boolean;
}

export default function MessageBubble({ message, isBot, timestamp, isFiltered }: MessageBubbleProps) {
  if (isBot) {
    return (
      <div className="flex items-start space-x-2 sm:space-x-3 animate-fade-in">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden border-2 border-blue-600">
          <img 
            src={saraImage} 
            alt="S.A.R.A." 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className={`bg-white rounded-2xl rounded-tl-md p-3 sm:p-4 shadow-md border max-w-full sm:max-w-2xl ${isFiltered ? 'border-orange-200 bg-orange-50' : 'border-blue-100'}`}>
            {isFiltered && (
              <div className="flex items-center space-x-2 mb-2 text-orange-600">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs font-medium">Content Filtered</span>
              </div>
            )}
            <div 
              className="text-gray-800 whitespace-pre-wrap break-words text-sm sm:text-base message-content"
              dangerouslySetInnerHTML={{
                __html: message
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em>$1</em>')
                  .replace(/\n/g, '<br>')
              }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1 ml-2">
            {format(timestamp, "h:mm a")}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start space-x-2 sm:space-x-3 justify-end animate-fade-in">
      <div className="flex-1 text-right min-w-0">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl rounded-tr-md p-3 sm:p-4 shadow-md inline-block max-w-full sm:max-w-md">
          <p className="whitespace-pre-wrap break-words text-sm sm:text-base">{message}</p>
        </div>
        <div className="text-xs text-gray-500 mt-1 mr-2">
          {format(timestamp, "h:mm a")}
        </div>
      </div>
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
        <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
      </div>
    </div>
  );
}