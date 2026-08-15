const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
connectDB();

// सर्व ओरिजिन्स आणि प्रीफ्लाइट रिक्वेस्ट्सना परवानगी देण्यासाठी
app.use(cors({
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200
}));

app.options('*', cors()); // Preflight request साठी महत्त्वाची ओळ

app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));