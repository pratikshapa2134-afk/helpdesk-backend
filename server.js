const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: [
      "https://helpdesk-frontend-npwc.vercel.app",
      "https://helpdesk-frontend-dabcxqion-bpp5.vercel.app",
      "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

// Normal API routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));

// Temporary compatibility routes
// Frontend currently sending /api/api/...
app.use("/api/api/auth", require("./routes/authRoutes"));
app.use("/api/api/tickets", require("./routes/ticketRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});