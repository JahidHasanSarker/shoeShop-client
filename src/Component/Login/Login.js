import React from 'react';
import { Button } from 'react-bootstrap';

import useAuth from '../../Hook/useAuth';
import { useHistory, useLocation } from "react-router";
import authInit from './firebase/firebase.init';
import './Login.css';


authInit();



const Login = ({useHistory}) => {



const {signInUsingGoogle, setLoading, isLogin, handleregister, handleNameChange, handleEmailChange,      handlePasswordChange, error, toggolLogin} = useAuth();

const location = useLocation();
const history = useHistory();
const redirect_uri = location.state?.from || '/'
console.log('came from', location.state?.from);

const handleGoogleLogin = () => {
    signInUsingGoogle()
    .then(result =>{
      setLoading(true)
        history.push(redirect_uri)
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setLoading(false);
    });
}


    return (
        <div className="maincontainer">
        <div className="container-fluid">
            <div className="row no-gutter">
               
                <div className="col-md-6 d-none d-md-flex bg-image"></div>
                
                <div className="col-md-6 bg-light">
                    <div className="login d-flex align-items-center py-5">
                       
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-10 col-xl-7 mx-auto">
                                    <h3 className="display-4">Please {isLogin ? 'login' : 'register'}</h3>
                                    <p className="text-muted mb-4">Enter your personal details and start journey with us</p>
                                    <form onSubmit={handleregister}>
                                        {!isLogin && <div className="mb-3">
                                            <input onBlur={handleNameChange} type="text" placeholder="Your Name" required="" autoFocus="" className="form-control rounded-pill border-0 shadow-sm px-4" />
                                        </div>}
                                        <div className="mb-3">
                                            <input onBlur={handleEmailChange} id="inputEmail" type="email" placeholder="Email address" required="" autoFocus="" className="form-control rounded-pill border-0 shadow-sm px-4" />
                                        </div>
                                        <div onBlur={handlePasswordChange} className="mb-3">
                                            <input id="inputPassword" type="password" placeholder="Password" required="" className="form-control rounded-pill border-0 shadow-sm px-4 text-primary" />
                                        </div>
                                        <div className="text-danger pb-3">{error}</div>
                                        <div className="form-check">
                                            <input onChange={toggolLogin} id="customCheck1" type="checkbox" className="form-check-input" />
                                            <label htmlFor="customCheck1" className="form-check-label">Allready Registerd </label>
                                        </div>
                                        <div className="d-grid gap-2 mt-2">
                                        <Button type='submit' variant="outline-primary" className=" btn-block text-capitalize mb-2 rounded-pill shadow-sm">{isLogin? 'Sign in' : 'Sign up'}</Button>
                                        </div>
                                        <div className="d-grid gap-2 mt-2">
                                        <Button onClick={handleGoogleLogin}  variant="primary" className="btn-block text-capitalize mb-2 rounded-pill shadow-sm">Google Sign in</Button>
                                        </div>
                                        
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
};

export default Login;