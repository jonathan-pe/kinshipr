// server/routes/users.ts
import express from 'express'
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  addFriend,
  removeFriend,
} from '../controllers/users'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/:id', getUserProfile)
router.put('/:id', updateUserProfile)
router.post('/:id/friends', addFriend)
router.delete('/:id/friends', removeFriend)

export default router
