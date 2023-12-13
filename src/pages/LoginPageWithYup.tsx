import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { LoginForm, loginSchema } from './validations/LoginSchema';
import {
	Box,
	Button,
	ButtonGroup,
	FormControl,
	TextField,
} from '@mui/material';
import axios from 'axios';
import { Padding } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function LoginPageWithYup() {
	const navigate = useNavigate(); // ts de dosya yönlendirme işlemi yapan hook

	const {
		control,
		handleSubmit,
		register,
		watch,
		setValue,
		reset,
		getValues,
		formState: { errors, isValid, isDirty, isSubmitted },
	} = useForm<LoginForm>({
		defaultValues: {
			email: 'eve.holt@reqres.in',
			password: 'cityslicka',
			passwordAgain: 'cityslicka',
		},
		resolver: yupResolver(loginSchema), // yup validasyon desteği ile formu kullan.
	});

	console.log('email', watch('email')); // Input OnChange gibi form içerisinde takip ediecek değerlerin değişimin yakalar.

	const password = watch('password');

	// if (password !== undefined) {
	// 	setValue('passwordAgain', password); // form alanın js ile set etmek için
	// }

	console.log('password', password);
	// setValue('passwordAgain', password);

	const onFormSubmit = (formData: LoginForm) => {
		console.log('formData', formData);

		axios
			.post('https://reqres.in/api/login', formData)
			.then((response) => {
				console.log('login-res', response);

				if (response.status === 200) {
					// işlem başarılı ise HomePage yönlendirelim
					// localStorage.setItem('token', JSON.stringify(response.data));
					const token = response.data.token;
					localStorage.setItem('token', token);
					navigate('/');
				}
			})
			.catch((err: any) => {
				if (err.response.status === 400) {
					alert('Böyle bir kullanıcı yada parola bulunamadı');
				}

				console.log('login-error', err);
			});
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
				{/* <input {...register('email')} placeholder="email" /> */}

				{/* <span>{errors.email?.message}</span>
				<br></br> */}

				<FormControl
					sx={{ width: '25ch', marginBottom: '10px', marginTop: '10px' }}
				>
					<Controller
						name="email" // ...register yapısı UI Integration işlemlerinde kullanılmıyor. name üzerinden input forma register ediliyor
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								required
								id="outlined-required"
								label="Email"
								defaultValue="test@test.com"
							/>
						)}
					></Controller>
					<span>{errors.email?.message}</span>
				</FormControl>

				<br></br>

				{/* <input
					type="password"
					{...register('password')}
					placeholder="password"
				/> */}

				<Controller
					name="password" // ...register yapısı UI Integration işlemlerinde kullanılmıyor. name üzerinden input forma register ediliyor
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							required
							id="outlined-required"
							label="Password"
							defaultValue=""
						/>
					)}
				></Controller>
				<br></br>
				<span>{errors.password?.message}</span>
				{/* <br></br>
				<input
					readOnly={true}
					type="text"
					{...register('passwordAgain')}
					placeholder="Parola Tekrar"
				/>
				<br></br> */}
				{/* <input type="submit" value="Login" />
				<input onClick={() => reset()} type="reset" value="Temizle" /> */}

				<Box sx={{ paddingTop: '10px' }}>
					<ButtonGroup variant="outlined" aria-label="outlined button group">
						<Button type="submit">Login</Button>
						<Button onClick={() => reset()}>Reset</Button>
						<Button
							onClick={() => {
								const email = getValues('email'); // formdaki alanı okuruz
								console.log('email1', email);
							}}
						>
							Form State Get Value
						</Button>
					</ButtonGroup>
				</Box>

				{/* <button
					onClick={() => {
						const email = getValues('email'); // formdaki alanı okuruz
						console.log('email1', email);
					}}
				>
					Form State Get Value
				</button> */}
			</form>
		</div>
	);
}

export default LoginPageWithYup;
