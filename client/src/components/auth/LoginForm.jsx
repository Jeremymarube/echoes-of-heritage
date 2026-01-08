// import { useState } from "react";

// const LoginForm = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Login data:", formData);
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
//             <i className="fa-solid fa-right-to-bracket text-[#ff2770] drop-shadow-[0_0_10px_#ff2770]" /> Login
//           </h2>

//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={formData.username}
//             onChange={handleChange}
//             className="w-full px-5 py-2 rounded-full bg-black/10 border-2 border-white text-white outline-none"
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full px-5 py-2 rounded-full bg-black/10 border-2 border-white text-white outline-none"
//           />

//           <button
//             type="submit"
//             className="w-full py-2 rounded-full bg-[#45f3ff] text-[#111] font-medium transition
//             hover:shadow-[0_0_10px_#45f3ff,_0_0_60px_#45f3ff]"
//           >
//             Sign in
//           </button>

//           <div className="flex justify-between w-full text-sm">
//             <a href="#" className="text-white">Forgot Password</a>
//             <a href="/register" className="text-[#ff2770] font-semibold">Sign up</a>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;


// "use client";
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Mail, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';
// import Button from '../common/Button';
// import { validateEmail, validateRequired } from '../../utils/validation';
// import { Link, useNavigate } from 'react-router-dom';

// const LoginForm = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const validate = () => {
//     const newErrors = {};
    
//     if (!validateRequired(formData.email)) {
//       newErrors.email = 'Email is required';
//     } else if (!validateEmail(formData.email)) {
//       newErrors.email = 'Invalid email format';
//     }
    
//     if (!validateRequired(formData.password)) {
//       newErrors.password = 'Password is required';
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
    
//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false);
//       // Navigate to dashboard
//       navigate('/admin');
//     }, 1500);
//   };

//   return (
//     <motion.div
//       className="w-full max-w-md"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       <div className="bg-white rounded-2xl shadow-2xl p-8">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
//           <p className="text-gray-600">Sign in to continue to Echoes of Heritage</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Email Field */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Email Address
//             </label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
//                   errors.email ? 'border-red-500' : 'border-gray-200 focus:border-accent'
//                 }`}
//                 placeholder="your@email.com"
//               />
//             </div>
//             {errors.email && (
//               <motion.p
//                 className="mt-2 text-sm text-red-500 flex items-center gap-1"
//                 initial={{ opacity: 0, x: -10 }}
//                 animate={{ opacity: 1, x: 0 }}
//               >
//                 <AlertCircle className="w-4 h-4" />
//                 {errors.email}
//               </motion.p>
//             )}
//           </div>

//           {/* Password Field */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className={`w-full pl-11 pr-12 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
//                   errors.password ? 'border-red-500' : 'border-gray-200 focus:border-accent'
//                 }`}
//                 placeholder="••••••••"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//               </button>
//             </div>
//             {errors.password && (
//               <motion.p
//                 className="mt-2 text-sm text-red-500 flex items-center gap-1"
//                 initial={{ opacity: 0, x: -10 }}
//                 animate={{ opacity: 1, x: 0 }}
//               >
//                 <AlertCircle className="w-4 h-4" />
//                 {errors.password}
//               </motion.p>
//             )}
//           </div>

//           {/* Remember Me & Forgot Password */}
//           <div className="flex items-center justify-between">
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input 
//                 type="checkbox" 
//                 className="w-4 h-4 accent-accent rounded"
//               />
//               <span className="text-sm text-gray-600">Remember me</span>
//             </label>
//             <Link to="/forgot-password" className="text-sm text-accent hover:text-accent-dark font-semibold">
//               Forgot Password?
//             </Link>
//           </div>

//           {/* Submit Button */}
//           <Button
//             type="submit"
//             variant="primary"
//             size="lg"
//             disabled={isLoading}
//             className="w-full"
//           >
//             {isLoading ? 'Signing in...' : 'Sign In'}
//           </Button>
//         </form>

//         {/* Divider */}
//         <div className="relative my-6">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t border-gray-200"></div>
//           </div>
//           <div className="relative flex justify-center text-sm">
//             <span className="px-4 bg-white text-gray-500">or continue with</span>
//           </div>
//         </div>

//         {/* Social Login */}
//         <div className="grid grid-cols-2 gap-4">
//           <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-accent hover:bg-accent/5 transition-all">
//             <svg className="w-5 h-5" viewBox="0 0 24 24">
//               <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//               <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//               <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//               <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//             </svg>
//             Google
//           </button>
//           <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-accent hover:bg-accent/5 transition-all">
//             <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
//               <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
//             </svg>
//             Facebook
//           </button>
//         </div>

//         {/* Sign Up Link */}
//         <p className="mt-6 text-center text-gray-600">
//           Don't have an account?{' '}
//           <Link to="/register" className="text-accent hover:text-accent-dark font-semibold">
//             Sign up now
//           </Link>
//         </p>
//       </div>
//     </motion.div>
//   );
// };

// export default LoginForm; 
       


"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, AlertCircle, Eye, EyeOff } from "lucide-react";
import Button from "../common/Button";
import { validateEmail, validateRequired } from "../../utils/validation";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!validateRequired(formData.email)) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!validateRequired(formData.password)) {
      newErrors.password = "Password is required";
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

    // Simulated API call
    setTimeout(() => {
      setIsLoading(false);
      router.push("/admin");
    }, 1500);
  };

  return (
    <motion.div
      className="w-full max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">
            Sign in to continue to Echoes of Heritage
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-accent ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-200 focus:border-accent"
                }`}
                placeholder="your@email.com"
              />
            </div>
            {errors.email && (
              <motion.p
                className="mt-2 text-sm text-red-500 flex items-center gap-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <AlertCircle className="w-4 h-4" />
                {errors.email}
              </motion.p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-11 pr-12 py-3 border-2 rounded-lg focus:ring-2 focus:ring-accent ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-200 focus:border-accent"
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <motion.p
                className="mt-2 text-sm text-red-500 flex items-center gap-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <AlertCircle className="w-4 h-4" />
                {errors.password}
              </motion.p>
            )}
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-accent" />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-accent font-semibold"
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-accent font-semibold">
            Sign up now
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginForm;
