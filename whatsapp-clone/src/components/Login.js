import React from 'react';
import { Button } from '@material-ui/core';
import './Login.css';
import { auth, provider } from '../firebase';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../Reducer';

const Login = () => {
    const [{}, dispatch] = useStateValue();
    const signIn = () => {
        auth.signInWithPopup(provider).then(result => 
            {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user
                })
            }
            ).catch(error => alert(error.message));
    };

    return (
        <div className='login'>
            <div className='login_container'>
                <img src='https://www.freeiconspng.com/thumbs/logo-whatsapp-png/download-and-use-logo-whatsapp-png-clipart-3.png' 
                    alt='Whatsapp Logo'
                />

                <div className='login_text'>
                    <h1>Sign in to Whatsapp</h1>
                </div>

                <Button onClick={signIn}>
                Sign In With Google
                </Button>
            </div>        
            
        </div>
    )
}

export default Login;
