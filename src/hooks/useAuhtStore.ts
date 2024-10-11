import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, checking, clearError, login, logout, RootState, updateColor } from "../store";
import { calendarApi } from "../api";

export const useAuthStore = () => {

    const dispatch = useDispatch<AppDispatch>();

    const {
        status,
        user,
        errorMessage,
        color
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
            const resp = await calendarApi.post('/auth', { email, password });
            const { data } = resp;
            const { name: nombre, lastname: apellido, email: correo, preferences } = data;
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('color', color);
            dispatch(login({ name: nombre, email: correo, lastname: apellido, color: preferences, uid: data.uid }));
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
            const resp = await calendarApi.post('/auth/new', { name: registerName, email: registerMail, password: registerPassword, lastname: registerLastName });
            const { data } = resp
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());
            localStorage.setItem('isAuthenticated', 'true');
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
            const { data } = await calendarApi.get('/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());
            localStorage.setItem('color', data.preferences);
            dispatch(login({ name: data.name, uid: data.uid, lastname: data.lastname, color: data.preferences }));
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

    // TODO::: ahora mismo solo funciona para cambiar de color en las preferencias, 
    // modificar para cambiar el nombre y el apellido y otros datos
    const onStartUpdate = async ({ uid, preferences }: { uid: string, preferences: string }) => {
        try {
            const resp = await calendarApi.put(`/auth/update/${uid}`, { preferences });
            const { data } = resp;
            localStorage.setItem('color', data.preferences);
            dispatch(updateColor(data.preferences));
        } catch (error) {
            console.log("error", error);
        }
    };

    return {
        status,
        user,
        errorMessage,
        startLogin,
        startRegister,
        checkAuthToken,
        onStartLogout,
        color,
        onStartUpdate
    }
}