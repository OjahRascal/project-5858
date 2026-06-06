import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";

dotenv.config();

// Define globals
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();
const PORT = 3000;

// Security Middleware
app.use(helmet({ 
    contentSecurityPolicy: false, // Disabled to prevent blocking Vite's dev server and inline scripts
    crossOriginEmbedderPolicy: false // Disabled for external resources (images, etc)
}));
app.use(cors());

// Rate Limiting to prevent DoS attacks
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // limit each IP to 1000 requests per windowMs
    message: { error: 'Too many requests from this IP, please try again after 15 minutes' }
});

app.use(limiter);

app.use(express.json());

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
