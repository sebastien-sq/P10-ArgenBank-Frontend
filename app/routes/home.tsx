import type { Route } from "./+types/home";
import HomePage from "~/pages/Home";

export const links: Route.LinksFunction = () => [];
export function meta({}: Route.MetaArgs) {
  return [
    { title: "ArgenBank - Home" },
    { name: "description", content: "ArgenBank Home Page" },
  ];
}

export default function Home() {
  return <HomePage />;
}
