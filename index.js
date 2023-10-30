const express = require("express");
const twilio = require("twilio");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

const accountSid = "AC9b01465ad1acd79a0707e064340682e6";
const authToken = "2e5193d9f3b58843fd99dd38f3af3eed";
const twilioPhoneNumber = "+13343779614";

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
