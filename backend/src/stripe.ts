import Stripe from "stripe";
import env from "dotenv";

env.config({ path: "./config.env" });
export const stripeAPI = new Stripe(
  process.env.STRIPE_SECRET_KEY_TEST as string,
  {
    apiVersion: "2022-11-15",
    appInfo: {
      // For sample support and debugging, not required for production:
      name: "stripe-samples/accept-a-payment",
      url: "https://cinema-api-rgmg.onrender.com",
      version: "0.0.2",
    },
    typescript: true,
  }
);
