// const dotenv = require('dotenv');
// dotenv.config();

// const nodemailer = require('nodemailer');
// const cors = require('cors');
// const express = require('express');

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.post('/api/send', async (req, res) => {
//   if (req.method === 'POST') {
//     try {
//       const { name, email, subject, message } = req.body;

//       const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         port: 465,
//         secure: true,
//         auth: {
//           user: process.env.EMAIL,
//           pass: process.env.PASSWORD
//         }
//       });

//       const mailOptions = {
//         from: email,
//         to: 'dvazdev@gmail.com',
//         subject: `Portfolio Form Submission: ${subject}`,
//         text: `From: ${name}\nEmail: ${email}\nMessage: ${message}`
//       };

//       await transporter.sendMail(mailOptions);
//       res.status(200).json({ message: 'Email Sent' });

//     } catch (error) {
//       console.error("Email sending failed:", error);
//       res.status(500).json({ message: 'Failed to send email', error: error.message });
//     }
//   } else {
//     res.status(405).end(); 
//   }
// });

// module.exports = app;
<<<<<<< HEAD
// // 
=======
document.getElementById('#submitButton').addEventListener('click', async (event) => {
  event.preventDefault();

  const nodemailer = require('nodemailer');

  // Create a transporter using the SMTP credentials
  const transporter = nodemailer.createTransport({
    host: 'smtp.postmarkapp.com',
    port: 587,
    secure: false, // Set to true if using TLS
    auth: {
      user: `${USERNAME}`,
      pass: `${PASSWORD}`
    }
  });
  
  app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;
  
    const mailOptions = {
      from: email,
      to: '882d32f336223146df91edb9c559919f@inbound.postmarkapp.com',
      subject: 'New contact form submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error:', error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent:', info.response);
        res.status(200).send('Email sent successfully');
      }
    });
  });
>>>>>>> 37b31815913c7314568c2df1a15d0c718e88764e
