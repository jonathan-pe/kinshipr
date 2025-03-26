// server/server.ts
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './routes/users'

dotenv.config()

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(bodyParser.json())

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI as string)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Connected to MongoDB')
})

// Routes
app.use('/users', userRoutes)

// healthcheck
app.get('/healthcheck', (req, res) => {
  res.send('ok')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
