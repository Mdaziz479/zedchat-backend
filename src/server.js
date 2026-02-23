import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "node:path";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import userdataRoutes from "./routes/userdata.route.js";

import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 5002;
const __dirname = path.resolve();

/* ================= CORS CONFIG ================= */

const isOriginAllowed = (origin) => {
  if (!origin) return true;

  // Allow all DevTunnel domains
  if (origin.endsWith(".devtunnels.ms")) return true;

  // Allow GitHub Pages
  if (origin.endsWith(".github.io")) return true;

  // Allow Railway
  if (
    origin.endsWith(".railway.app") ||
    origin.endsWith(".up.railway.app")
  )
    return true;

  // Allow localhost (development)
  if (origin.startsWith("http://localhost")) return true;

  return false;
};

app.use(
  cors({
    origin: (origin, callback) => {
      if (isOriginAllowed(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

/* =============================================== */

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/userdata", userdataRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend", "dist", "index.html")
    );
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});