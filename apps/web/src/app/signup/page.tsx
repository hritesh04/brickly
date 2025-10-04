"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useAction } from "@/hooks/useAction";
import { signup } from "@/actions/user";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { execute, isLoading, fieldErrors } = useAction(signup, {
    onSuccess(data) {
      router.push("/dashboard");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    execute({ name, email, password });
  };

  console.log(fieldErrors);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <img
            src="/icon_text.png"
            className="h-12 mx-auto mb-4"
            alt="Brickly"
          />
          <h1 className="text-2xl font-bold">Create account</h1>
          <p className="text-muted-foreground">Sign up to get started</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {fieldErrors && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
              {fieldErrors?.name?.at(0)}
              {fieldErrors?.email?.at(0)}
              {fieldErrors?.password?.at(0)}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? "Creating account..." : "Sign up"}
          </Button>
        </div>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">
            Already have an account?{" "}
          </span>
          <Link href="/signin" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
}
