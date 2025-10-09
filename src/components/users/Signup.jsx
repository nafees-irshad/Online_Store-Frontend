/** @format */

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
// import '../../assets/store.PNG'

const Signup = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	// const [address, setAddress] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				'http://localhost:3001/api/user/register',
				{
					name,
					email,
					password,
				}
			);
			setSuccess('Signup successful! Redirecting to login...');
			setError('');
			// Redirect to login page after a brief delay
			setTimeout(() => navigate('/login'), 2000);
		} catch (error) {
			setError('Error signing up. Please try again.');
		}
	};

	return (
		<div className='main-container'>
			<div className='signup-container'>
				<h2 className='signup-title'>Create an account</h2>
				<p className='signup-subtitle'>Enter your details below</p>

				{error && <p className='error'>{error}</p>}

				<form onSubmit={handleSubmit} className='form'>
					<div className='form-group'>
						<input
							type='text'
							placeholder='Name'
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							className='input-field'
						/>
					</div>
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
							type='text'
							placeholder='Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className='input-field'
						/>
					</div>
					<button type='submit' className='submit-button'>
						Create Account
					</button>
					<div className='google-signup'>
						<button className='google-button'>Sign up with Google</button>
					</div>

					<p className='login-link'>
						Already have an account?{' '}
						<a className='login' href='/login'>
							Login
						</a>
					</p>
				</form>
			</div>
		</div>
	);
};

export default Signup;
