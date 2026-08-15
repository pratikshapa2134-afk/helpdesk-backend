const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Saglyanna permission
app.use(express.json());

app.get('/', (req,res) => res.send('API is running')); // Test sathi

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));

app.listen(process.env.PORT || 5000, () => console.log('Server running'));