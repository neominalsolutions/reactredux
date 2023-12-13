import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

type AuthGuardProps = {
	children: any;
};

// <Layout><Stack /><Layout/>
// <AuthGuard><HomePage></AuthGuard/>
// sayfalar arası geçişlerdeki yetki kontrolü için kullanılan bir yöntem.
// Bu işlem net taraafında [authorize] attribute benzer bir kullanım sağlar.
function AuthGuard({ children }: AuthGuardProps) {
	const token = localStorage.getItem('token');

	useEffect(() => {
        // asenkron veri çekip async yapılar içinde bir kontrol sağlayabiliriz.
		console.log('useEffect');
	}, []);

	console.log('AuthGuard');

	if (token) {
		return children; // token varsa kaldığın yerden devam et
	}

	return <Navigate to="/login-with-yup"></Navigate>; // token yoksa login sayfasına yönlendir.
}

export default AuthGuard;
