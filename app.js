import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user-routes';
import adminRouter from './routes/admin-routes';
import movieRouter from './routes/movie-routes';
import bookingsRouter from './routes/booking-routes';
import cors from 'cors';

dotenv.config();
const app = express();

// Middlewares
//var cors = require('cors');
app.use(cors());
app.use(express.json());
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/movie', movieRouter);
app.use('/booking', bookingsRouter);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(
        `Connected To Database And Server is running on port ${port}`
      );
    });
  })
  .catch((e) => console.log(e));
