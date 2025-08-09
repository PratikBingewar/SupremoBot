import logoImage from "@assets/no bg logo_1754219816303.png";

export default function LogoHeader() {
  return (
    <header className="bg-blue-600 text-white p-3 sm:p-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center space-x-2 sm:space-x-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full p-1.5 sm:p-2 flex items-center justify-center flex-shrink-0">
          <img 
            src={logoImage} 
            alt="Supremo Traders Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        <div className="min-w-0">
          <h1 className="text-lg sm:text-2xl font-bold truncate">S.A.R.A.</h1>
          <p className="text-blue-200 text-xs sm:text-sm truncate">Supremo AI Response Assistant</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-xs sm:text-sm">Online</span>
      </div>
    </header>
  );
}