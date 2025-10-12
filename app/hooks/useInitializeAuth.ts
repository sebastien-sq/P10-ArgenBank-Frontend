import { useSelector } from "react-redux";
import { useGetUserProfileQuery } from "~/services/userApi";
import type { Store } from "~/store";


export const useInitializeAuth = () => {
    const token = useSelector((state: Store) => state.auth.token);
    const isAuthenticated = useSelector((state: Store) => state.auth.isAuthenticated);

    useGetUserProfileQuery(undefined, {
        skip: !isAuthenticated || !token
    });
};

