const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  host: process.env.POSTMARK_SMTP_HOST,
  port: process.env.POSTMARK_SMTP_PORT,
  auth: {
    user: process.env.POSTMARK_SMTP_USERNAME,
    pass: process.env.POSTMARK_SMTP_PASSWORD
  }
});

app.post('/submit-form', (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: email,
    to: '882d32f336223146df91edb9c559919f@inbound.postmarkapp.com',  
    subject: subject,
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
