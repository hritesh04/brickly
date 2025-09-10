"use client";
import Link from "next/link";
import { checkAuth } from "@/actions/user";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

export default function UserProfile() {
  const [user, setUser] = useState<{
    id: number;
    name: string | null;
    email: string;
  } | null>(null);

  useEffect(() => {
    const fetchUser = async function () {
      const data = await checkAuth();
      if (data) setUser(data);
    };
    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/signin">
          <Button className="btn">Sign in</Button>
        </Link>
        <Link href="/signup">
          <Button className="btn-outline">Sign up</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6">
      <div className=" flex items-center gap-2">
        <span className=" text-lg">Welcome!</span>
        <span className="text-md hidden sm:inline">
          {user.name || user.email}
        </span>
      </div>
      <Link href="/dashboard">
        <Button className="btn">Enter Studio</Button>
      </Link>
      {/* <Button type="submit" className="btn-outline" onClick={signout}>
        Sign out
      </Button> */}
    </div>
  );
}
