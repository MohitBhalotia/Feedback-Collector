import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  category: { type: String, default: 'general' },
}, {
  timestamps: true
});

export default mongoose.model('Feedback', feedbackSchema);
