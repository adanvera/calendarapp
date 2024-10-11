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

    /**
    * @description This function is called when the login form is submitted
    * @param email
    * @param password
    * @returns void
    * */
    const startLogin = async ({ email, password }: { email: string, password: string }) => {
        dispatch(checking());
        try {
            const resp = await calendarApi.post('/api/auth', { email, password });
            const { data } = resp;
            const { name: nombre, lastname: apellido, email: correo } = data;
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());
            localStorage.setItem('isAuthenticated', 'true');
            dispatch(login({ name: nombre, email: correo, lastname: apellido }));
        } catch (error) {
            console.log("error", error);
            dispatch(logout('Credentials are invalid'));
            setTimeout(() => {
                dispatch(clearError());
            }, 10);
        }
    }

    /**
    * @description This function is called when the register form is submitted
    * @param registerName
    * @param registerMail
    * @param registerPassword
    * @param registerLastName
    * @returns void
    * */
    const startRegister = async ({ registerName, registerMail, registerPassword, registerLastName }: { registerName: string, registerMail: string, registerPassword: string, registerLastName: string }) => {
        dispatch(checking());
        try {
            const resp = await calendarApi.post('/api/auth/new', { name: registerName, email: registerMail, password: registerPassword, lastname: registerLastName });
            const { data } = resp
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());
            dispatch(login({ name: data.name, email: data.email, lastname: data.lastname }));
        } catch (error) {
            const { response } = error as { response: { data: { msg: string } } };
            dispatch(logout(response.data.msg));
            setTimeout(() => {
                dispatch(clearError());
            }, 10);
        }
    }

    /**
    * @description This function is called when the app is loaded to check if the token is valid
    * @returns void
    * */
    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        dispatch(checking());
        if (!token) return dispatch(logout({}));
        try {
            const { data } = await calendarApi.get('/api/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());
            dispatch(login({ name: data.name, uid: data.uid, lastname: data.lastname }));
        } catch (error) {
            localStorage.clear();
            dispatch(logout({}));
        }
    }

    /**
     * @description This function is called when the user clicks on the logout button
     * @returns void
     *  */
    const onStartLogout = () => {
        dispatch(checking());
        setTimeout(() => {
            localStorage.clear();
            dispatch(logout({}));
        }, 1000);
    }

    return {
        status,
        user,
        errorMessage,
        startLogin,
        startRegister,
        checkAuthToken,
        onStartLogout
    }
}