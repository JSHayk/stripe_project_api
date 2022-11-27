import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";

export const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);

export default {
  appConfig: {
    port: process.env.PORT || 8000,
    client_url: process.env.CLIENT_URL,
    sync_interval: process.env.SYNC_INTERVAL || 20000,
  },
  dbConfig: {
    uri: process.env.DB_URI,
  },
  stripeConfig: {
    private_key: process.env.STRIPE_PRIVATE_KEY,
    public_key: process.env.STRIPE_PUBLIC_KEY,
    mode: process.env.MODE || "payment",
    payment_method_types: [process.env.PAYMENT_METHOD_TYPES],
    currency: process.env.CURRENCY || "usd",
    success_url: process.env.SUCCESS_URL,
    cancel_url: process.env.CANCEL_URL,
  },
};
