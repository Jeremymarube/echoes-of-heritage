// import { useState } from "react";

// const RegisterForm = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Register data:", formData);
//   };

//   return (
//     <div className="relative flex justify-center items-center w-[400px] h-[200px] rounded-[20px] transition-all duration-500 hover:w-[450px] hover:h-[500px]
//       bg-[repeating-conic-gradient(from_var(--a),#ff2770_0%,#ff2770_5%,transparent_5%,transparent_40%,#ff2770_50%)]
//       animate-[rotating_4s_linear_infinite] drop-shadow-[0_15px_50px_#000]">

//       <div className="absolute inset-[4px] bg-[#2d2d39] rounded-[15px] border-[8px] border-[#25252b]" />

//       <form
//         onSubmit={handleSubmit}
//         className="absolute inset-[60px] flex flex-col items-center justify-center rounded-[10px] bg-black/20 text-white
//         shadow-[inset_0_10px_20px_#00000080] border-b-2 border-white/50
//         transition-all duration-500 hover:inset-[40px] overflow-hidden z-10"
//       >
//         <div className="relative flex flex-col items-center gap-5 w-[70%] translate-y-[126px] transition-all duration-500 hover:translate-y-0">
//           <h2 className="uppercase font-semibold tracking-[0.2em]">
//             <i className="fa-solid fa-user-plus text-[#ff2770] drop-shadow-[0_0_10px_#ff2770]" /> Register
//           </h2>

//           <input name="username" placeholder="Username" onChange={handleChange}
//             className="w-full px-5 py-2 rounded-full bg-black/10 border-2 border-white text-white outline-none" />

//           <input name="email" type="email" placeholder="Email" onChange={handleChange}
//             className="w-full px-5 py-2 rounded-full bg-black/10 border-2 border-white text-white outline-none" />

//           <input name="password" type="password" placeholder="Password" onChange={handleChange}
//             className="w-full px-5 py-2 rounded-full bg-black/10 border-2 border-white text-white outline-none" />

//           <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange}
//             className="w-full px-5 py-2 rounded-full bg-black/10 border-2 border-white text-white outline-none" />

//           <button
//             type="submit"
//             className="w-full py-2 rounded-full bg-[#45f3ff] text-[#111] font-medium transition
//             hover:shadow-[0_0_10px_#45f3ff,_0_0_60px_#45f3ff]"
//           >
//             Create Account
//           </button>

//           <div className="flex justify-between w-full text-sm">
//             <a href="/login" className="text-white">Already have an account?</a>
//             <a href="/login" className="text-[#ff2770] font-semibold">Login</a>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default RegisterForm;

// "use client";
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Mail, Lock, User, Building, AlertCircle, Eye, EyeOff } from 'lucide-react';
// import Button from '../common/Button';
// import { validateEmail, validateRequired } from '../../utils/validation';
// import { Link, useNavigate } from 'react-router-dom';

// const RegisterForm = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     institution: '',
//     role: 'attendee',
//     password: '',
//     confirmPassword: '',
//   });
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const validate = () => {
//     const newErrors = {};
    
//     if (!validateRequired(formData.name)) {
//       newErrors.name = 'Name is required';
//     }
    
//     if (!validateRequired(formData.email)) {
//       newErrors.email = 'Email is required';
//     } else if (!validateEmail(formData.email)) {
//       newErrors.email = 'Invalid email format';
//     }
    
//     if (!validateRequired(formData.institution)) {
//       newErrors.institution = 'Institution is required';
//     }
    
//     if (!validateRequired(formData.password)) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 8) {
//       newErrors.password = 'Password must be at least 8 characters';
//     }
    
//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }
    
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const newErrors = validate();
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     setIsLoading(true);
    
//     setTimeout(() => {
//       setIsLoading(false);
//       navigate('/admin');
//     }, 1500);
//   };

//   return (
//     <motion.div
//       className="w-full max-w-2xl"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       <div className="bg-white rounded-2xl shadow-2xl p-8">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
//           <p className="text-gray-600">Join Echoes of Heritage today</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Name Field */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Full Name
//               </label>
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
//                     errors.name ? 'border-red-500' : 'border-gray-200 focus:border-accent'
//                   }`}
//                   placeholder="John Doe"
//                 />
//               </div>
//               {errors.name && (
//                 <motion.p
//                   className="mt-2 text-sm text-red-500 flex items-center gap-1"
//                   initial={{ opacity: 0, x: -10 }}
//                   animate={{ opacity: 1, x: 0 }}
//                 >
//                   <AlertCircle className="w-4 h-4" />
//                   {errors.name}
//                 </motion.p>
//               )}
//             </div>

//             {/* Email Field */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
//                     errors.email ? 'border-red-500' : 'border-gray-200 focus:border-accent'
//                   }`}
//                   placeholder="your@email.com"
//                 />
//               </div>
//               {errors.email && (
//                 <motion.p
//                   className="mt-2 text-sm text-red-500 flex items-center gap-1"
//                   initial={{ opacity: 0, x: -10 }}
//                   animate={{ opacity: 1, x: 0 }}
//                 >
//                   <AlertCircle className="w-4 h-4" />
//                   {errors.email}
//                 </motion.p>
//               )}
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Institution Field */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Institution
//               </label>
//               <div className="relative">
//                 <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type="text"
//                   name="institution"
//                   value={formData.institution}
//                   onChange={handleChange}
//                   className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
//                     errors.institution ? 'border-red-500' : 'border-gray-200 focus:border-accent'
//                   }`}
//                   placeholder="Your University"
//                 />
//               </div>
//               {errors.institution && (
//                 <motion.p
//                   className="mt-2 text-sm text-red-500 flex items-center gap-1"
//                   initial={{ opacity: 0, x: -10 }}
//                   animate={{ opacity: 1, x: 0 }}
//                 >
//                   <AlertCircle className="w-4 h-4" />
//                   {errors.institution}
//                 </motion.p>
//               )}
//             </div>

//             {/* Role Field */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Role
//               </label>
//               <select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all"
//               >
//                 <option value="attendee">Attendee</option>
//                 <option value="presenter">Presenter</option>
//                 <option value="admin">Administrator</option>
//               </select>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Password Field */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className={`w-full pl-11 pr-12 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
//                     errors.password ? 'border-red-500' : 'border-gray-200 focus:border-accent'
//                   }`}
//                   placeholder="••••••••"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                 </button>
//               </div>
//               {errors.password && (
//                 <motion.p
//                   className="mt-2 text-sm text-red-500 flex items-center gap-1"
//                   initial={{ opacity: 0, x: -10 }}
//                   animate={{ opacity: 1, x: 0 }}
//                 >
//                   <AlertCircle className="w-4 h-4" />
//                   {errors.password}
//                 </motion.p>
//               )}
//             </div>

//             {/* Confirm Password Field */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Confirm Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   className={`w-full pl-11 pr-12 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
//                     errors.confirmPassword ? 'border-red-500' : 'border-gray-200 focus:border-accent'
//                   }`}
//                   placeholder="••••••••"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                 </button>
//               </div>
//               {errors.confirmPassword && (
//                 <motion.p
//                   className="mt-2 text-sm text-red-500 flex items-center gap-1"
//                   initial={{ opacity: 0, x: -10 }}
//                   animate={{ opacity: 1, x: 0 }}
//                 >
//                   <AlertCircle className="w-4 h-4" />
//                   {errors.confirmPassword}
//                 </motion.p>
//               )}
//             </div>
//           </div>

//           {/* Terms & Conditions */}
//           <label className="flex items-start gap-3 cursor-pointer">
//             <input 
//               type="checkbox" 
//               className="mt-1 w-4 h-4 accent-accent rounded"
//               required
//             />
//             <span className="text-sm text-gray-600">
//               I agree to the{' '}
//               <Link to="/terms" className="text-accent hover:text-accent-dark font-semibold">
//                 Terms of Service
//               </Link>
//               {' '}and{' '}
//               <Link to="/privacy" className="text-accent hover:text-accent-dark font-semibold">
//                 Privacy Policy
//               </Link>
//             </span>
//           </label>

//           {/* Submit Button */}
//           <Button
//             type="submit"
//             variant="primary"
//             size="lg"
//             disabled={isLoading}
//             className="w-full"
//           >
//             {isLoading ? 'Creating Account...' : 'Create Account'}
//           </Button>
//         </form>

//         {/* Sign In Link */}
//         <p className="mt-6 text-center text-gray-600">
//           Already have an account?{' '}
//           <Link to="/login" className="text-accent hover:text-accent-dark font-semibold">
//             Sign in
//           </Link>
//         </p>
//       </div>
//     </motion.div>
//   );
// };

// export default RegisterForm;


"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Building, AlertCircle, Eye, EyeOff } from 'lucide-react';
import Button from '../common/Button';
import { validateEmail, validateRequired } from '../../utils/validation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    organization: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!validateRequired(formData.fullName)) newErrors.fullName = 'Full name is required';
    if (!validateRequired(formData.email)) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!validateRequired(formData.password)) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    // Simulate API registration
    setTimeout(() => {
      setIsLoading(false);
      router.push('/login');
    }, 1500);
  };

  return (
    <motion.div
      className="w-full max-w-md z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
          <p className="text-gray-600">Join Echoes of Heritage today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full pl-11 pr-4 py-2.5 border-2 rounded-lg focus:outline-none transition-all ${
                  errors.fullName ? 'border-red-500' : 'border-gray-200 focus:border-accent'
                }`}
                placeholder="Lauren Ann Murugi"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-11 pr-4 py-2.5 border-2 rounded-lg focus:outline-none transition-all ${
                  errors.email ? 'border-red-500' : 'border-gray-200 focus:border-accent'
                }`}
                placeholder="name@example.com"
              />
            </div>
          </div>

          {/* Organization */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Organization (Optional)</label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-accent"
                placeholder="Heritage Foundation"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-11 pr-12 py-2.5 border-2 rounded-lg focus:outline-none transition-all ${
                  errors.password ? 'border-red-500' : 'border-gray-200 focus:border-accent'
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full pl-11 pr-4 py-2.5 border-2 rounded-lg focus:outline-none transition-all ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-200 focus:border-accent'
                }`}
                placeholder="••••••••"
              />
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.confirmPassword}
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isLoading}
            className="w-full mt-4"
          >
            {isLoading ? 'Creating Account...' : 'Register'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-accent hover:underline font-semibold">
            Log in
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default RegisterForm;