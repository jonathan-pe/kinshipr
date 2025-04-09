// src/controllers/userProfiles.ts
import { Request, Response } from 'express'
import UserProfile from '@/models/UserProfile'
import { GoogleCloudStorageService, storageService } from '@/services/storage'
import { clerkClient, type UserJSON as ClerkUserJSON } from '@clerk/express'

export const getCurrentUserProfile = async (req: Request, res: Response) => {
  try {
    const userProfile = await UserProfile.findOne({ userId: req.auth?.userId })
    if (!userProfile) {
      res.status(404).send({ message: 'User profile not found' })
      return
    }
    res.status(200).send(userProfile)
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' })
  }
}

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userProfile = await UserProfile.findOne({ userId: req.params.userId })

    if (!userProfile) {
      res.status(404).send({ message: 'User profile not found' })
      return
    }

    res.status(200).send(userProfile)
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' })
  }
}

export const createProfile = async (req: Request, res: Response) => {
  try {
    const userProfile = new UserProfile(req.body)
    await userProfile.save()
    res.status(201).send(userProfile)
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' })
  }
}

export const updateProfile = async (req: Request, res: Response) => {
  try {
    // Logged in user can only update their own profile
    if (req.auth?.userId !== req.params.userId) {
      res.status(403).send({ message: 'Forbidden' })
      return
    }

    const updatedProfile = await UserProfile.findOneAndUpdate({ userId: req.params.userId }, req.body, { new: true })
    if (!updatedProfile) {
      res.status(404).send({ message: 'User profile not found' })
      return
    }

    // If username is provided, update Clerk username
    if (req.body.username) {
      const clerkUser = await clerkClient.users.getUser(req.params.userId)
      if (!clerkUser) {
        res.status(404).send({ message: 'Clerk user not found' })
        return
      }

      await clerkClient.users.updateUser(req.params.userId, {
        username: req.body.username,
      })
    }

    res.send(updatedProfile)
  } catch (error) {
    if (error instanceof Error && error.message.includes('duplicate key error')) {
      res.status(409).send({ message: 'Username already exists' })
    } else {
      res.status(500).send({ message: 'Internal server error' })
    }
  }
}

export const uploadProfilePicture = [
  storageService.uploadFile('picture'),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded' })
      }

      let profilePictureUrl: string
      if (process.env.STORAGE_TYPE === 'gcs') {
        const filename = await (storageService as GoogleCloudStorageService).uploadToGCS(req.file, 'uploads')
        profilePictureUrl = await storageService.getFileUrl(filename)
      } else {
        // Handle other storage types (e.g., local, S3) if needed
        profilePictureUrl = await storageService.getFileUrl(req.file.filename)
      }

      await UserProfile.findOneAndUpdate({ userId: req.auth?.userId }, { profilePictureUrl })
      res.send({ profilePictureUrl })
    } catch (error) {
      res.status(500).send({ message: 'Internal server error' })
    }
  },
]

// Clerk Webhook functionality
export const createProfileFromClerkWebhook = async (clerkUser: ClerkUserJSON, generatedUsername: string) => {
  const { id, username, image_url } = clerkUser

  try {
    await UserProfile.create({
      userId: id,
      username: username ?? generatedUsername,
      profilePictureUrl: image_url,
    })
  } catch (error) {
    console.error('Error creating user profile:', error)
    throw new Error('Failed to create user profile')
  }
}
