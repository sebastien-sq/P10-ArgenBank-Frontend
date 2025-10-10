import type { Route } from "./+types/home";
import SignUpPage from "~/pages/SignUp";

export const links: Route.LinksFunction = () => [];
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Argent Bank - Sign-Up" },
    { name: "description", content: "Sign-Up page for Argent Bank" },
  ];
}

export default function SignUp() {
  return <SignUpPage />;
}
