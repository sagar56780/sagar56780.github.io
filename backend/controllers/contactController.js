import ContactMessage from '../models/ContactMessage.js';

export const submitContact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email and message are required' });
    }

    const created = await ContactMessage.create({ name, email, message });

    return res.status(201).json({
      id: created._id,
      message: 'Message submitted successfully'
    });
  } catch (error) {
    return next(error);
  }
};

export const listMessages = async (req, res, next) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    return res.json(messages);
  } catch (error) {
    return next(error);
  }
};
