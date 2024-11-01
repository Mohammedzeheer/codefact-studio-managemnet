const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const studioRoutes = require('./routes/studioRoutes');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/studios', studioRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Studio Management Service running on port ${PORT}`);
});

