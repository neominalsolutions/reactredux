import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Outlet, useRoutes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import LoginPageWithYup from './pages/LoginPageWithYup';
import HomePage from './pages/HomePage';
import AuthGuard from './pages/guards/AuthGuard';
import AuthenticatedUserPage from './pages/AuthenticatedUserPage';

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
		{
			path: '/',
			Component: HomePage,
		},
		{
			path: '/authusers',
			element: (
				<AuthGuard>
					{/* [Authorize attribute sarmalladık] */}
					<AuthenticatedUserPage></AuthenticatedUserPage>
				</AuthGuard>
			),
		},
		{
			path: 'admin', // Login isek admin module ve bu module altındaki sayfaların hepsini koruma altına almış olduk.
			element: (
				<AuthGuard>
					<h1>Admin Page</h1>
					<Outlet />
				</AuthGuard>
			),
			children: [
				{
					path: 'users',
					element: <>Users Page</>,
				},
				{
					path: 'roles',
					element: <>Roles Page</>,
				},
			],
		},
	]);
}

export default App;
