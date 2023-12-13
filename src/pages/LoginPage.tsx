import React from 'react';
import { useForm } from 'react-hook-form';
type LoginForm = {
	email: string;
	password: string;
};

function LoginPage() {
	const {
		handleSubmit,
		register,
		watch,
		formState: { errors, isValid },
	} = useForm<LoginForm>();

	const onFormSubmit = (formData: LoginForm) => {
		console.log('formData', formData);
	};

	return (
		<div style={{ padding: '10px' }}>
			{/* <div>{errors.root?.message}</div> */}
			<form onSubmit={handleSubmit(onFormSubmit)}>
				<input
					{...register('email', {
						// required: {
						// 	value: true,
						// 	message: 'Email boş geçilemez',
						// },
						// minLength: {
						// 	value: 20,
						// 	message: 'En az 20 karakter giriniz',
						// },

						validate: (value: string) => {
							console.log('value', value);

							if (!value.includes('@')) {
								return false;
							} else {
								console.log('includes');
								return true;
							}
						},
					})}
					placeholder="email"
				/>

				<span>{errors.email?.message}</span>
				<br></br>
				<input
					type="password"
					{...register('password')}
					placeholder="password"
				/>
				<br></br>
				<input disabled={!isValid} type="submit" value="Login" />
			</form>
		</div>
	);
}

export default LoginPage;
