import type { Route } from "./+types/home";
import UserPage from "../pages/User.jsx";

export const links: Route.LinksFunction = () => [];
export function meta({}: Route.MetaArgs) {
  return [
    { title: "User Page" },
    { name: "description", content: "Welcome to your dashboard !" },
  ];
}

export default function User() {
  return <UserPage />;
}
