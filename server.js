const express = require('express');
const cors = require('cors');
const app = express();

// HA CODE SARVAT IMPORTANT AAHE
app.use(cors({
  origin: ["https://helpdesk-frontend-flame.vercel.app", "http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());

// ... baki tujhe routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));

app.listen(process.env.PORT || 5000);