# EmailJS Setup Guide

## Step 1: Create EmailJS Account
1. Go to [https://emailjs.com](https://emailjs.com)
2. Sign up for a free account
3. Verify your email address

## Step 2: Set Up Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Copy your **Service ID** (you'll need this)

## Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template:

**Subject:** New Newsletter Subscription

**Content (HTML):**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: white; padding: 20px; border-radius: 8px;">
    <h2 style="color: #a78bfa; text-align: center;">🎨 New Newsletter Subscription</h2>
    
    <p>You have a new newsletter subscription:</p>
    
    <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Email:</strong> {{subscriber_email}}</p>
        <p><strong>Name:</strong> {{subscriber_name}}</p>
        <p><strong>Date:</strong> {{current_date}}</p>
    </div>
    
    <p style="text-align: center; margin-top: 30px;">
        <a href="https://your-website.com" style="background: #667eea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Website</a>
    </p>
</div>
```

**Alternative (Simple Text):**
```
New newsletter subscription:

Email: {{subscriber_email}}
Name: {{subscriber_name}}
Date: {{current_date}}

This email was sent from your CtrlArt website.
```

4. Save the template and copy your **Template ID**

## Step 4: Get Your Public Key
1. Go to "Account" in your dashboard
2. Copy your **Public Key**

## Step 5: Update Your Code
Replace these values in `src/components/home.jsx`:

```javascript
// Line 50: Replace with your Service ID
'YOUR_SERVICE_ID'

// Line 51: Replace with your Template ID  
'YOUR_TEMPLATE_ID'

// Line 57: Replace with your Public Key
'YOUR_PUBLIC_KEY'

// Line 53: Replace with your email address
'your-email@example.com'
```

## Step 6: Test
1. Start your development server: `npm run dev`
2. Try submitting the newsletter form
3. Check your email for the subscription notification

## Free Limits
- 200 emails per month
- Perfect for small to medium websites
- No credit card required

## Troubleshooting
- Make sure all IDs are correct
- Check your email service is properly connected
- Verify your template variables match the code
