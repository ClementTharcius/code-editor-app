import mongoose, { Document, Schema } from 'mongoose';

export interface UserDocument extends Document {
  email: string;
  password: string;
  // Other user-related fields...
}

const userSchema: Schema<UserDocument> = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Other user-related fields...
});

export const User = mongoose.model<UserDocument>('User', userSchema);
