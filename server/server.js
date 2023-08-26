require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/send', async (req, res) => {
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });
  

  const mailOptions = {
    from: email,
    to: 'dvazdev@gmail.com', // replace with your business email
    subject: subject,
    text: `From: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email Sent');
  } catch (error) {
    res.status(500).send('Failed to send email');
  }
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001/');
});
