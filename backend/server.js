import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { body, validationResult } from 'express-validator';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Email configuration
const transporter = nodemailer.createTransporter({
  service: 'gmail', // You can change this to your preferred email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Validation middleware
const validateEmail = [
  body('email').isEmail().normalizeEmail(),
  body('name').optional().isLength({ min: 1, max: 100 }).trim()
];

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'CtrlArt API is running' });
});

// Newsletter subscription endpoint
app.post('/api/newsletter/subscribe', validateEmail, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { email, name } = req.body;

    // Here you would typically save to a database
    // For now, we'll just send a confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to CtrlArt Newsletter!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Welcome to CtrlArt!</h2>
          <p>Hi ${name || 'there'},</p>
          <p>Thank you for subscribing to our newsletter! We're excited to have you on board.</p>
          <p>You'll receive updates about our latest features, tips, and exclusive content.</p>
          <p>Best regards,<br>The CtrlArt Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    
    res.json({ 
      success: true, 
      message: 'Successfully subscribed to newsletter!' 
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to subscribe to newsletter' 
    });
  }
});

// Newsletter unsubscribe endpoint
app.post('/api/newsletter/unsubscribe', validateEmail, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { email } = req.body;

    // Here you would remove from database
    // For now, we'll just send a confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'You\'ve been unsubscribed from CtrlArt Newsletter',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">You've been unsubscribed</h2>
          <p>You have successfully unsubscribed from the CtrlArt newsletter.</p>
          <p>We're sorry to see you go! If you change your mind, you can always resubscribe.</p>
          <p>Best regards,<br>The CtrlArt Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    
    res.json({ 
      success: true, 
      message: 'Successfully unsubscribed from newsletter' 
    });

  } catch (error) {
    console.error('Newsletter unsubscription error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to unsubscribe from newsletter' 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Newsletter API ready at http://localhost:${PORT}/api/newsletter`);
});
