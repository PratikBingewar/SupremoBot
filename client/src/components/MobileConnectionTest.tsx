import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Wifi, WifiOff, CheckCircle, XCircle, RefreshCw } from "lucide-react";

interface ConnectionTestProps {
  onClose: () => void;
}

export function MobileConnectionTest({ onClose }: ConnectionTestProps) {
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'connected' | 'failed'>('testing');
  const [serverStatus, setServerStatus] = useState<'testing' | 'ok' | 'failed'>('testing');
  const [apiStatus, setApiStatus] = useState<'testing' | 'ok' | 'failed'>('testing');
  const [details, setDetails] = useState<string>('');

  const testConnection = async () => {
    setConnectionStatus('testing');
    setServerStatus('testing');
    setApiStatus('testing');
    setDetails('');

    try {
      // Test basic connectivity
      const online = navigator.onLine;
      if (!online) {
        setConnectionStatus('failed');
        setDetails('Device is offline. Please check your internet connection.');
        return;
      }
      setConnectionStatus('connected');

      // Test server health
      try {
        const healthResponse = await fetch("/api/health", {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });
        
        if (healthResponse.ok) {
          setServerStatus('ok');
          const healthData = await healthResponse.json();
          setDetails(prev => prev + `Server: ${healthData.server} - Status: ${healthData.status}\n`);
        } else {
          throw new Error(`Server returned ${healthResponse.status}`);
        }
      } catch (error) {
        setServerStatus('failed');
        setDetails(prev => prev + `Server connection failed: ${error}\n`);
        return;
      }

      // Test API functionality
      try {
        const apiResponse = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            message: "test connection", 
            sessionId: "connection_test_" + Date.now() 
          })
        });
        
        if (apiResponse.ok) {
          setApiStatus('ok');
          setDetails(prev => prev + 'API: Chat endpoint working correctly\n');
        } else {
          throw new Error(`API returned ${apiResponse.status}`);
        }
      } catch (error) {
        setApiStatus('failed');
        setDetails(prev => prev + `API test failed: ${error}\n`);
      }

    } catch (error) {
      setConnectionStatus('failed');
      setDetails(`Connection test failed: ${error}`);
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'testing':
        return <RefreshCw className="w-4 h-4 animate-spin text-blue-500" />;
      case 'ok':
      case 'connected':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <RefreshCw className="w-4 h-4 animate-spin text-blue-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'testing': return 'Testing...';
      case 'ok':
      case 'connected': return 'Connected';
      case 'failed': return 'Failed';
      default: return 'Unknown';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800/90 backdrop-blur border border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Wifi className="w-5 h-5 text-cyan-400" />
            <span>Connection Test</span>
          </CardTitle>
          <CardDescription className="text-slate-400">
            Testing S.A.R.A. connectivity for mobile devices
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Connection Status */}
          <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
            <span className="text-white">Internet Connection</span>
            <div className="flex items-center space-x-2">
              {getStatusIcon(connectionStatus)}
              <span className="text-sm text-slate-300">{getStatusText(connectionStatus)}</span>
            </div>
          </div>

          {/* Server Status */}
          <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
            <span className="text-white">Server Health</span>
            <div className="flex items-center space-x-2">
              {getStatusIcon(serverStatus)}
              <span className="text-sm text-slate-300">{getStatusText(serverStatus)}</span>
            </div>
          </div>

          {/* API Status */}
          <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
            <span className="text-white">Chat API</span>
            <div className="flex items-center space-x-2">
              {getStatusIcon(apiStatus)}
              <span className="text-sm text-slate-300">{getStatusText(apiStatus)}</span>
            </div>
          </div>

          {/* Details */}
          {details && (
            <Alert className="bg-slate-700/50 border-slate-600">
              <AlertDescription className="text-xs text-slate-300 font-mono whitespace-pre-line">
                {details}
              </AlertDescription>
            </Alert>
          )}

          {/* Actions */}
          <div className="flex space-x-2 pt-4">
            <Button
              onClick={testConnection}
              variant="outline"
              className="flex-1 border-slate-600 hover:bg-slate-700/50 text-slate-300"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Test Again
            </Button>
            <Button
              onClick={onClose}
              className="flex-1 bg-cyan-600 hover:bg-cyan-700"
            >
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}