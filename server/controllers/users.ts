// server/controllers/users.ts
import { Request, Response } from 'express'
import User from '../models/User'

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = new User({
      userId: req.body.userId, // Clerk user ID
      email: req.body.email,
    })
    await user.save()
    res.status(201).send(user)
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' })
  }
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ userId: req.params.userId }) // Clerk user ID
    if (!user) {
      res.status(404).send({ message: 'User not found' })
      return
    }
    res.send(user)
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' })
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { userId: req.auth.userId }, // Clerk user ID
      req.body,
      { new: true }
    )
    if (!updatedUser) {
      res.status(404).send({ message: 'User not found' })
      return
    }
    res.send(updatedUser)
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findOneAndDelete({ userId: req.auth.userId }) // Clerk user ID
    if (!deletedUser) {
      res.status(404).send({ message: 'User not found' })
      return
    }
    res.send({ message: 'User deleted' })
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' })
  }
}
