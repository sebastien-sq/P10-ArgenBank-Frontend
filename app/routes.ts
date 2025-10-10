import { type RouteConfig, index } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
    { path: "user", file: "routes/user.tsx" },
    { path: "sign-in", file: "routes/sign-in.tsx" },
    { path: "sign-up", file: "routes/sign-up.tsx" },
] satisfies RouteConfig;

