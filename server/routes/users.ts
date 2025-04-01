// server/routes/users.ts
import express from 'express'
import { getUser, updateUser, deleteUser } from '@/controllers/users'

const router = express.Router()

router.get('/', getUser) // Get the current user's details
router.put('/', updateUser) // Update the current user's details
router.delete('/', deleteUser) // Delete the current user
export default router
