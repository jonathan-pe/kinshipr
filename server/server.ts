// server/server.ts
import 'module-alias/register'
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import { clerkMiddleware, requireAuth } from '@clerk/express'

import userRoutes from '@/routes/users'
import profileRoutes from '@/routes/userProfiles'

dotenv.config()

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
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
app.use(requireAuth())
app.use('/users', userRoutes)
app.use('/profile', profileRoutes)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
