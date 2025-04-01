// server/controllers/users.ts
import { Request, Response } from 'express'
import User from '../models/User'
import UserProfile from '@/models/UserProfile'
import crypto from 'crypto'
import type { WebhookEvent, UserJSON as ClerkUserJSON } from '@clerk/express'

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

// Clerk Webhook functionality

const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET!

export const handleClerkWebhook = async (req: Request, res: Response): Promise<void> => {
  const signature = req.headers['clerk-signature'] as string
  const rawBody = req.body as Buffer

  const isValid = verifyClerkSignature(rawBody, signature, CLERK_WEBHOOK_SECRET)
  if (!isValid) {
    res.status(400).send('Invalid signature')
    return
  }

  const event = JSON.parse(rawBody.toString()) as WebhookEvent

  try {
    if (event.type === 'user.created') {
      await createUserFromClerkWebhook(event.data)
    }

    res.status(200).send('Webhook received')
    return
  } catch (error) {
    console.error('Webhook processing error:', error)
    res.status(500).send('Internal server error')
    return
  }
}

const verifyClerkSignature = (payload: Buffer, signature: string, secret: string): boolean => {
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(payload)
  const digest = hmac.digest('base64')
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest))
}

const createUserFromClerkWebhook = async (clerkUser: ClerkUserJSON): Promise<void> => {
  const { id, email_addresses, first_name, last_name, image_url } = clerkUser

  const existing = await User.findOne({ clerkId: id })
  if (existing) return

  const user = await User.create({
    clerkId: id,
    email: email_addresses[0]?.email_address,
  })

  await UserProfile.create({
    userId: user._id,
    name: `${first_name ?? ''} ${last_name ?? ''}`.trim(),
    avatarUrl: image_url,
    bio: '',
    friendIds: [],
  })
}
