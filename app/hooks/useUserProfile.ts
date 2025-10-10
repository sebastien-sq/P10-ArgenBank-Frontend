import { useSelector} from "react-redux"
import type { Store } from "~/store";

export const useFetchUserEmail = () => {
    return useSelector((state: Store) => state.user.email);
}   
export const useFetchUserFirstName = () => {
    return useSelector((state: Store) => state.user.firstName);
}
export const useFetchUserLastName = () => { 
    return useSelector((state: Store) => state.user.lastName);
}
export const useFetchUserId = () => {
    return useSelector((state: Store) => state.user.id);
}
