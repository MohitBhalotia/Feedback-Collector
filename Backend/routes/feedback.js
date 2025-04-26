import express from 'express';
import Feedback from '../models/Feedback.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// POST /api/submit-feedback
router.post('/submit-feedback', async (req, res) => {
  try {
    const { name, email, message,category } = req.body;
    console.log(req.body);
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const feedback = new Feedback({ name, email, message,category });
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// GET /api/feedbacks (admin only)
router.get('/feedbacks', adminAuth, async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// DELETE /api/feedbacks/:id (admin only)
router.delete('/feedbacks/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Feedback.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Feedback not found' });
    res.json({ message: 'Feedback deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
});

export default router;
