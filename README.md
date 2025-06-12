# Justsend SDK

TypeScript/JavaScript SDK for Justsend API - SMS marketing platform.

## Installation

```bash
npm install justsend-sdk
```

## Quick Start

```typescript
import { JustsendSDK } from "justsend-sdk";

// Initialize SDK
const sdk = new JustsendSDK({
  apiKey: "YOUR_API_KEY_HERE", // Get from Justsend panel
});

// Send SMS
await sdk.sms.sendSimple(
  "YourCompany", // Sender (max 11 characters)
  "48500123456", // Phone number in international format
  "Hello! This is a test message." // SMS content
);
```

## Configuration

```typescript
const sdk = new JustsendSDK({
  apiKey: "YOUR_API_KEY", // Required: API key from Justsend panel
  baseURL: "https://justsend.io/api", // Optional: Default API URL
  timeout: 30000, // Optional: Timeout in ms (default 30s)
});
```

## API Key

1. Register at [justsend.pl](https://justsend.pl)
2. Activate your account
3. Get API key from user panel
4. Key is passed in `appKey` header

## Sending SMS

### Simple Message

```typescript
await sdk.sms.sendSimple(
  "MyCompany", // Sender
  "48500123456", // Phone number
  "Message content", // SMS content
  "ECO" // Variant (optional)
);
```

### Full Message Object

```typescript
const message = {
  sender: "MyApp",
  msisdn: "48500123456",
  content: "Detailed SMS message",
  bulkVariant: "PRO",
};

await sdk.sms.send(message);
```

## SMS Variants

- `ECO` - Economic (default)
- `FULL` - Full
- `PRO` - Professional
- `ECO_RESP` - Economic with delivery confirmation
- `PRO_RESP` - Professional with delivery confirmation

## Phone Number Format

Numbers should be provided in international format without `+` sign:

- Correct: `48500123456`
- Incorrect: `+48 500 123 456`, `500123456`

## Error Handling

```typescript
try {
  await sdk.sms.sendSimple("Sender", "48500123456", "Test");
  console.log("SMS sent!");
} catch (error) {
  console.error("Error:", error.message);
}
```

## Examples

Check the `examples/` folder to see more usage examples.

```bash
# Run examples
node examples/basic-sms.js
```

## Development

```bash
# Install dependencies
npm install

# Compile TypeScript
npm run build

# Run in watch mode
npm run dev

# Linting
npm run lint
```

## Project Structure

```
justsend-sdk/
├── src/
│   ├── index.ts           # Main SDK class
│   ├── client/            # HTTP client
│   │   └── http-client.ts
│   ├── modules/           # Feature modules
│   │   └── sms.ts        # SMS functionality
│   └── types/             # TypeScript definitions
├── examples/              # Usage examples
│   ├── basic-sms.js      # Basic examples
│   └── modular-usage.js  # Modular syntax examples
├── dist/                  # Compiled files
└── README.md             # This documentation
```

## License

MIT

## Support

- API Documentation: [https://justsend.io/api/swagger-ui/](https://justsend.io/api/swagger-ui/)
- Issues: [GitHub Issues](https://github.com/yourusername/justsend-sdk/issues)

## Roadmap

### v1.0 (Current)

- ✅ Single SMS sending
- ✅ Basic error handling
- ✅ TypeScript support

### v1.1 (Planned)

- 🔄 Bulk SMS (mass sending)
- 🔄 Blacklist management
- 🔄 Send history
- 🔄 Payment transactions

### v1.2 (Planned)

- 📋 File upload
- 📋 Send statistics
- 📋 Advanced filtering
