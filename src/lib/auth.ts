import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const uri = process.env.MONGODB_URL;
if (!uri) {
  throw new Error("MONGODB_URL environment variable set kora nai");
}

const client = new MongoClient(uri);
const db = client.db("bazardorr-b14-a0007");

const PROD_URL = "https://bazartk-a7-ffhq.vercel.app";
const baseURL =
  process.env.NODE_ENV === "production" ? PROD_URL : "http://localhost:3000";

export const auth = betterAuth({
  baseURL,
  trustedOrigins: ["http://localhost:3000", PROD_URL],
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      redirectURI: `${baseURL}/api/auth/callback/google`,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
    },
  },
  database: mongodbAdapter(db),
});