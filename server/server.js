import dotenv from 'dotenv';
dotenv.config();

import nodemailer from 'nodemailer';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

const app = express();
app.use(cors());
app.use(bodyParser.json());

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { name, email, subject, message } = req.body;

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
      });

      const mailOptions = {
        from: email,
        to: 'dvazdev@gmail.com',
        subject: `Portfolio Form Submission: ${subject}`,
        text: `From: ${name}\nEmail: ${email}\nMessage: ${message}`
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email Sent' });

    } catch (error) {
      console.error("Email sending failed:", error);
      res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
  } else {
    res.status(405).end(); 
  }
};
