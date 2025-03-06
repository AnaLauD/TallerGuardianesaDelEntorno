import { use, useState } from 'react';
import './Register.css';

const Register = ({closeModal}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [resultData, setresultData] = useState('null');
    //const error = [""]

    const RegistrarNuevoUsuario = async (event) => {
        console.log("entra al registrar nuevo usuario")
        event.preventDefault();

        const user = {
            User: {
                Name: name,
                username: username,
                email: email,
                password: password
            }
        };   

        const consulta = await fetch('https://mammal-excited-tarpon.ngrok-free.app/api/user/register?secret=TallerReact2025!', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
        const data = await consulta.json();
        setresultData(data);

        console.log(data.details);

    }

    return (
        <div className="register-container d-flex align-items-center justify-content-center vh-100">
            <div className="card shadow-lg p-4 rounded w-25 w-md-50 position-relative">
                {/* Botón para cerrar */}
                <button className="btn-close position-absolute top-0 end-0 m-3" onClick={closeModal}></button>
    
                <h3 className="text-center text-primary">Registro de Usuario</h3>
    
                {/* Mensaje de error */}
                {resultData.success === false && (
                    <div className="alert alert-danger text-center p-2">
                        <small>❌ {resultData.details}</small>
                    </div>
                )}
    
                {/* Mensaje de éxito */}
                {resultData.result && (
                    <div className="alert alert-success text-center p-2">
                        <small>✅ Usuario registrado con éxito</small>
                    </div>
                )}
    
                <form onSubmit={RegistrarNuevoUsuario}>
                    <div className="mb-3">
                        <label htmlFor="Login-Email" className="form-label">Email</label>
                        <input 
                            type="email" required
                            className="form-control form-control-lg" 
                            id="Login-Email" 
                            placeholder="Ingrese su email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>                    
    
                    <div className="mb-3">
                        <label htmlFor="Name" className="form-label">Nombre</label>
                        <input 
                            type="text" required
                            className="form-control form-control-lg" 
                            id="Name" 
                            placeholder="Ingrese su nombre"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
    
                    <div className="mb-3">
                        <label htmlFor="User-Name" className="form-label">Nombre de usuario</label>
                        <input 
                            type="text" required
                            className="form-control form-control-lg" 
                            id="User-Name" 
                            placeholder="Ingrese su nombre de usuario"
                            value={username}
                            onChange={e => setUserName(e.target.value)}
                        />
                    </div>
    
                    <div className="mb-3">
                        <label htmlFor="Login-Password" className="form-label">Contraseña</label>
                        <input 
                            type="password" required
                            className="form-control form-control-lg" 
                            id="Login-Password" 
                            placeholder="Ingrese su contraseña"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
    
                    <button type="submit" className="btn btn-primary w-100">📝 Registrarse</button>
                </form>
            </div>
        </div>
    );
    
}

export default Register;