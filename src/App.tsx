import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useRoutes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import LoginPageWithYup from './pages/LoginPageWithYup';

function App() {
	return useRoutes([
		{
			path: '/login',
			Component: LoginPage,
		},
		{
			path: 'login-with-yup',
			Component: LoginPageWithYup,
		},
	]);
}

export default App;
