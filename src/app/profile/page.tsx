"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  if (isPending) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-md py-20 text-center">
        <p className="mb-4 text-lg">প্রোফাইল দেখতে আগে সাইন ইন করুন।</p>
        <Link href="/signin" className="btn btn-info">
          সাইন ইন
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto my-10 max-w-md rounded-2xl border bg-white p-8 text-center shadow-sm">
      <div className="avatar">
        <div className="w-24 rounded-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={user.name}
            src={
              user.image ||
              "https://img.daisyui.com/images/profile/demo/distracted2@192.webp"
            }
          />
        </div>
      </div>

      <h1 className="mt-4 text-2xl font-bold text-gray-900">{user.name}</h1>
      <p className="mt-1 text-gray-600">{user.email}</p>

      <Link href="/profile/update" className="btn btn-success mt-6">
        আপডেট করুন
      </Link>

      <div>
        <Link href="/" className="mt-4 inline-block text-sm text-emerald-700">
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;