"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const FIELDS = [
  ["email", "ইমেইল", "email", "you@example.com"],
  ["password", "পাসওয়ার্ড", "password", "আপনার পাসওয়ার্ড"],
];

const SignInPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;

    setError("");
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email: f.email,
        password: f.password,
      });

      if (error) {
        setError(error.message || "ইমেইল বা পাসওয়ার্ড ভুল।");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("সার্ভারে সমস্যা হয়েছে, আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const socialSignIn = (provider: "google" | "github") =>
    authClient.signIn.social({ provider, callbackURL: "/" });

  

  return (
    <main className="min-h-screen container mx-auto rounded-2xl bg-emerald-50 px-4 py-10 text-center text-gray-900">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-bold">সাইন ইন</h1>
        <p className="mt-1 text-sm text-gray-600">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>

        <div className="mt-6 rounded-2xl border bg-white p-6 text-left shadow-sm">
          <form className="space-y-4" onSubmit={onSubmit}>
            {FIELDS.map(([id, label, type, ph]) => (
              <label key={id} className="block text-sm font-semibold">
                {label}
                <input
                  name={id}
                  type={type}
                  placeholder={ph}
                  required
                  className="mt-1 w-full rounded-lg border px-3 py-2.5 font-normal"
                />
              </label>
            ))}

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-emerald-700 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-60"
            >
              {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
            </button>
          </form>

          <div className="my-4 flex items-center gap-3 text-xs text-gray-500">
            <hr className="flex-1" />
            অথবা
            <hr className="flex-1" />
          </div>

          <div className="flex gap-3">
            {(["google", "github"] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => socialSignIn(p)}
                className="flex-1 rounded-lg border py-2.5 text-sm font-medium hover:bg-gray-50"
              >
                {p === "google" ? "Google" : "GitHub"} দিয়ে চালিয়ে যান
              </button>
            ))}
          </div>

          <p className="mt-5 text-center text-sm">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/signup" className="font-semibold text-emerald-700">
              সাইন আপ করুন
            </Link>
          </p>
        </div>

        <Link href="/" className="mt-6 inline-block text-sm text-gray-500">
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
};

export default SignInPage;