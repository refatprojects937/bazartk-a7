"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const UserInfo = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  if (isPending) {
    return <span className="loading loading-spinner loading-sm mt-2 mr-1"></span>;
  }

  return (
    <div className="mt-2 mr-1">
      {user ? (
        <div className="flex flex-col items-center gap-1">
          <Link href="/profile" className="flex flex-col items-center gap-1">
            <div className="avatar">
              <div className="w-12 rounded-full">
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
            <h2 className="text-sm font-semibold text-white">{user.name}</h2>
          </Link>

          <button onClick={handleSignOut} className="btn btn-error btn-xs">
            Sign Out
          </button>
        </div>
      ) : (
        <div className="flex gap-1">
          <Link href="/signin" className="btn btn-active btn-info">
            সাইন ইন
          </Link>
          <Link href="/signup" className="btn btn-active btn-info">
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;