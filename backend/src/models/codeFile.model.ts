import mongoose, { Document, Schema } from 'mongoose';

export interface CodeFileDocument extends Document {
  code: string;
  // Other code file-related fields...
}

const codeFileSchema: Schema<CodeFileDocument> = new Schema({
  code: { type: String, required: true },
  // Other code file-related fields...
});

export const CodeFile = mongoose.model<CodeFileDocument>('CodeFile', codeFileSchema);
