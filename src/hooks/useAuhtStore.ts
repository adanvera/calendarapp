import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, checking, clearError, login, logout, RootState } from "../store";
import { calendarApi } from "../api";

export const useAuthStore = () => {

    const dispatch = useDispatch<AppDispatch>();

    const {
        status,
        user,
        errorMessage
    } = useSelector((state: RootState) => state.auth);

    const startLogin = async ({ email, password }: { email: string, password: string }) => {
        dispatch(checking());
        try {
            const resp = await calendarApi.post('/api/auth', { email, password });
            const { data } = resp
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());
            dispatch(login({ name: data.name, email: data.email, lastname: data.lastname }));
        } catch (error) {
            console.log("error", error);
            dispatch(logout('Credentials are invalid'));
            setTimeout(() => {
                dispatch(clearError());
            }, 10);
        }
    }

    return {
        status,
        user,
        errorMessage,
        startLogin
    }
}