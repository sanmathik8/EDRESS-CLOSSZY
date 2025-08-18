
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'email':
        if (!value.trim()) error = 'Email is required.';
        else if (!emailRegex.test(value)) error = 'Invalid email format.';
        break;
      case 'password':
        if (!value) error = 'Password is required.';
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBackendError('');
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      const fieldError = validateField(name, value);
      setErrors((prevErrors) => ({ ...prevErrors, [name]: fieldError }));
      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setBackendError('');

    const emailError = validateField('email', formData.email);
    const passwordError = validateField('password', formData.password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
        window.location.reload();
      } else {
        setBackendError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Network error:', error);
      setBackendError('Could not connect to the server. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Log In to Your Account</h2>

        {backendError && <div className="error-backend">{backendError}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
              placeholder="john.doe@example.com"
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'input-error' : ''}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Logging In...' : 'Log In'}
          </button>
        </form>

        <p className="register-text">
          Don't have an account?{' '}
          <span className="register-link" onClick={() => navigate('/register')}>
            Register here
          </span>
        </p>
      </div>

      {/* CSS inside component */}
      <style>{`
        * {
          box-sizing: border-box;
        }

        .login-page {
          height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(to bottom right, #cbd5f0, #e0c3fc);
          padding: 20px;
        }

        .login-card {
          background: white;
          border-radius: 12px;
          padding: 30px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .login-title {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 24px;
          color: #222;
        }

        .form-group {
          margin-bottom: 18px;
        }

        label {
          display: block;
          margin-bottom: 6px;
          font-size: 0.95rem;
          color: #333;
        }

        input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 1rem;
        }

        .input-error {
          border-color: red;
        }

        .error-text {
          color: red;
          font-size: 0.85rem;
          margin-top: 4px;
        }

        .error-backend {
          color: #d32f2f;
          background: #fdecea;
          padding: 10px;
          border-radius: 6px;
          margin-bottom: 16px;
          font-size: 0.95rem;
        }

        .password-wrapper {
          position: relative;
        }

        .toggle-password {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #333;
        }

        .submit-button {
          width: 100%;
          padding: 12px;
          background-color: #3b49df;
          color: white;
          font-size: 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          margin-top: 10px;
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .register-text {
          text-align: center;
          margin-top: 20px;
          font-size: 0.95rem;
          color: #555;
        }

        .register-link {
          color: #1e40af;
          cursor: pointer;
          font-weight: 500;
        }

        @media (max-width: 500px) {
          .login-card {
            padding: 20px;
          }

          .login-title {
            font-size: 1.25rem;
          }

          .submit-button {
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
