import type { Route } from "./+types/home";
import { useAuthenticated } from "~/hooks/useAuthenticated";
import { Navigate } from "react-router";
import UserPage from "~/pages/User";

export const links: Route.LinksFunction = () => [];
export function meta({}: Route.MetaArgs) {
  return [
    { title: "User Page" },
    { name: "description", content: "Welcome to your dashboard !" },
  ];
}

export default function User() {
  const isAuthenticated = useAuthenticated();
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <UserPage />;
}
