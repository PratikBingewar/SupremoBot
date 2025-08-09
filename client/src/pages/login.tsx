import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import logoImage from "@assets/no bg logo_1754219816303.png";
import saraImage from "@assets/b29c6a04-837d-467d-b3f0-7e08c915893a_1754221628606.png";
import { Lock, User } from "lucide-react";

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simple authentication - Admin/Admin
    if (username.toLowerCase() === "admin" && password.toLowerCase() === "admin") {
      setTimeout(() => {
        // Store login state and redirect to dashboard
        localStorage.setItem('sara-logged-in', 'true');
        localStorage.setItem('sara-login-time', new Date().toISOString());
        onLogin();
        setIsLoading(false);
      }, 1000);
    } else {
      setTimeout(() => {
        setError("Invalid username or password");
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden p-4 sm:p-6 md:p-8">
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
      
      {/* SARA Background */}
      <div 
        className="absolute inset-0 opacity-10 sm:opacity-15"
        style={{
          backgroundImage: `url(${saraImage})`,
          backgroundSize: 'contain sm:cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Futuristic Glowing Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-5 sm:top-20 sm:left-10 opacity-20 sm:opacity-30">
          <div className="w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-xl animate-pulse"></div>
        </div>
        <div className="absolute bottom-10 right-5 sm:bottom-20 sm:right-10 opacity-20 sm:opacity-30">
          <div className="w-24 h-24 sm:w-40 sm:h-40 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      <Card className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-slate-800/90 backdrop-blur-sm shadow-2xl border border-slate-700/50 relative z-10">
        <CardHeader className="text-center pb-2 p-4 sm:p-6">
          <div className="flex justify-center mb-4 relative">
            {/* Jarvis-style blue glow rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 border-2 border-cyan-400/30 rounded-full animate-spin-slow"></div>
              <div className="absolute w-20 h-20 sm:w-28 sm:h-28 border border-blue-400/20 rounded-full animate-pulse"></div>
              <div className="absolute w-16 h-16 sm:w-24 sm:h-24 border border-cyan-300/40 rounded-full animate-ping"></div>
            </div>
            
            {/* SARA image in center */}
            <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-cyan-400 shadow-lg shadow-cyan-400/50 bg-gradient-to-br from-slate-800 to-slate-900">
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
              <div className="w-28 h-28 sm:w-36 sm:h-36 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full blur-xl animate-pulse"></div>
            </div>
          </div>
          <CardTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">S.A.R.A.</CardTitle>
        </CardHeader>
        
        <CardContent className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-cyan-400/50 backdrop-blur h-12 text-sm sm:text-base"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-cyan-400/50 backdrop-blur h-12 text-sm sm:text-base"
                  required
                />
              </div>
            </div>

            {error && (
              <Alert className="border-red-400/50 bg-red-500/20 backdrop-blur">
                <AlertDescription className="text-red-300 text-sm">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3 sm:py-2 transition-all duration-200 shadow-lg shadow-cyan-500/30 border border-cyan-400/30 text-sm sm:text-base font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-slate-400">
            <p>Demo Credentials:</p>
            <p className="font-mono text-cyan-400">Username: Admin | Password: Admin</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}