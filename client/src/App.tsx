import { useState, useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import ChatInterface from "@/components/ChatInterface";
import AdminPage from "@/pages/admin";

type AppState = 'login' | 'dashboard' | 'chat' | 'admin';

function App() {
  const [currentView, setCurrentView] = useState<AppState>('login');
  const [isLoading, setIsLoading] = useState(true);

  // Check for persistent login state on app startup
  useEffect(() => {
    const checkLoginState = () => {
      const isLoggedIn = localStorage.getItem('sara-logged-in');
      if (isLoggedIn === 'true') {
        setCurrentView('dashboard');
      }
      setIsLoading(false);
    };

    checkLoginState();
  }, []);

  const handleLogin = () => {
    localStorage.setItem('sara-logged-in', 'true');
    setCurrentView('dashboard');
  };

  const handleStartChat = () => {
    setCurrentView('chat');
  };

  const handleLogout = () => {
    localStorage.removeItem('sara-logged-in');
    setCurrentView('login');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleGoToAdmin = () => {
    setCurrentView('admin');
  };

  // Show loading screen while checking login state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-cyan-400 text-lg font-medium">Loading S.A.R.A...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {currentView === 'login' && <Login onLogin={handleLogin} />}
        {currentView === 'dashboard' && (
          <Dashboard onStartChat={handleStartChat} onLogout={handleLogout} />
        )}
        {currentView === 'chat' && (
          <div className="relative">
            <div className="absolute top-4 left-4 z-30">
              <button
                onClick={handleBackToDashboard}
                className="bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white px-3 py-2 rounded-lg flex items-center space-x-2 border border-slate-600/50 hover:border-cyan-400/30 transition-all backdrop-blur"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="hidden sm:inline">Back to Dashboard</span>
              </button>
            </div>
            <ChatInterface />
          </div>
        )}
        {currentView === 'admin' && <AdminPage />}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
