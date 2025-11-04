import { useAuthenticated } from "~/hooks/useAuthenticated";
import type { Route } from "./+types/home";
import LoginPage from "~/pages/Login";
import { Navigate } from "react-router";

export const links: Route.LinksFunction = () => [];
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Argent Bank - Login" },
    { name: "description", content: "Login page for Argent Bank" },
  ];
}

export default function LogIn() {
  const isAuthenticated = useAuthenticated();
  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }
  return <LoginPage />;
}
