const express = require("express");
const bodyParser = require("body-parser");
const postmark = require("postmark");

const app = express();
app.use(bodyParser.json());

require('dotenv').config();

const serverToken = process.env.POSTMARK_SERVER_TOKEN;
const client = new postmark.ServerClient(serverToken);

app.get("/", (req, res) => {
  res.send("Welcome to the email sender server!");
});

app.post("/send-email", async (req, res) => {
  const formData = req.body;

  const message = {
    "From": "sender@example.com",
    "To": formData.email,
    "Subject": formData.subject,
    "TextBody": formData.message
  };

  try {
    await client.sendEmail(message);
    console.log("Email sent successfully!");
    res.sendStatus(200);
  } catch (error) {
    console.error("Error sending email:", error);
    res.sendStatus(500);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
