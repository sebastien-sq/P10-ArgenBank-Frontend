import type { Route } from "./+types/home";
import SignInPage from "../pages/SignIn.jsx";

export const links: Route.LinksFunction = () => [];
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Argent Bank - Sign-In" },
    { name: "description", content: "Sign-in page for Argent Bank" },
  ];
}

export default function SignIn() {
  return <SignInPage />;
}
