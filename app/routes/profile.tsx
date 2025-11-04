import type { Route } from "./+types/home";
import { useAuthenticated } from "~/hooks/useAuthenticated";
import { Navigate } from "react-router";
import ProfilePage from "~/pages/Profile";

export const links: Route.LinksFunction = () => [];
export function meta({}: Route.MetaArgs) {
  return [
    { title: "User Page" },
    { name: "description", content: "Welcome to your dashboard !" },
  ];
}

export default function Profile() {
  const isAuthenticated = useAuthenticated();
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <ProfilePage />;
}
