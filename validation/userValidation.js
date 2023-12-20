const yup = require('yup');

// Yup schema for user creation

const adduserSchema = yup.object().shape({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    // email: yup.string().email('Invalid email format').required('Email is required'),
    username: yup.string().required('Username is required'),
    Phone: yup.string().matches(/^\d{10}$/, 'Invalid phone number format').required('Phone number is required'),
    password: yup
        .string()
        .required('Password is required')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must contain at least 8 characters, one uppercase, one lowercase, one digit, and one special character'
        ),

});

module.exports = { adduserSchema };
