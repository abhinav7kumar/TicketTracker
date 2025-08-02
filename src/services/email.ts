'use server';

import nodemailer from 'nodemailer';

type EmailPayload = {
  to: string;
  subject: string;
  body: string;
};

// This is a placeholder for a real email service.
// In a production environment, you would use a more robust email provider
// and securely manage your credentials.
const transporter = nodemailer.createTransport({
  // For demo, we use a mock server. Replace with your SMTP settings.
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USER || 'arianna.schultz88@ethereal.email',
    pass: process.env.MAIL_PASS || 'TpqzRwH5hNqJ4jK5k4',
  },
});

export const sendEmail = async (data: EmailPayload) => {
  if (!process.env.MAIL_USER) {
    console.warn(
      'Email credentials not found. Skipping email sending. Set MAIL_USER and MAIL_PASS in .env'
    );
    // Returning success to not block the UI in the demo.
    return { success: true };
  }

  const options = {
    from: '"TicketTrack Lite" <noreply@ticketrack.com>',
    to: data.to,
    subject: data.subject,
    html: data.body,
  };

  try {
    const info = await transporter.sendMail(options);
    console.log('Message sent: %s', info.messageId);
    // Preview URL only available when using an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    // We don't want to throw an error to the user if email fails
    // but in a real app you would handle this more gracefully (e.g., retry queue).
    return { success: false, error: 'Failed to send email.' };
  }
};
