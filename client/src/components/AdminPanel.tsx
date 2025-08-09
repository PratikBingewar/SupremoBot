import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Shield, MessageSquare, FileText, Upload, Trash2, LogOut } from "lucide-react";

export default function AdminPanel() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Check authentication status
  const { data: authStatus } = useQuery<{ authenticated: boolean }>({
    queryKey: ["/api/admin/check"],
    enabled: !isAuthenticated,
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (creds: { username: string; password: string }) => {
      const response = await apiRequest("POST", "/api/admin/login", creds);
      return response.json();
    },
    onSuccess: () => {
      setIsAuthenticated(true);
      toast({ title: "Login successful" });
    },
    onError: () => {
      toast({ title: "Invalid credentials", variant: "destructive" });
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/admin/logout");
      return response.json();
    },
    onSuccess: () => {
      setIsAuthenticated(false);
      setCredentials({ username: "", password: "" });
      queryClient.clear();
      toast({ title: "Logged out successfully" });
    },
  });

  // Get chat logs
  const { data: chatLogs = [] } = useQuery<any[]>({
    queryKey: ["/api/admin/chat-logs"],
    enabled: isAuthenticated || authStatus?.authenticated,
  });

  // Get PDFs
  const { data: pdfs = [] } = useQuery<any[]>({
    queryKey: ["/api/admin/pdfs"],
    enabled: isAuthenticated || authStatus?.authenticated,
  });

  // Upload PDF mutation
  const uploadPdfMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("pdf", file);
      const response = await fetch("/api/admin/upload-pdf", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (!response.ok) throw new Error("Upload failed");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pdfs"] });
      toast({ title: "PDF uploaded successfully" });
    },
    onError: () => {
      toast({ title: "Upload failed", variant: "destructive" });
    },
  });

  // Delete PDF mutation
  const deletePdfMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest("DELETE", `/api/admin/pdfs/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pdfs"] });
      toast({ title: "PDF deleted successfully" });
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(credentials);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      uploadPdfMutation.mutate(file);
    } else {
      toast({ title: "Please select a PDF file", variant: "destructive" });
    }
  };

  const isLoggedIn = isAuthenticated || authStatus?.authenticated;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Shield className="w-12 h-12 text-supremo-blue" />
            </div>
            <CardTitle className="text-2xl text-supremo-blue">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="text"
                placeholder="Username"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                required
              />
              <Button
                type="submit"
                className="w-full bg-supremo-blue hover:bg-supremo-light-blue"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-supremo-blue flex items-center gap-2">
          <Shield className="w-8 h-8" />
          Admin Panel
        </h1>
        <Button
          onClick={() => logoutMutation.mutate()}
          variant="outline"
          className="flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>

      <Tabs defaultValue="chat-logs" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat-logs" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Chat Logs
          </TabsTrigger>
          <TabsTrigger value="pdfs" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            PDF Management
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat-logs">
          <Card>
            <CardHeader>
              <CardTitle>Recent Chat Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {chatLogs.map((log: any) => (
                  <div key={log.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant={log.isFiltered ? "destructive" : "secondary"}>
                        {log.isFiltered ? "Filtered" : "Allowed"}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {format(new Date(log.timestamp), "MMM dd, yyyy HH:mm")}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <strong>User:</strong> {log.message}
                      </div>
                      <div>
                        <strong>Bot:</strong> {log.response}
                      </div>
                      {log.filterReason && (
                        <div className="text-sm text-red-600">
                          <strong>Filter Reason:</strong> {log.filterReason}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {chatLogs.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No chat logs yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pdfs">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload New PDF
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  disabled={uploadPdfMutation.isPending}
                />
                {uploadPdfMutation.isPending && (
                  <p className="text-sm text-gray-500 mt-2">Uploading...</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Uploaded PDFs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pdfs.map((pdf: any) => (
                    <div key={pdf.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{pdf.filename}</p>
                        <p className="text-sm text-gray-500">
                          Uploaded {format(new Date(pdf.uploadedAt), "MMM dd, yyyy")}
                        </p>
                      </div>
                      <Button
                        onClick={() => deletePdfMutation.mutate(pdf.id)}
                        variant="destructive"
                        size="sm"
                        disabled={deletePdfMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  {pdfs.length === 0 && (
                    <p className="text-center text-gray-500 py-8">No PDFs uploaded yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
