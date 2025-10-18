/** @format */
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setSuccess('');

		try {
			const { data } = await axios.post('http://localhost:3001/api/user/login', {
				email,
				password,
			});

			if (data.status === 'success') {
				setSuccess('Login successful!');
				console.log('User data:', data);
				// Temporary: redirect manually
				window.location.href = '/';
			} else {
				setError(data.message || 'Invalid credentials');
			}
		} catch (err) {
			console.error('Login error:', err);
			setError(err.response?.data?.message || 'Something went wrong');
		}
	};

	return (
		<div className='main-container'>
			<div className='login-container'>
				<h1 className='login-title'>Log in to Zeta</h1>
				<p className='login-subtitle'>Enter your details</p>

				{error && <p className='error'>{error}</p>}
				{success && <p className='success'>{success}</p>}

				<form onSubmit={handleSubmit} className='login-form'>
					<div className='form-group'>
						<input
							type='email'
							placeholder='Email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className='input-field'
						/>
					</div>

					<div className='form-group'>
						<input
							type='password'
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
							Forgot Password?
						</a>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
