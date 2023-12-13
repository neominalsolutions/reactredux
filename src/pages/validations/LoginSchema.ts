// validation schema
import * as yup from 'yup';

/*
At least one lowercase alphabet i.e. [a-z]
At least one uppercase alphabet i.e. [A-Z]
At least one Numeric digit i.e. [0-9]
At least one special character i.e. [‘@’, ‘$’, ‘.’, ‘#’, ‘!’, ‘%’, ‘*’, ‘?’, ‘&’, ‘^’]
Also, the total length must be in the range [8-15]
*/

export const loginSchema = yup.object({
	email: yup
		.string()
		.trim()
		.lowercase()
		.required('email boş geçilemez')
		.email('e-posta formatında giriş yapılmalıdır'),
	password: yup.string().required('parola boş geçilemez'),
	// password: yup
	// 	.string()
	// 	.required('parola boş geçilemez')
	// 	.matches(
	// 		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/,
	// 		'Daha kompleks bir parola seçiniz. Minimum 8 karakter olmalıdır. Makisimum 15 karakter seçebilirsiniz'
	// 	),
	passwordAgain: yup.string(),
});

export type LoginForm = yup.InferType<typeof loginSchema>;
// validayon şemasını kullanara yeni bir form tipi açtık
