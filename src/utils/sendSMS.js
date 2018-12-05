const twilioClient = require('twilio');

// twilio configurations
const accountSid = process.env.TWILIO_ID;
const authToken = process.env.TWILIO_TOKEN;
const twilio = twilioClient(accountSid, authToken);
const sender = process.env.TWILIO_NUMBER;

const sendViaTwilio = async (number, content) => {
  try {
    await twilio.messages
      .create({
        body: content,
        to: number,
        from: sender
      });
  } catch (error) {
    throw error;
  }
};

module.exports = sendViaTwilio;
