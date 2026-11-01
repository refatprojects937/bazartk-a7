import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const uri = process.env.MONGODB_URL;
if (!uri) {
  throw new Error("MONGODB_URL environment variable set kora nai");
}

const client = new MongoClient(uri);
const db = client.db("bazardorr-b14-a0007");

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://bazartk-a7-ffhq.vercel.app"
    : "http://localhost:3000";

export const auth = betterAuth({
  baseURL: "https://bazartk-a7-ffhq.vercel.app",
trustedOrigins: [
  "http://localhost:3000",
  "https://bazartk-a7-ffhq.vercel.app",
],
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
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