import React, {useState} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios'

import signinImage from '../assets/signup.jpg';

const cookies = new Cookies();

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: ''
}
const Auth = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [form, setForm] = useState(initialState)
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const switchMode = () => {
        setIsSignup((prev) => !prev);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const {fullName, username, password, phoneNumber, avatarURL} = form;

        const URL = 'https://podnes-chat-app.herokuapp.com/auth';

        try {
            const {data: {token, userId, fullName, hashedPassword}} = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
                username,
                password,
                fullName: form.fullName,
                phoneNumber,
                avatarURL
            })

            cookies.set('chat_token', token);
            cookies.set('username', username);
            cookies.set('fullName', fullName);
            cookies.set('userId', userId);
            if(isSignup) {
                cookies.set('phoneNumber', phoneNumber);
                cookies.set('avatarURL', avatarURL);
                cookies.set('hashedPassword', hashedPassword);
            }
            window.location.reload();
        } catch (error) {
            alert('error while auth: ' + error.message)
        }
    }

    return (
        <div className='auth__form-container'>
            <div className='auth__form-container_fields'>
                <div className='auth__form-container_fields-content'>
                    <p>{isSignup ? 'Sign up' : 'Login'}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='fullName'>Full Name</label>
                                <input
                                    type="text"
                                    name='fullName'
                                    placeholder='fullName'
                                    onChange={handleChange}
                                    required/>
                            </div>
                        )}
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='username'>Username</label>
                            <input
                                type="text"
                                name='username'
                                placeholder='Username'
                                onChange={handleChange}
                                required/>
                        </div>
                        {isSignup && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='phoneNumber'>Phone Number</label>
                                <input
                                    type="text"
                                    name='phoneNumber'
                                    placeholder='Phone Number'
                                    onChange={handleChange}
                                    required/>
                            </div>
                        )}
                        {isSignup && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='avatarURL'>Avatar URL</label>
                                <input
                                    type="text"
                                    name='avatarURL'
                                    placeholder='Avatar URL'
                                    onChange={handleChange}
                                    required/>
                            </div>
                        )}
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='password'>Password</label>
                            <input
                                type="password"
                                name='password'
                                placeholder='password'
                                onChange={handleChange}
                                required/>
                        </div>
                        {isSignup && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='confirmPassword'>Confirm Password</label>
                                <input
                                    type="password"
                                    name='confirmPassword'
                                    placeholder='confirmPassword'
                                    onChange={handleChange}
                                    required/>
                            </div>
                        )}
                        <div className='auth__form-container_fields-content_button'>
                            <button type='submit'>{isSignup ? 'Sign up' : 'Login'}</button>
                        </div>
                    </form>
                    <div className='auth__form-container_fields-account'>
                        <p>
                            {isSignup
                                ? 'Already have an account?'
                                : 'Don\'t have an account?'
                            }
                            <span onClick={switchMode}>
                                {isSignup ? 'Login' : 'Sign up'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className='auth__form-container_image'>
                <img src={signinImage} alt='sign in' />
            </div>
        </div>
    );
};

export default Auth;
