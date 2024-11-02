const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const studioRoutes = require('./routes/studioRoutes');
const rateLimit = require('express-rate-limit');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

connectDB();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api', limiter);

app.use('/api/studios', studioRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Studio Management Service running on port ${PORT}`);
});

