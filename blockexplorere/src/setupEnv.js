import { config } from "dotenv";

// Load environment variables
config({ path: ".env" });

// Make sure required variables exist
if (!process.env.REACT_APP_ALCHEMY_API_KEY) {
  console.warn("Missing REACT_APP_ALCHEMY_API_KEY in .env file");
}
