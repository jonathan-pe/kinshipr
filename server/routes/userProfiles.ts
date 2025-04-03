// server/routes/userProfiles.ts
import express from 'express'
import { getProfile } from '../controllers/userProfiles'

const router = express.Router()

router.get('/:userId', getProfile)

export default router
