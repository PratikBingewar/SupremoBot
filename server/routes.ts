import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateChatResponse } from "./groqAI";
import { filterContent } from "./contentFilter";
import { parsePdfContent, sanitizePdfContent } from "./pdfParser";
import multer from "multer";
import session from "express-session";
import { z } from "zod";

const upload = multer({ dest: 'uploads/' });

export async function registerRoutes(app: Express): Promise<Server> {
  // Session middleware for admin authentication
  app.use(session({
    secret: process.env.SESSION_SECRET || 'supremo-traders-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 hours
  }));

  // Health check endpoint for mobile connectivity
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      server: "S.A.R.A. API",
      mobile: true
    });
  });

  // Chat endpoint with mobile error handling
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, sessionId } = req.body;
      
      if (!message || !sessionId) {
        return res.status(400).json({ 
          error: "Message and sessionId are required",
          mobile: true 
        });
      }

      // Filter content
      const filterResult = filterContent(message);
      
      if (!filterResult.isAllowed) {
        // Log filtered message
        await storage.createChatMessage({
          message,
          response: filterResult.reason || "Content filtered",
          isFiltered: true,
          filterReason: filterResult.reason,
          sessionId
        });
        
        return res.json({
          response: filterResult.reason,
          isFiltered: true
        });
      }

      // Get PDF context
      const pdfContents = await storage.getAllPdfContent();
      const pdfContext = pdfContents.map(pdf => pdf.content).join('\n\n');

      // Generate AI response
      const aiResponse = await generateChatResponse(message, pdfContext);
      
      // Store chat message
      await storage.createChatMessage({
        message,
        response: aiResponse.message,
        isFiltered: false,
        sessionId
      });

      res.json({
        response: aiResponse.message,
        isFiltered: false
      });

    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Admin login
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      const admin = await storage.getAdminByUsername(username);
      if (!admin || admin.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      (req.session as any).adminId = admin.id;
      res.json({ success: true });

    } catch (error) {
      console.error("Admin login error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Admin logout
  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });

  // Check admin auth
  app.get("/api/admin/check", (req, res) => {
    const isAuthenticated = !!(req.session as any)?.adminId;
    res.json({ authenticated: isAuthenticated });
  });

  // Get chat logs (admin only)
  app.get("/api/admin/chat-logs", async (req, res) => {
    try {
      if (!(req.session as any)?.adminId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const limit = parseInt(req.query.limit as string) || 100;
      const messages = await storage.getChatMessages(limit);
      res.json(messages);

    } catch (error) {
      console.error("Get chat logs error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Upload PDF (admin only)
  app.post("/api/admin/upload-pdf", upload.single('pdf'), async (req, res) => {
    try {
      if (!(req.session as any)?.adminId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      if (!req.file) {
        return res.status(400).json({ error: "No PDF file uploaded" });
      }

      const content = await parsePdfContent(req.file.path);
      const sanitizedContent = sanitizePdfContent(content);

      await storage.createPdfContent({
        filename: req.file.originalname,
        content: sanitizedContent
      });

      // Clean up uploaded file
      require('fs').unlinkSync(req.file.path);

      res.json({ success: true, message: "PDF uploaded successfully" });

    } catch (error) {
      console.error("PDF upload error:", error);
      res.status(500).json({ error: "Failed to process PDF" });
    }
  });

  // Get PDF list (admin only)
  app.get("/api/admin/pdfs", async (req, res) => {
    try {
      if (!(req.session as any)?.adminId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const pdfs = await storage.getAllPdfContent();
      res.json(pdfs);

    } catch (error) {
      console.error("Get PDFs error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Delete PDF (admin only)
  app.delete("/api/admin/pdfs/:id", async (req, res) => {
    try {
      if (!(req.session as any)?.adminId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const success = await storage.deletePdfContent(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "PDF not found" });
      }

      res.json({ success: true });

    } catch (error) {
      console.error("Delete PDF error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
