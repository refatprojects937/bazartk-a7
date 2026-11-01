"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const FIELDS = [
  ["name", "নাম", "text", "যেমন: রহিম উদ্দিন"],
  ["email", "ইমেইল", "email", "you@example.com"],
  ["password", "পাসওয়ার্ড", "password", "কমপক্ষে ৮ অক্ষর"],
  ["confirm", "পাসওয়ার্ড নিশ্চিত করুন", "password", "আবার লিখুন"],
];

const SignUpPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;

    if (f.password.length < 8) return setError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
    if (f.password !== f.confirm) return setError("দুটি পাসওয়ার্ড মিলছে না।");

    setError("");
    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name: f.name,
        email: f.email,
        password: f.password,
        callbackURL: "/",
      });

      if (error) {
        setError(error.message || "সাইন আপ করা যায়নি।");
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
    <div className="mx-auto my-6 max-w-3xl rounded-xl bg-green-50 px-4 py-10">
      <h1 className="text-center text-3xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
      <p className="mb-6 text-center">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>

      <form
        onSubmit={onSubmit}
        className="mx-auto flex max-w-md flex-col gap-4 rounded-2xl border-2 border-black bg-white p-6"
      >
        {FIELDS.map(([name, label, type, placeholder]) => (
          <label key={name} className="flex flex-col gap-1 font-semibold">
            {label}
            <input
              name={name}
              type={type}
              placeholder={placeholder}
              required
              className="rounded-lg border border-black px-3 py-2 font-normal"
            />
          </label>
        ))}

        {error && <p className="text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-green-700 py-3 font-bold text-white disabled:opacity-60"
        >
          {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
        </button>

        <div className="flex items-center gap-3 text-sm text-gray-500">
          <hr className="flex-1" /> অথবা <hr className="flex-1" />
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => socialSignIn("google")}
            className="flex-1 rounded-lg border border-black py-2 font-semibold"
          >
            Google দিয়ে চালিয়ে যান
          </button>
          <button
            type="button"
            onClick={() => socialSignIn("github")}
            className="flex-1 rounded-lg border border-black py-2 font-semibold"
          >
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="text-center">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="font-bold text-green-700">
            সাইন ইন করুন
          </Link>
        </p>
      </form>

      <p className="mt-6 text-center">
        <Link href="/">← হোম পেজে ফিরে যান</Link>
      </p>
    </div>
  );
};

export default SignUpPage;