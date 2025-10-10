import { useSelector } from "react-redux";
import type { Store } from "~/store";

export const useAuthenticated = () => {
    return useSelector((state: Store) => state.auth.isAuthenticated);
};