import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (to, subject, htmlContent) => {
  try {
    await transporter.sendMail({
      from: `"LMS System" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
    });
  } catch (error) {
    console.error("Email send error:", error);
    throw new Error("Failed to send email");
  }
};

export const resetPasswordEmail = (name, resetLink) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6;">
    <h2>Password Reset Request</h2>
    <p>Hello ${name},</p>
    <p>You requested to reset your password. Click the link below to proceed:</p>
    <p><a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background: #3498db; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
    <p>This link will expire in 1 hour.</p>
    <p>If you didn't make this request, please ignore this email.</p>
    <br>
    <p>Best regards,<br>LMS Team</p>
  </div>
`;