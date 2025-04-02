// server/models/User.ts
import mongoose, { Schema, Document } from 'mongoose'

interface IUser extends Document {
  userId: string // Clerk user ID
  email: string
  isBlocked?: boolean
  isActive?: boolean
}

const UserSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    isBlocked: { type: Boolean, default: false },
    isActive: { type: Boolean },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
)

export default mongoose.model<IUser>('User', UserSchema)
