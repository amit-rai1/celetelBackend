const yup = require('yup');

// Yup schema for user creation

const adduserSchema = yup.object().shape({
    first_name: yup.string().matches(/^[A-Za-z]+$/, 'First name must contain only letters').required('First name is required'),
    last_name: yup.string().matches(/^[A-Za-z]+$/, 'First name must contain only letters').required('First name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    username: yup
        .string()
        .required('Username is required')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{3,20}$/,
            'Username must be 3-15 characters, contain at least one letter, one number, and one special character'
        ),
        Phone: yup
        .number('Phone number must be a number')
        .test('is-phone', 'Invalid Indian phone number', (value) => {
            const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
            return phoneRegex.test(value);
        })
        .required('Phone number is required')
        .typeError('Phone number must be a valid number')
        .integer('Phone number must be an integer')
        .positive('Phone number must be a positive integer')
        .test('len', 'Phone number must be exactly 10 digits', val => val && val.toString().length === 10)
        .required('Phone number is required'),

    password: yup.string()
        .required('Password is required')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must contain at least 8 characters, one uppercase, one lowercase, one digit, and one special character'
        ),

});

module.exports = { adduserSchema };
