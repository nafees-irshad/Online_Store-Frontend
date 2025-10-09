/** @format */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import api from '../../Common/api';
import './Login.css';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const { login } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await api.post('http://localhost:3001/api/user/login', {
				email,
				password,
			});

			// const data = await response.json();

			if (response.data.status === 'success') {
				// Store the token using AuthContext
				login(response.data.token);
				// Redirect to home page
				window.location.href = '/';
			}
		} catch (err) {
			setError('Error logging in. Please try again');
		}
	};

	return (
		<div className='main-container'>
			<div className='login-container'>
				<h1 className='login-title'>Log in to Zeta</h1>
				<p className='login-subtitle'>Enter your details</p>

				{error && <p className='error'>{error}</p>}

				<form onSubmit={handleSubmit} className='login-form'>
					<div className='form-group'>
						<input
							type='text'
							placeholder='Email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className='input-field'
						/>
					</div>
					<div className='form-group'>
						<input
							type='password' // Changed from 'text' to 'password'
							placeholder='Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className='input-field'
						/>
					</div>
					<div className='login-section'>
						<button type='submit' className='login-button'>
							Login
						</button>
						<a className='forget-pass' href='/forget-password'>
							Forget Password ?
						</a>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
 