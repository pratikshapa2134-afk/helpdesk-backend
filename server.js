const express = require('express');
const cors = require('cors'); // 1. ha package install aahe na? npm i cors
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

const app = express();

// 2. HA CORS CODE TAK - SARVAT VAR
app.use(cors({
  origin: 'https://helpdesk-frontend-flame.vercel.app', // Tuzha Vercel cha URL
  credentials: true
}));

app.use(express.json());

// 3. Routes
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));