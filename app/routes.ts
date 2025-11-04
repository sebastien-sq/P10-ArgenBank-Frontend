import { type RouteConfig, index } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
    { path: "profile", file: "routes/profile.tsx" },
    { path: "login", file: "routes/login.tsx" },
    { path: "sign-up", file: "routes/sign-up.tsx" },
] satisfies RouteConfig;

