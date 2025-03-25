// server/models/User.ts
import mongoose, { Schema, Document } from 'mongoose'

interface IUser extends Document {
  username: string
  email: string
  password: string
  profilePicture?: string
  bio?: string
  friendList: mongoose.Types.ObjectId[]
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  bio: { type: String },
  friendList: [{ type: Schema.Types.ObjectId, ref: 'User' }],
})

export default mongoose.model<IUser>('User', UserSchema)
