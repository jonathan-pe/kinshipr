// server/server.ts
import 'module-alias/register'
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import { clerkMiddleware } from '@clerk/express'

import userRoutes from '@/routes/users'
import profileRoutes from '@/routes/userProfiles'
import clerkRoutes from '@/routes/clerk'
import { checkAuth } from '@/middleware/checkAuth'

dotenv.config()

const app = express()
const port = process.env.PORT || 4000

// Might need to include Clerk's webhooks URL in the allowed origins
const DEV_ALLOWED_ORIGINS = ['http://localhost:5173', 'https://your-production-url.com']

const PROD_ALLOWED_ORIGINS = ['https://your-production-url.com']

app.use(
  cors({
    credentials: true,
    origin: process.env.NODE_ENV === 'production' ? PROD_ALLOWED_ORIGINS : DEV_ALLOWED_ORIGINS,
  })
)
app.use(bodyParser.json())
app.use(clerkMiddleware())

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI as string)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Connected to MongoDB')
})

// healthcheck
app.get('/healthcheck', (req, res) => {
  res.send('ok')
})

// Routes
app.use('/users', checkAuth, userRoutes)
app.use('/profiles', checkAuth, profileRoutes)
app.use('/clerk', clerkRoutes)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
