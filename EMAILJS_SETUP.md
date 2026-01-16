# EmailJS Setup Instructions

The contact form in your portfolio is ready to send emails, but requires a one-time setup with EmailJS (a free frontend email service).

## Why EmailJS?

EmailJS is a **frontend-only** email service that requires no backend server. It's perfect for static portfolios and sends emails directly from the browser to your inbox.

## Setup Steps

### 1. Create a Free EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **Sign Up** and create a free account
3. Verify your email

### 2. Create an Email Service

1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add Service**
3. Choose your email provider (Gmail recommended):
   - Select **Gmail** from the list
   - Click **Connect with Gmail**
   - Authorize EmailJS to access your Gmail
4. Name your service (e.g., "Gmail")
5. Click **Create Service**

### 3. Create an Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use these settings:

   **Template Name:** `contact_form_template`

   **To Email:** `{{to_email}}`

   **Subject:** `New Inquiry from {{from_name}}`

   **Template Content:**
   ```
   Hello {{to_name}},

   You have received a new inquiry from your portfolio website.

   **Sender Details:**
   Name: {{from_name}}
   Email: {{from_email}}
   Phone: {{phone}}
   Company: {{company}}

   **Message:**
   {{message}}

   ---
   This email was sent from your Ansh Creation portfolio website.
   ```

4. Click **Save**
5. Copy the **Template ID** (you'll need this)

### 4. Get Your API Keys

1. Go to **Account** → **API Keys** in the EmailJS dashboard
2. Copy your **Public Key**

### 5. Update Your Portfolio Code

Open `/home/ubuntu/ansh-portfolio/client/src/components/ContactForm.tsx` and replace:

```typescript
// Line 32: Replace YOUR_EMAILJS_PUBLIC_KEY with your actual public key
emailjs.init("YOUR_EMAILJS_PUBLIC_KEY");

// Line 57: Replace YOUR_EMAILJS_SERVICE_ID with your service ID (e.g., "gmail")
const response = await emailjs.send(
  "YOUR_EMAILJS_SERVICE_ID",
  "YOUR_EMAILJS_TEMPLATE_ID",
  {
    // ... rest of the code
  }
);
```

**Example:**
```typescript
emailjs.init("pk_abc123def456ghi789");

const response = await emailjs.send(
  "service_xyz789abc",
  "contact_form_template",
  {
    // ... rest of the code
  }
);
```

### 6. Test the Form

1. Restart your dev server: `pnpm dev`
2. Fill out the contact form on your portfolio
3. Click **Send Message**
4. You should receive an email at your configured email address

## Troubleshooting

**"Email failed to send"**
- Verify your Public Key is correct
- Check that your Service ID matches the one in EmailJS dashboard
- Ensure your template ID is correct
- Check browser console for detailed error messages

**"No email received"**
- Check your spam/junk folder
- Verify the email template is correctly set up in EmailJS
- Make sure you've authorized Gmail access to EmailJS

**"CORS Error"**
- This is normal with EmailJS - it's handled by the service
- If you see this, try refreshing the page and submitting again

## Security Notes

- Your **Public Key** is safe to share (it's meant to be public)
- Never commit your keys to git - they're already in `.gitignore`
- The mailto fallback will activate if EmailJS fails, ensuring emails always get through

## WhatsApp Integration

The WhatsApp button is already configured and works without any setup:
- Phone: 8810491624
- Message: "Hello Kamal Chauhan, I want more information about your services at Ansh Creation."
- Works on both mobile and desktop

## Need Help?

- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- Contact Support: [https://www.emailjs.com/contact/](https://www.emailjs.com/contact/)
