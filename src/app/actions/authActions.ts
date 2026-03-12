
'use server';

import { readDb } from '@/lib/db';
import { User } from '@/utils/storage';
import nodemailer from 'nodemailer';

export async function sendPasswordResetEmail(userId: string, userEmail: string) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || process.env.EMAIL_PASS === 'your-app-password-goes-in-env.local') {
    console.error('Email credentials are not set in the environment variables.');
    return { success: false, message: 'Server is not configured to send emails. Please contact an administrator.' };
  }

  try {
    const users: User[] = await readDb('users');
    const user = users.find(u => u.id === userId && u.email === userEmail);

    if (!user) {
      return { success: false, message: 'No account found with that ID and email address.' };
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Your Password for AMA Student Portal',
      text: `Hello ${user.name},\n\nYour password is: ${user.password}\n\nPlease keep it safe.\n\n- AMA Student Portal`,
      html: `<p>Hello ${user.name},</p><p>Your password is: <strong>${user.password}</strong></p><p>Please keep it safe.</p><p>- AMA Student Portal</p>`,
    };

    await transporter.sendMail(mailOptions);

    return { success: true, message: 'Your password has been sent to your email.' };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return { success: false, message: 'Failed to send password reset email. Please check server logs.' };
  }
}
