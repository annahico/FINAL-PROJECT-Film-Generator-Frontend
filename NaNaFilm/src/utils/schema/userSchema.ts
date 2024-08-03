import * as yup from 'yup';

// Define shared password validation schema
const passwordValidation = yup.string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters')
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character');

// Register validation schema
export const RegisterSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  name: yup.string()
    .required('Name is required')
    .matches(/^[A-Za-z\s]+$/, 'Name can only contain alphabetic characters and spaces'),
  password: passwordValidation,
});

// Login validation schema
export const LoginSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: passwordValidation,
});
