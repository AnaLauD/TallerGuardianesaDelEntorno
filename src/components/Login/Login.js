import React from 'react';
import { useState } from 'react';
import './Login.css';
import '../Register/Register.css';
import { useDispatch } from 'react-redux';
import { setUser } from  '../../userSlice';  

const Login = ({closeModal}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');    
    const [resultData, setResultData] = useState('null');

    const dispatch = useDispatch();

    const Loguearse = async (event) => {
        console.log("entra al log usuario")
        event.preventDefault();         

        const consulta = await fetch('https://mammal-excited-tarpon.ngrok-free.app/api/user/login?secret=TallerReact2025!', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: email, password: password}),
        })

        const data = await consulta.json();
        setResultData(data);
        dispatch(setUser(data.user));

        console.log(data.isValid);

    }

    return (
        <div className="register-container d-flex align-items-center justify-content-center vh-100">
            <div className="card shadow-lg p-4 rounded w-25 w-md-50 position-relative">
                {/* Botón para cerrar */}
                <button className="btn-close position-absolute top-0 end-0 m-3" onClick={closeModal}></button>
    
                <h3 className="text-center text-primary">Iniciar Sesión</h3>
    
                {/* Mensaje de error */}
                {resultData.isValid === false && (
                    <div className="alert alert-danger text-center p-2">
                        <small>❌ Email o contraseña incorrectos</small>
                    </div>
                )}
    
                <form onSubmit={Loguearse}>
                    <div className="mb-3">
                        <label htmlFor="Login-Email" className="form-label">Email</label>
                        <input 
                            type="email" 
                            className="form-control form-control-lg" 
                            id="Login-Email" 
                            placeholder="Ingrese su email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>                    
                    
                    <div className="mb-3">
                        <label htmlFor="Login-Password" className="form-label">Contraseña</label>
                        <input 
                            type="password" 
                            className="form-control form-control-lg" 
                            id="Login-Password" 
                            placeholder="Ingrese su contraseña"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
    
                    <button type="submit" className="btn btn-primary w-100">🔑 Iniciar Sesión</button>
                </form>
            </div>
        </div>
    );
    
}

export default Login;