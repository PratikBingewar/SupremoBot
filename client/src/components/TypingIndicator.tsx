import saraImage from "@assets/b29c6a04-837d-467d-b3f0-7e08c915893a_1754221628606.png";

export default function TypingIndicator() {
  return (
    <div className="flex items-start space-x-2 sm:space-x-3 animate-fade-in">
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden border-2 border-blue-600">
        <img 
          src={saraImage} 
          alt="S.A.R.A." 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="bg-white rounded-2xl rounded-tl-md p-3 sm:p-4 shadow-md border border-blue-100 w-16 sm:w-20">
          <div className="flex space-x-1">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-typing"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-typing" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-typing" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}