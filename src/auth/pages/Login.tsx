import { useEffect, useState } from 'react';
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

interface loginForValidation {
    [key: string]: [(value: string) => boolean, string];
    email: [(value: string) => boolean, string];
    password: [(value: string) => boolean, string];
}

const formValidations: loginForValidation = {
    email: [(value) => value.includes('@'), 'El correo es inválido'],
    password: [(value) => value.length > 0, 'La contraseña es requerida']
}

export const Login = () => {

    // initializations for the login and register forms
    const {
        formState: { email, password },
        onInputChange: onChangeLogin,
        formValidation: { emailValid, passwordValid },
        isFormValid
    } = useForm(loginForm, formValidations);

    const {
        formState: { registerName, registerLastName, registerMail, registerPassword, registerPassword2 },
        onInputChange: onChangeRegister
    } = useForm(registerForm);

    const { startLogin, errorMessage, startRegister } = useAuthStore();
    const [formSubmitted, setFormSubmitted] = useState(false);

    /**
     * @description This function is called when the login form is submitted
     * @param event 
     */
    const loginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormSubmitted(true);
        if (!isFormValid) return;
        startLogin({ email, password })
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

    /**
     * UseEffect to show the error message in a sweetalert when the errorMessage changes
     */
    useEffect(() => {
        if (
            errorMessage !== undefined &&
            errorMessage !== null &&
            errorMessage !== '' &&
            typeof errorMessage !== 'object'
        ) {
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
                                    className={`form-control ${emailValid && formSubmitted ? 'is-invalid' : ''}`}
                                    placeholder="Correo"
                                    name='email'
                                    value={email}
                                    onChange={onChangeLogin}
                                />
                                {
                                    formSubmitted && emailValid && <span className="text-danger x-small">{emailValid}</span>
                                }
                            </div>
                            <div className="form-group mb-2">
                                <input
                                    type="password"
                                    className={`form-control ${passwordValid && formSubmitted ? 'is-invalid' : ''}`}
                                    placeholder="Contraseña"
                                    name='password'
                                    value={password}
                                    onChange={onChangeLogin}
                                />
                                {
                                    formSubmitted && passwordValid && <span className="text-danger x-small">{passwordValid}</span>
                                }
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
