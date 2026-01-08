// import React, { useState, useEffect } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { Menu, X, Calendar, User, LogOut } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';

// const Header = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const { scrollY } = useScroll();
//   const navigate = useNavigate();

//   const headerBackground = useTransform(
//     scrollY,
//     [0, 100],
//     ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.95)']
//   );

//   const headerShadow = useTransform(
//     scrollY,
//     [0, 100],
//     ['0px 0px 0px rgba(0,0,0,0)', '0px 4px 20px rgba(0,0,0,0.1)']
//   );

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navLinks = [
//     { name: 'Home', path: '/' },
//     { name: 'Schedule', path: '/schedule' },
//     { name: 'Admin', path: '/admin' },
//     { name: 'Archive', path: '/archive' },
//   ];

//   return (
//     <motion.header
//       className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg"
//       style={{ 
//         backgroundColor: headerBackground,
//         boxShadow: headerShadow,
//       }}
//     >
//       <nav className="container mx-auto px-4 lg:px-8">
//         <div className="flex items-center justify-between h-20">
//           {/* Logo */}
//           <Link to="/">
//             <motion.div
//               className="flex items-center gap-3 cursor-pointer"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <div className="w-12 h-12 gradient-accent rounded-xl flex items-center justify-center shadow-lg">
//                 <Calendar className="w-7 h-7 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-gray-900">Echoes of Heritage</h1>
//                 <p className="text-xs text-gray-600">Culture Week Management</p>
//               </div>
//             </motion.div>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-8">
//             {navLinks.map((link, index) => (
//               <motion.div
//                 key={link.name}
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//               >
//                 <Link
//                   to={link.path}
//                   className="text-gray-700 hover:text-accent font-medium transition-colors relative group"
//                 >
//                   {link.name}
//                   <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
//                 </Link>
//               </motion.div>
//             ))}
//           </div>

//           {/* Auth Buttons */}
//           <div className="hidden md:flex items-center gap-4">
//             <Link to="/login">
//               <motion.button
//                 className="px-5 py-2 text-accent hover:text-accent-dark font-semibold transition-colors"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Login
//               </motion.button>
//             </Link>
//             <Link to="/register">
//               <motion.button
//                 className="px-5 py-2 gradient-accent text-white rounded-lg font-semibold shadow-lg"
//                 whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(255, 137, 4, 0.3)' }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Get Started
//               </motion.button>
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           >
//             {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <motion.div
//             className="md:hidden py-4 border-t border-gray-200"
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//           >
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 to={link.path}
//                 className="block py-3 text-gray-700 hover:text-accent font-medium transition-colors"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 {link.name}
//               </Link>
//             ))}
//             <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-200">
//               <Link to="/login">
//                 <button className="w-full px-5 py-2 text-accent hover:bg-accent/10 rounded-lg font-semibold transition-colors">
//                   Login
//                 </button>
//               </Link>
//               <Link to="/register">
//                 <button className="w-full px-5 py-2 gradient-accent text-white rounded-lg font-semibold">
//                   Get Started
//                 </button>
//               </Link>
//             </div>
//           </motion.div>
//         )}
//       </nav>
//     </motion.header>
//   );
// };

// export default Header;

"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, Calendar } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const router = useRouter();

  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.95)"]
  );

  const headerShadow = useTransform(
    scrollY,
    [0, 100],
    ["0px 0px 0px rgba(0,0,0,0)", "0px 4px 20px rgba(0,0,0,0.1)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Schedule", path: "/schedule" },
    { name: "Admin", path: "/admin" },
    { name: "Archive", path: "/archive" },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg"
      style={{
        backgroundColor: headerBackground,
        boxShadow: headerShadow,
      }}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-12 h-12 gradient-accent rounded-xl flex items-center justify-center shadow-lg">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Echoes of Heritage
                </h1>
                <p className="text-xs text-gray-600">
                  Culture Week Management
                </p>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.path}
                  className="text-gray-700 hover:text-accent font-medium transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => router.push("/login")}
              className="px-5 py-2 text-accent hover:text-accent-dark font-semibold transition-colors"
            >
              Login
            </button>

            <button
              onClick={() => router.push("/register")}
              className="px-5 py-2 gradient-accent text-white rounded-lg font-semibold shadow-lg"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden py-4 border-t border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="block py-3 text-gray-700 hover:text-accent font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => router.push("/login")}
                className="w-full px-5 py-2 text-accent hover:bg-accent/10 rounded-lg font-semibold transition-colors"
              >
                Login
              </button>

              <button
                onClick={() => router.push("/register")}
                className="w-full px-5 py-2 gradient-accent text-white rounded-lg font-semibold"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;
