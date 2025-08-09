import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import logoImage from "@assets/no bg logo_1754219816303.png";
import saraImage from "@assets/b4a9f179-475f-4c01-b148-68eef49dbfb2_1754221628608.png";
import vtMarketsLogo from "@assets/image_1754717116769.png";
import { 
  Users, 
  BookOpen, 
  Award, 
  TrendingUp, 
  MessageCircle, 
  MapPin, 
  Phone,
  Mail,
  LogOut,
  Star,
  Target,
  BarChart3,
  ExternalLink,
  Globe
} from "lucide-react";

interface DashboardProps {
  onStartChat: () => void;
  onLogout: () => void;
}

export default function Dashboard({ onStartChat, onLogout }: DashboardProps) {
  const courses = [
    "Stock Market Fundamentals",
    "Technical Analysis Mastery",
    "Forex Trading Complete Course",
    "Cryptocurrency Trading",
    "Options & Derivatives",
    "Intraday Trading Strategies"
  ];

  const teamMembers = [
    "Atul Kadam - Founder and CEO and Experienced Trader",
    "Sonia Vaish - Co Founder and Trader",
    "Pratik Bingewar - Co Mentor",
    "Ravi Mule - Co Mentor",
    "Mayur Kambhoje - Co Mentor",
    "Dnyaneshwar Domale - Co Mentor",
    "Amol Sable - Co Mentor",
    "Shubham Khamitkar - Admin",
    "Divya Sakatkar - Accounts",
    "Juhi Kamble - HR", 
    "Sanmati Pokal - HR",
    "Rithesh Mulchandani - Manager"
  ];

  const achievements = [
    "15+ Years in Stock Market Training",
    "10,000+ Successful Students",
    "95% Student Success Rate",
    "5 Branches Across Maharashtra",
    "Certified Training Programs",
    "Lifetime Support Guarantee"
  ];

  const stats = [
    { label: "Total Students", value: "10,000+", icon: Users, color: "text-blue-600" },
    { label: "Active Courses", value: "6", icon: BookOpen, color: "text-green-600" },
    { label: "Expert Mentors", value: "5", icon: Target, color: "text-purple-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
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
        className="fixed inset-0 opacity-10"
        style={{
          backgroundImage: `url(${saraImage})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat',
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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-15 sm:opacity-20">
          <div className="w-40 h-40 sm:w-60 sm:h-60 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        {/* Floating Trading Data - Hidden on mobile */}
        <div className="hidden md:block absolute top-1/4 right-20 opacity-40 animate-float">
          <div className="text-cyan-400 text-sm font-mono bg-slate-800/50 p-3 rounded-lg backdrop-blur border border-cyan-400/30">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>NIFTY: +1.2% ↗</span>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>SENSEX: +0.8% ↗</span>
            </div>
          </div>
        </div>
        
        <div className="hidden md:block absolute bottom-1/4 left-20 opacity-40 animate-float" style={{ animationDelay: '1s' }}>
          <div className="text-purple-400 text-sm font-mono bg-slate-800/50 p-3 rounded-lg backdrop-blur border border-purple-400/30">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span>BTC: +2.5% ↗</span>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span>ETH: +1.8% ↗</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-2xl border border-slate-700/50">
          <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-0 w-full sm:w-auto">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full p-2 flex items-center justify-center flex-shrink-0">
              <img 
                src={logoImage} 
                alt="Supremo Traders Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Supremo Traders</h1>
              <p className="text-cyan-400 font-medium text-xs sm:text-sm md:text-base hidden sm:block">शेअर मार्केट तर बरेच जण शिकवतात, पण आम्ही तुम्हाला शेअर मार्केटमधून पैसा कसा कमवायचा ते शिकवतो!</p>
              <p className="text-cyan-400 font-medium text-xs sm:hidden">Trade & Learn</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
            <Button 
              onClick={onStartChat}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-4 sm:px-6 py-3 sm:py-2 flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/30 border border-cyan-400/30 text-sm sm:text-base"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat with S.A.R.A.</span>
            </Button>
            <Button 
              onClick={() => window.open('https://supremo-bot-kadamatulp.replit.app', '_blank')}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-4 sm:px-6 py-3 sm:py-2 flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/30 border border-purple-400/30 text-sm sm:text-base"
            >
              <Globe className="w-4 h-4" />
              <span>Open Web App</span>
            </Button>
            <Button 
              onClick={onLogout}
              variant="outline"
              className="border-slate-600 hover:bg-slate-700/50 text-slate-300 hover:text-white flex items-center justify-center space-x-2 backdrop-blur py-3 sm:py-2 text-sm sm:text-base"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-slate-800/80 backdrop-blur-sm shadow-xl border border-slate-700/50 hover:shadow-2xl hover:border-cyan-400/30 transition-all duration-300 hover:bg-slate-800/90">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-slate-400">{stat.label}</p>
                    <p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur opacity-50"></div>
                    <stat.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${stat.color} relative z-10`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Courses */}
          <Card className="bg-slate-800/80 backdrop-blur-sm shadow-xl border border-slate-700/50 hover:border-green-400/30 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur opacity-50"></div>
                  <BookOpen className="w-5 h-5 text-green-400 relative z-10" />
                </div>
                <span className="text-white">Our Courses</span>
              </CardTitle>
              <CardDescription className="text-slate-400">Comprehensive trading education programs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {courses.map((course, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600/50 hover:border-green-400/30 transition-colors backdrop-blur">
                    <BarChart3 className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-sm font-medium text-slate-200">{course}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Team Members */}
          <Card className="bg-slate-800/80 backdrop-blur-sm shadow-xl border border-slate-700/50 hover:border-purple-400/30 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur opacity-50"></div>
                  <Users className="w-5 h-5 text-purple-400 relative z-10" />
                </div>
                <span className="text-white">Our Team</span>
              </CardTitle>
              <CardDescription className="text-slate-400">Meet our experienced team members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600/50 hover:border-purple-400/30 transition-colors backdrop-blur">
                    <Target className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span className="text-sm font-medium text-slate-200">{member}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="bg-slate-800/80 backdrop-blur-sm shadow-xl border border-slate-700/50 hover:border-orange-400/30 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full blur opacity-50"></div>
                  <Award className="w-5 h-5 text-orange-400 relative z-10" />
                </div>
                <span className="text-white">Achievements</span>
              </CardTitle>
              <CardDescription className="text-slate-400">Our success milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600/50 hover:border-orange-400/30 transition-colors backdrop-blur">
                    <Star className="w-4 h-4 text-orange-400 flex-shrink-0" />
                    <span className="text-sm font-medium text-slate-200">{achievement}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Broker Partnership Section */}
        <Card className="mt-6 sm:mt-8 bg-slate-800/80 backdrop-blur-sm shadow-xl border border-slate-700/50 hover:border-cyan-400/30 transition-all duration-300">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center space-x-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur opacity-50"></div>
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 relative z-10" />
              </div>
              <span className="text-white text-lg sm:text-xl">Recommended Brokers</span>
            </CardTitle>
            <CardDescription className="text-slate-400">
              Trusted trading partners for our students
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="bg-slate-700/50 rounded-lg border border-slate-600/50 p-6 hover:border-cyan-400/30 transition-colors">
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="flex-shrink-0">
                  <img 
                    src={vtMarketsLogo} 
                    alt="VT Markets Logo" 
                    className="h-12 sm:h-16 w-auto object-contain"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-semibold text-white mb-2">VT Markets</h3>
                  <p className="text-sm text-slate-300 mb-3">
                    Celebrating 10th Anniversary • ASIC & FSCA Regulated • 1000+ Trading Assets
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <span className="px-3 py-1 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-400/30 rounded-full text-xs text-green-300">
                      Zero Commission STP
                    </span>
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-400/30 rounded-full text-xs text-blue-300">
                      0.0 Pips ECN
                    </span>
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-400/30 rounded-full text-xs text-purple-300">
                      Up to 500:1 Leverage
                    </span>
                    <span className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 border border-cyan-400/30 rounded-full text-xs text-cyan-300">
                      $50 Min Deposit
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10 hover:border-cyan-400"
                    onClick={() => window.open('https://vtmarkets.com', '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm text-slate-300">
                    <strong className="text-cyan-300">S.A.R.A. Integration:</strong> Ask me about VT Markets account types, spreads, fees, platforms, and how to get started with live trading.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="mt-6 sm:mt-8 bg-slate-800/80 backdrop-blur-sm shadow-xl border border-slate-700/50">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center space-x-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur opacity-50"></div>
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 relative z-10" />
              </div>
              <span className="text-white text-lg sm:text-xl">Our Branches</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="space-y-2 p-3 bg-slate-700/50 rounded-lg border border-slate-600/50">
                <h4 className="font-semibold text-white">Aundh, Pune</h4>
                <p className="text-sm text-slate-400">Main Branch & Training Center</p>
              </div>
              <div className="space-y-2 p-3 bg-slate-700/50 rounded-lg border border-slate-600/50">
                <h4 className="font-semibold text-white">Swargate, Pune</h4>
                <p className="text-sm text-slate-400">Branch Office</p>
              </div>
              <div className="space-y-2 p-3 bg-slate-700/50 rounded-lg border border-slate-600/50">
                <h4 className="font-semibold text-white">Ahilyanagar</h4>
                <p className="text-sm text-slate-400">Regional Center</p>
              </div>
              <div className="space-y-2 p-3 bg-slate-700/50 rounded-lg border border-slate-600/50">
                <h4 className="font-semibold text-white">Sangli</h4>
                <p className="text-sm text-slate-400">Training Hub</p>
              </div>
              <div className="space-y-2 p-3 bg-slate-700/50 rounded-lg border border-slate-600/50">
                <h4 className="font-semibold text-white">Sambhaji Nagar</h4>
                <p className="text-sm text-slate-400">Branch Office</p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-700/50 flex flex-col sm:flex-row justify-between items-center">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-medium text-slate-300">+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-medium text-slate-300">info@supremotraders.com</span>
                </div>
              </div>
              
              <Button 
                onClick={onStartChat}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-2 flex items-center space-x-2 shadow-lg shadow-cyan-500/30 border border-cyan-400/30"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Start Trading Journey with S.A.R.A.</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}