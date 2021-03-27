import dotenv from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser'

dotenv.config()

import router from './api/api'

const app = express()

// DISABLE x-powered-by (USE HELMET LATER)
app.disable('x-powered-by');

// Body and cookie parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())

// Router
router(app)

// Set port and listen
const port = 5000;
app.listen(port, () => console.log(`API listening on ${port}`))