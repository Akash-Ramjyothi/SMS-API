const express = require("express");
const twilio = require("twilio");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// Parse JSON requests
app.use(bodyParser.json());

// Define a POST route that logs the number in the path
app.post("/api/:number", (req, res) => {
  const number = req.params.number;
  console.log(`Received POST request with number: ${number}`);

  const client = new twilio(accountSid, authToken); // Creating Twilio client for functions

  // Function call to send Message
  client.messages
    .create({
      body: "ALERT!!! Gas Leak Detected - Leak Master",
      // to: "+91 89399 28002",
      to: number,
      from: twilioPhoneNumber,
    })
    .then((message) => console.log(message.sid));

  res.send(`Received Number: ${number}`);
});

// Start the server on port 3000 (you can change this)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
