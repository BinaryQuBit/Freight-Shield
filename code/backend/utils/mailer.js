// Nodemailer Import
import nodemailer from "nodemailer";

// Dotenv Import
import dotenv from "dotenv";
dotenv.config();

// Transporter Create
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASSWORD,
  },
});

// Send Email
export const sendEmail = async (to, subject, htmlContent) => {
  console.log(`Sending email to ${to} with subject "${subject}"`);
  const mailOptions = {
    from: "Freight Shield",
    to: to,
    subject: subject,
    html: htmlContent,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
