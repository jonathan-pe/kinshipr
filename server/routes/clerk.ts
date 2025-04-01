import express from 'express'
import { handleClerkWebhook } from '@/controllers/users'

const router = express.Router()

// NOTE: raw body middleware needs to be applied **before** JSON parsing
router.post('/', express.raw({ type: 'application/json' }), handleClerkWebhook)

export default router
