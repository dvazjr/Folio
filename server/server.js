import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Server is running.');
});

app.post('/api/send', async (req, res) => {
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
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/');
});
