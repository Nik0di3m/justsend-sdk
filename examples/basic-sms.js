const { JustsendSDK } = require("../dist/index.js");

// SDK Configuration
const sdk = new JustsendSDK({
  apiKey: "YOUR_API_KEY_HERE", // Replace with your API key
  timeout: 30000,
});

// Example 1: Send a simple SMS
async function sendSimpleSMS() {
  try {
    await sdk.sms.sendSimple(
      "YourCompany", // Sender (max 11 characters)
      "48500123456", // Phone number in international format
      "Hello! This is a test message from Justsend SDK.", // Message content
      "ECO" // Variant (optional, default ECO)
    );

    console.log("SMS sent successfully!");
  } catch (error) {
    console.error("Error sending SMS:", error.message);
  }
}

// Example 2: Send SMS with full configuration
async function sendAdvancedSMS() {
  try {
    const message = {
      sender: "MyApp",
      msisdn: "48500123456",
      content: "Message with full configuration",
      bulkVariant: "PRO",
    };

    await sdk.sms.send(message);
    console.log("Advanced SMS sent successfully!");
  } catch (error) {
    console.error("Error sending SMS:", error.message);
  }
}

// Example 3: Send SMS to multiple recipients
async function sendMultipleSMS() {
  const recipients = ["48500123456", "48500123457", "48500123458"];

  const content = "Group message from Justsend SDK";

  try {
    // Send to each recipient
    for (const phone of recipients) {
      await sdk.sms.sendSimple("MyCompany", phone, content);
      console.log(`SMS sent to ${phone}`);

      // Optional delay between sends
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    console.log("All SMS messages have been sent!");
  } catch (error) {
    console.error("Error sending group SMS:", error.message);
  }
}

// Run examples
async function runExamples() {
  console.log("=== Justsend SDK - Usage Examples ===\n");

  console.log("1. Simple SMS...");
  await sendSimpleSMS();

  console.log("\n2. Advanced SMS...");
  await sendAdvancedSMS();

  console.log("\n3. Group SMS...");
  await sendMultipleSMS();
}

// Run if file is called directly
if (require.main === module) {
  runExamples().catch(console.error);
}

module.exports = {
  sendSimpleSMS,
  sendAdvancedSMS,
  sendMultipleSMS,
};
