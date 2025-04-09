// server/routes/userProfiles.ts
import express from 'express'
import { getCurrentUserProfile, getProfile, updateProfile } from '../controllers/userProfiles'

const router = express.Router()

router.get('/me', getCurrentUserProfile) // Get the current user's profile
router.get('/:userId', getProfile)
router.put('/:userId', updateProfile)

export default router
