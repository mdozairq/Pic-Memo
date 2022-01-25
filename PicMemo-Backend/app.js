import express from "express";
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import cors from 'cors';
import postRouter from './routes/posts.js'
import userRouter from './routes/users.js'
import dotenv from 'dotenv'

const app = express();
dotenv.config();
const CONNECTION_URL="mongodb://localhost:27017/picMemo"

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/posts', postRouter);
app.use('/user', userRouter);

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server is Running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

//mongoose.set("useFindAndModify", false);