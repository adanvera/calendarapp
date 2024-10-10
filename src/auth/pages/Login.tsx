import { useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import './login.css';
import Swal from 'sweetalert2';

const loginForm = {
    email: '',
    password: ''
}

const registerForm = {
    registerName: '',
    registerLastName: '',
    registerMail: '',
    registerPassword: '',
    registerPassword2: ''
}

export const Login = () => {

    // initializations for the login and register forms
    const { formState: { email, password }, onInputChange: onChangeLogin } = useForm(loginForm);
    const { formState: { registerName, registerLastName, registerMail, registerPassword, registerPassword2 }, onInputChange: onChangeRegister } = useForm(registerForm);
    const { startLogin, errorMessage, startRegister } = useAuthStore();

    /**
     * @description This function is called when the login form is submitted
     * @param event 
     */
    const loginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        startLogin({ email, password });
    }

    /**
     * @description This function is called when the register form is submitted
     * @param event 
     */
    const registerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (registerPassword !== registerPassword2) {
            return Swal.fire('Error en el registro', 'Las contraseñas deben ser iguales', 'error');
        }

        startRegister({ registerName, registerMail, registerPassword, registerLastName });
    }

    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire('Error en la autenticación', errorMessage, 'error');
        }
    }, [errorMessage]);

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={loginSubmit} action="">
                        <div className='col-lg-12'>
                            <div className="form-group mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Correo"
                                    name='email'
                                    value={email}
                                    onChange={onChangeLogin}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Contraseña"
                                    name='password'
                                    value={password}
                                    onChange={onChangeLogin}
                                />
                            </div>
                            <div className="form-group mb-2 row">
                                <div className='col-lg-12'>
                                    <input
                                        type="submit"
                                        className="btnSubmit"
                                        value="Login"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={registerSubmit} action="">
                        <div>
                            <div className="form-group mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre"
                                    name='registerName'
                                    value={registerName}
                                    onChange={onChangeRegister}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Apellido"
                                    name='registerLastName'
                                    value={registerLastName}
                                    onChange={onChangeRegister}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Correo"
                                    name='registerMail'
                                    value={registerMail}
                                    onChange={onChangeRegister}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Contraseña"
                                    name='registerPassword'
                                    value={registerPassword}
                                    onChange={onChangeRegister}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Repita la contraseña"
                                    name='registerPassword2'
                                    value={registerPassword2}
                                    onChange={onChangeRegister}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <input
                                    type="submit"
                                    className="btnSubmit"
                                    value="Crear cuenta"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
