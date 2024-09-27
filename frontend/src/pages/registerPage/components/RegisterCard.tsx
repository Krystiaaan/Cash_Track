import React from 'react';
import { useAuth } from '../../../Auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // Yup for validation

export const RegisterCard: React.FC = () => {
  const { register, error } = useAuth(); // Use register function and error from AuthProvider
  const navigate = useNavigate(); // For redirection after successful registration

  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .required('Username is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    currency: Yup.string().required('Currency is required'), // Add currency validation
  });

  // Initial form values for Formik
  const initialValues = {
    email: '',
    username: '',
    password: '',
    currency: '', // Currency field
  };

  // Handle form submission
  const handleSubmit = async (values: typeof initialValues) => {
    try {
      await register(values); // Call register from AuthProvider
      navigate('/mainpage'); // Redirect to dashboard after successful registration
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h1>Register</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if exists */}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema} // Apply Yup validation schema
        onSubmit={handleSubmit} // Call handleSubmit on form submission
      >
        {({ isSubmitting }) => (
          <Form>
            <div style={{ marginBottom: '15px' }}>
              <label>Email:</label>
              <Field
                type="email"
                name="email"
                style={{ width: '100%', padding: '8px' }}
              />
              <ErrorMessage name="email" component="div"  />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label>Username:</label>
              <Field
                type="text"
                name="username"
                style={{ width: '100%', padding: '8px' }}
              />
              <ErrorMessage name="username" component="div"  />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label>Password:</label>
              <Field
                type="password"
                name="password"
                style={{ width: '100%', padding: '8px' }}
              />
              <ErrorMessage name="password" component="div"  />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label>Currency:</label>
              <Field
                type="text"
                name="currency"
                style={{ width: '100%', padding: '8px' }}
              />
              <ErrorMessage name="currency" component="div"  />
            </div>

            <button
              type="submit"
              style={{ padding: '10px 15px', width: '100%' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};