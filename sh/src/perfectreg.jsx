// login

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';

// const Login = () => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [errors, setErrors] = useState({});
//   const [backendError, setBackendError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   const validateField = (name, value) => {
//     let error = '';
//     switch (name) {
//       case 'email':
//         if (!value.trim()) error = 'Email is required.';
//         else if (!emailRegex.test(value)) error = 'Invalid email format.';
//         break;
//       case 'password':
//         if (!value) error = 'Password is required.';
//         break;
//       default:
//         break;
//     }
//     return error;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBackendError('');
//     setFormData((prevData) => {
//       const updatedData = { ...prevData, [name]: value };
//       const fieldError = validateField(name, value);
//       setErrors((prevErrors) => ({ ...prevErrors, [name]: fieldError }));
//       return updatedData;
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setBackendError('');

//     const emailError = validateField('email', formData.email);
//     const passwordError = validateField('password', formData.password);

//     if (emailError || passwordError) {
//       setErrors({ email: emailError, password: passwordError });
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:5000/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         localStorage.setItem('user', JSON.stringify(data.user));
//         navigate('/');
//         window.location.reload();
//       } else {
//         setBackendError(data.message || 'Login failed. Please check your credentials.');
//       }
//     } catch (error) {
//       console.error('Network error:', error);
//       setBackendError('Could not connect to the server. Please try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-card">
//         <h2 className="login-title">Log In to Your Account</h2>

//         {backendError && <div className="error-backend">{backendError}</div>}

//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Email Address</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className={errors.email ? 'input-error' : ''}
//               placeholder="john.doe@example.com"
//             />
//             {errors.email && <p className="error-text">{errors.email}</p>}
//           </div>

//           <div className="form-group">
//             <label>Password</label>
//             <div className="password-wrapper">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className={errors.password ? 'input-error' : ''}
//                 placeholder="••••••••"
//               />
//               <button
//                 type="button"
//                 className="toggle-password"
//                 onClick={() => setShowPassword(!showPassword)}
//                 aria-label={showPassword ? 'Hide password' : 'Show password'}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//             {errors.password && <p className="error-text">{errors.password}</p>}
//           </div>

//           <button type="submit" className="submit-button" disabled={isLoading}>
//             {isLoading ? 'Logging In...' : 'Log In'}
//           </button>
//         </form>

//         <p className="register-text">
//           Don't have an account?{' '}
//           <span className="register-link" onClick={() => navigate('/register')}>
//             Register here
//           </span>
//         </p>
//       </div>

//       {/* CSS inside component */}
//       <style>{`
//         * {
//           box-sizing: border-box;
//         }

//         .login-page {
//           height: 100vh;
//           width: 100vw;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           background: linear-gradient(to bottom right, #cbd5f0, #e0c3fc);
//           padding: 20px;
//         }

//         .login-card {
//           background: white;
//           border-radius: 12px;
//           padding: 30px;
//           width: 100%;
//           max-width: 400px;
//           box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
//         }

//         .login-title {
//           font-size: 1.5rem;
//           font-weight: bold;
//           margin-bottom: 24px;
//           color: #222;
//         }

//         .form-group {
//           margin-bottom: 18px;
//         }

//         label {
//           display: block;
//           margin-bottom: 6px;
//           font-size: 0.95rem;
//           color: #333;
//         }

//         input {
//           width: 100%;
//           padding: 10px 12px;
//           border: 1px solid #ccc;
//           border-radius: 6px;
//           font-size: 1rem;
//         }

//         .input-error {
//           border-color: red;
//         }

//         .error-text {
//           color: red;
//           font-size: 0.85rem;
//           margin-top: 4px;
//         }

//         .error-backend {
//           color: #d32f2f;
//           background: #fdecea;
//           padding: 10px;
//           border-radius: 6px;
//           margin-bottom: 16px;
//           font-size: 0.95rem;
//         }

//         .password-wrapper {
//           position: relative;
//         }

//         .toggle-password {
//           position: absolute;
//           right: 10px;
//           top: 50%;
//           transform: translateY(-50%);
//           background: none;
//           border: none;
//           cursor: pointer;
//           color: #333;
//         }

//         .submit-button {
//           width: 100%;
//           padding: 12px;
//           background-color: #3b49df;
//           color: white;
//           font-size: 1rem;
//           border: none;
//           border-radius: 6px;
//           cursor: pointer;
//           margin-top: 10px;
//         }

//         .submit-button:disabled {
//           opacity: 0.7;
//           cursor: not-allowed;
//         }

//         .register-text {
//           text-align: center;
//           margin-top: 20px;
//           font-size: 0.95rem;
//           color: #555;
//         }

//         .register-link {
//           color: #1e40af;
//           cursor: pointer;
//           font-weight: 500;
//         }

//         @media (max-width: 500px) {
//           .login-card {
//             padding: 20px;
//           }

//           .login-title {
//             font-size: 1.25rem;
//           }

//           .submit-button {
//             padding: 10px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Login;




// ------------------

// //reg

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';

// const Register = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phoneNumber: '',
//     streetAddress: '',
//     city: '',
//     state: '',
//     zipCode: '',
//   });

//   const [errors, setErrors] = useState({});
//   const [backendError, setBackendError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   // Regular expressions for validation
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const phoneRegex = /^\d{10}$/;
//   const zipCodeRegex = /^\d{5,7}$/; // Updated regex for 5-7 digits

//   // A centralized object for all validation rules
//   const validationRules = {
//     firstName: (value) => !value.trim() && 'First name is required.',
//     lastName: (value) => !value.trim() && 'Last name is required.',
//     email: (value) => {
//       if (!value.trim()) return 'Email is required.';
//       if (!emailRegex.test(value)) return 'Invalid email format.';
//       return '';
//     },
//     password: (value) => {
//       if (!value) return 'Password is required.';
//       if (value.length < 6) return 'Password must be at least 6 characters.';
//       return '';
//     },
//     confirmPassword: (value, form) => {
//       if (value !== form.password) return 'Passwords do not match.';
//       return '';
//     },
//     phoneNumber: (value) => !phoneRegex.test(value) && 'Phone number must be exactly 10 digits.',
//     streetAddress: (value) => !value.trim() && 'Street address is required.',
//     city: (value) => !value.trim() && 'City is required.',
//     state: (value) => !value.trim() && 'State is required.',
//     zipCode: (value) => !zipCodeRegex.test(value) && 'Zip code must be 5 to 7 digits.',
//   };

//   const validateField = (name, value) => {
//     const validator = validationRules[name];
//     if (validator) {
//       // Pass the entire form data for rules like confirmPassword
//       return validator(value, formData) || '';
//     }
//     return '';
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBackendError('');
//     setFormData((prev) => {
//       const updatedData = { ...prev, [name]: value };
//       const error = validateField(name, value);
//       setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
//       return updatedData;
//     });
//   };

//   const validateStep = () => {
//     const fieldsPerStep = {
//       1: ['firstName', 'lastName', 'email'],
//       2: ['password', 'confirmPassword', 'phoneNumber'],
//       3: ['streetAddress', 'city', 'state', 'zipCode'],
//     };
//     const stepFields = fieldsPerStep[step];
//     let hasError = false;
//     const newErrors = {};
//     stepFields.forEach((field) => {
//       const error = validateField(field, formData[field]);
//       if (error) {
//         newErrors[field] = error;
//         hasError = true;
//       }
//     });
//     setErrors((prev) => ({ ...prev, ...newErrors }));
//     return !hasError;
//   };

//   const handleNext = () => {
//     if (validateStep()) {
//       setStep(step + 1);
//     }
//   };

//   const handlePrev = () => {
//     setStep(step - 1);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateStep()) {
//       return;
//     }

//     setIsLoading(true);
//     setBackendError('');

//     try {
//       const response = await fetch('http://localhost:5000/api/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           email: formData.email,
//           password: formData.password,
//           phoneNumber: formData.phoneNumber,
//           streetAddress: formData.streetAddress,
//           city: formData.city,
//           state: formData.state,
//           zipCode: formData.zipCode,
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         navigate('/login');
//       } else {
//         setBackendError(data.message || 'Registration failed.');
//       }
//     } catch (err) {
//       console.error(err);
//       setBackendError('Server error. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-card">
//         <h2 className="login-title">Create a New Account</h2>

//         {backendError && <div className="error-backend">{backendError}</div>}

//         <form onSubmit={handleSubmit}>
//           {step === 1 && (
//             <>
//               <div className="form-group">
//                 <label>First Name</label>
//                 <input
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   className={errors.firstName ? 'input-error' : ''}
//                   placeholder="John"
//                 />
//                 {errors.firstName && <p className="error-text">{errors.firstName}</p>}
//               </div>

//               <div className="form-group">
//                 <label>Last Name</label>
//                 <input
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   className={errors.lastName ? 'input-error' : ''}
//                   placeholder="Doe"
//                 />
//                 {errors.lastName && <p className="error-text">{errors.lastName}</p>}
//               </div>

//               <div className="form-group">
//                 <label>Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className={errors.email ? 'input-error' : ''}
//                   placeholder="john@example.com"
//                 />
//                 {errors.email && <p className="error-text">{errors.email}</p>}
//               </div>
//             </>
//           )}

//           {step === 2 && (
//             <>
//               <div className="form-group">
//                 <label>Password</label>
//                 <div className="password-wrapper">
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className={errors.password ? 'input-error' : ''}
//                     placeholder="••••••"
//                   />
//                   <button
//                     type="button"
//                     className="toggle-password"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? <FaEyeSlash /> : <FaEye />}
//                   </button>
//                 </div>
//                 {errors.password && <p className="error-text">{errors.password}</p>}
//               </div>

//               <div className="form-group">
//                 <label>Confirm Password</label>
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   className={errors.confirmPassword ? 'input-error' : ''}
//                   placeholder="••••••"
//                 />
//                 {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
//               </div>

//               <div className="form-group">
//                 <label>Phone Number</label>
//                 <input
//                   name="phoneNumber"
//                   value={formData.phoneNumber}
//                   onChange={handleChange}
//                   className={errors.phoneNumber ? 'input-error' : ''}
//                   placeholder="0123456789"
//                   maxLength={10} // Added max length
//                 />
//                 {errors.phoneNumber && <p className="error-text">{errors.phoneNumber}</p>}
//               </div>
//             </>
//           )}

//           {step === 3 && (
//             <>
//               <div className="form-group">
//                 <label>Street Address</label>
//                 <input
//                   name="streetAddress"
//                   value={formData.streetAddress}
//                   onChange={handleChange}
//                   className={errors.streetAddress ? 'input-error' : ''}
//                   placeholder="123 Main St"
//                 />
//                 {errors.streetAddress && <p className="error-text">{errors.streetAddress}</p>}
//               </div>

//               <div className="form-group">
//                 <label>City</label>
//                 <input
//                   name="city"
//                   value={formData.city}
//                   onChange={handleChange}
//                   className={errors.city ? 'input-error' : ''}
//                   placeholder="New York"
//                 />
//                 {errors.city && <p className="error-text">{errors.city}</p>}
//               </div>

//               <div className="form-group">
//                 <label>State</label>
//                 <input
//                   name="state"
//                   value={formData.state}
//                   onChange={handleChange}
//                   className={errors.state ? 'input-error' : ''}
//                   placeholder="NY"
//                 />
//                 {errors.state && <p className="error-text">{errors.state}</p>}
//               </div>

//               <div className="form-group">
//                 <label>Zip Code</label>
//                 <input
//                   name="zipCode"
//                   value={formData.zipCode}
//                   onChange={handleChange}
//                   className={errors.zipCode ? 'input-error' : ''}
//                   placeholder="10001"
//                   maxLength={7} // Added max length
//                 />
//                 {errors.zipCode && <p className="error-text">{errors.zipCode}</p>}
//               </div>
//             </>
//           )}

//           <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
//             {step > 1 && (
//               <button
//                 type="button"
//                 onClick={handlePrev}
//                 className="submit-button"
//                 style={{ width: '48%' }}
//               >
//                 Back
//               </button>
//             )}
//             {step < 3 ? (
//               <button
//                 type="button"
//                 onClick={handleNext}
//                 className="submit-button"
//                 style={{ width: step === 1 ? '100%' : '48%' }}
//               >
//                 Next
//               </button>
//             ) : (
//               <button
//                 type="submit"
//                 className="submit-button"
//                 disabled={isLoading}
//                 style={{ width: '48%' }}
//               >
//                 {isLoading ? 'Registering...' : 'Register'}
//               </button>
//             )}
//           </div>
//         </form>

//         <p className="register-text">
//           Already have an account?{' '}
//           <span className="register-link" onClick={() => navigate('/login')}>
//             Log in here
//           </span>
//         </p>
//       </div>

//       {/* Reuse original styles */}
//       <style>{`
//         * { box-sizing: border-box; }

//         .login-page {
//           height: 100vh;
//           width: 100vw;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           background: linear-gradient(to bottom right, #cbd5f0, #e0c3fc);
//           padding: 20px;
//         }

//         .login-card {
//           background: white;
//           border-radius: 12px;
//           padding: 30px;
//           width: 100%;
//           max-width: 450px;
//           box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
//         }

//         .login-title {
//           font-size: 1.5rem;
//           font-weight: bold;
//           margin-bottom: 24px;
//           color: #222;
//         }

//         .form-group {
//           margin-bottom: 18px;
//         }

//         label {
//           display: block;
//           margin-bottom: 6px;
//           font-size: 0.95rem;
//           color: #333;
//         }

//         input {
//           width: 100%;
//           padding: 10px 12px;
//           border: 1px solid #ccc;
//           border-radius: 6px;
//           font-size: 1rem;
//         }

//         .input-error {
//           border-color: red;
//         }

//         .error-text {
//           color: red;
//           font-size: 0.85rem;
//           margin-top: 4px;
//         }

//         .error-backend {
//           color: #d32f2f;
//           background: #fdecea;
//           padding: 10px;
//           border-radius: 6px;
//           margin-bottom: 16px;
//           font-size: 0.95rem;
//         }

//         .password-wrapper {
//           position: relative;
//         }

//         .toggle-password {
//           position: absolute;
//           right: 10px;
//           top: 50%;
//           transform: translateY(-50%);
//           background: none;
//           border: none;
//           cursor: pointer;
//           color: #333;
//         }

//         .submit-button {
//           padding: 12px;
//           background-color: #3b49df;
//           color: white;
//           font-size: 1rem;
//           border: none;
//           border-radius: 6px;
//           cursor: pointer;
//         }

//         .submit-button:disabled {
//           opacity: 0.7;
//           cursor: not-allowed;
//         }

//         .register-text {
//           text-align: center;
//           margin-top: 20px;
//           font-size: 0.95rem;
//           color: #555;
//         }

//         .register-link {
//           color: #1e40af;
//           cursor: pointer;
//           font-weight: 500;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Register;