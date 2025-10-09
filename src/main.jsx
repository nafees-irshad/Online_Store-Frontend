/** @format */

// src/main.jsx (or src/main.js)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Assuming your main App component is now App.jsx or App.js
// import './style.css'; // Or your global CSS file

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
