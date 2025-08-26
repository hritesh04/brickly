import { checkAuth } from "@/actions/user";
import { Button } from "../ui/button";

export default async function UserProfile() {
  const user = await checkAuth();
  return <Button size="lg">{user ? "Enter Studio" : "Sign in"}</Button>;
}
