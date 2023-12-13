import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { LoginForm, loginSchema } from './validations/LoginSchema';

function LoginPageWithYup() {
	const {
		handleSubmit,
		register,
		watch,
		setValue,
		reset,
		getValues,
		formState: { errors, isValid, isDirty, isSubmitted },
	} = useForm<LoginForm>({
		resolver: yupResolver(loginSchema), // yup validasyon desteği ile formu kullan.
	});

	console.log('email', watch('email')); // Input OnChange gibi form içerisinde takip ediecek değerlerin değişimin yakalar.

	const password = watch('password');

	if (password !== undefined) {
		setValue('passwordAgain', password); // form alanın js ile set etmek için
	}

	console.log('password', password);
	// setValue('passwordAgain', password);

	const onFormSubmit = (formData: LoginForm) => {
		console.log('formData', formData);
	};

	return (
		<div style={{ padding: '10px' }}>
			{/* <div>{errors.root?.message}</div> */}
			{isDirty ? 'Form kirlendi' : ''}
			<br></br>
			{isSubmitted ? 'Form Gönderildi' : ''}
			<br></br>
			{isValid ? 'Form Valid' : 'Form InValid'}
			<form onSubmit={handleSubmit(onFormSubmit)}>
				<input {...register('email')} placeholder="email" />

				<span>{errors.email?.message}</span>
				<br></br>
				<input
					type="password"
					{...register('password')}
					placeholder="password"
				/>
				<br></br>
				<span>{errors.password?.message}</span>
				<input
					readOnly={true}
					type="text"
					{...register('passwordAgain')}
					placeholder="Parola Tekrar"
				/>
				<br></br>
				<input type="submit" value="Login" />
				<input onClick={() => reset()} type="reset" value="Temizle" />
				<button
					onClick={() => {
						const email = getValues('email'); // formdaki alanı okuruz
						console.log('email1', email);
					}}
				>
					Form State Get Value
				</button>
			</form>
		</div>
	);
}

export default LoginPageWithYup;
