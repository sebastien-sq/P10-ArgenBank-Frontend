import { type RouteConfig, index } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),

    // pages avec chemin explicite
    { path: "user", file: "routes/user.tsx" },
    { path: "sign-in", file: "routes/sign-in.tsx" },
] satisfies RouteConfig;

