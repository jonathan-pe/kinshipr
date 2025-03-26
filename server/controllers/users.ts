// server/controllers/users.ts
import { Request, Response } from 'express'
import User from '../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { z } from 'zod'

const registerUserSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
})

const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

// registerUser function
export const registerUser = async (req: Request, res: Response) => {
  try {
    const parsedBody = registerUserSchema.parse(req.body)
    const { username, email, password } = parsedBody

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' })
      return
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create a new user
    const user = new User({ username, email, password: hashedPassword })
    await user.save()

    res.status(201).json({ message: 'User created successfully' })
    return
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors })
      return
    }
    res.status(500).json({ message: 'Something went wrong' })
    return
  }
}

// loginUser function
export const loginUser = async (req: Request, res: Response) => {
  try {
    const parsedBody = loginUserSchema.parse(req.body)
    const { email, password } = parsedBody

    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' })
      return
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      res.status(400).json({ message: 'Invalid credentials' })
      return
    }

    // Create a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' })

    res.status(200).json({ token, userId: user._id })
    return
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors })
      return
    }
    res.status(500).json({ message: 'Something went wrong' })
    return
  }
}

// getUserProfile function
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    res.status(200).json({ user: { ...user.toObject(), password: undefined } })
    return
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
    return
  }
}

// updateUserProfile function
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    res.status(200).json({ user: { ...user.toObject(), password: undefined } })
    return
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
    return
  }
}

// addFriend function
export const addFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id)
    const friend = await User.findById(req.body.friendId)

    if (!user || !friend) {
      res.status(404).json({ message: 'User or friend not found' })
      return
    }

    if (
      user.friendList.some((friendId: mongoose.Types.ObjectId) =>
        friendId.equals(friend._id as mongoose.Types.ObjectId)
      )
    ) {
      res.status(400).json({ message: 'Friend already added' })
      return
    }

    user.friendList.push(friend._id as mongoose.Types.ObjectId)
    await user.save()

    res.status(200).json({ message: 'Friend added successfully' })
    return
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
    return
  }
}

// removeFriend function
export const removeFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id)
    const friend = await User.findById(req.query.friendId)

    if (!user || !friend) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    user.friendList = user.friendList.filter(
      (friendId: mongoose.Types.ObjectId) => friendId.toString() !== req.query.friendId
    )
    await user.save()

    res.status(200).json({ message: 'Friend removed successfully' })
    return
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
    return
  }
}
