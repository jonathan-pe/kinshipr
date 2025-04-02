// server/controllers/users.ts
import { Request, Response } from 'express'
import User from '../models/User'
import UserProfile from '@/models/UserProfile'
import type { WebhookEvent, UserJSON as ClerkUserJSON } from '@clerk/express'
import { Webhook } from 'svix'
import { adjectives, animals, NumberDictionary, uniqueNamesGenerator } from 'unique-names-generator'

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

export const handleClerkWebhook = async (req: Request, res: Response): Promise<void> => {
  const event = verifyClerkSignature(req)

  if (!event || typeof event === 'boolean') {
    res.status(400).send({ message: 'Invalid signature' })
    return
  }

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

const verifyClerkSignature = (req: Request): boolean | WebhookEvent => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Missing Clerk webhook secret')
  }

  const wh = new Webhook(WEBHOOK_SECRET)

  // Get headers
  const svix_id = req.headers['svix-id'] as string
  const svix_timestamp = req.headers['svix-timestamp'] as string
  const svix_signature = req.headers['svix-signature'] as string

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return false
  }

  // Get body
  const body = JSON.stringify(req.body as Buffer)
  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Webhook verification error:', err)
    return false
  }

  return evt
}

const createUserFromClerkWebhook = async (clerkUser: ClerkUserJSON): Promise<void> => {
  const { id, email_addresses, username } = clerkUser

  const existing = await User.findOne({ clerkId: id })
  if (existing) return

  // Create user record first
  await User.create({
    userId: id,
    email: email_addresses[0]?.email_address,
    isBlocked: false,
  })

  // Try to generate a unique username
  let generatedUsername
  let attempts = 0
  const MAX_ATTEMPTS = 10

  while (!generatedUsername && attempts < MAX_ATTEMPTS) {
    const candidate = uniqueNamesGenerator({
      dictionaries: [adjectives, animals, NumberDictionary.generate({ min: 1, max: 100000 })],
      separator: '',
      length: 3,
      style: 'capital',
    })

    const existingProfile = await UserProfile.findOne({ username: candidate })
    if (!existingProfile) {
      generatedUsername = candidate
    }

    attempts++
  }

  if (!generatedUsername) {
    // Roll back the User doc (optional but clean)
    await User.deleteOne({ userId: id })

    // Optional: log it somewhere, alert Slack, etc.
    console.error(`Failed to generate username for userId=${id}`)

    // Throw to let Clerk know the webhook failed (it will retry)
    throw new Error('Username generation failed; webhook will retry.')
  }

  // Create the user profile
  await UserProfile.create({
    userId: id,
    username: username ?? generatedUsername,
  })
}
