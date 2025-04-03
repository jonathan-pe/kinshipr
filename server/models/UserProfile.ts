import mongoose, { Schema, Document } from 'mongoose'

interface IUserProfile extends Document {
  userId: string // Clerk user ID
  username?: string
  displayName?: string
  bio?: string
  location?: string
  profilePictureUrl?: string
  interests?: string[]
  dateOfBirth?: Date
  socialLinks?: {
    website?: string
    twitter?: string
    instagram?: string
    facebook?: string
    linkedin?: string
  }
}

const UserProfileSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true }, // One-to-one relationship
    username: { type: String, required: true, unique: true },
    displayName: { type: String },
    bio: { type: String },
    location: { type: String },
    profilePictureUrl: { type: String },
    interests: [{ type: String }],
    dateOfBirth: { type: Date },
    socialLinks: {
      website: { type: String },
      twitter: { type: String },
      instagram: { type: String },
      facebook: { type: String },
      linkedin: { type: String },
    },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      transform: (doc, ret) => {
        delete ret._id
        return ret
      },
    },
    toObject: {
      versionKey: false,
      transform: (doc, ret) => {
        delete ret._id
        return ret
      },
    },
  }
)

export default mongoose.model<IUserProfile>('UserProfile', UserProfileSchema)
