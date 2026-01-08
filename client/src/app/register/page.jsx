// import React from 'react';
// import { motion } from 'framer-motion';
// // import Layout from '../components/layout/Layout';
// import RegisterForm from '../../components/auth/RegisterForm';

// const RegisterPage = () => {
//   return (
//     <Layout>
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-secondary to-white py-12 px-4">
//         {/* Background Pattern */}
//         <div className="absolute inset-0 overflow-hidden opacity-5">
//           {[...Array(30)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute text-6xl"
//               initial={{
//                 x: Math.random() * window.innerWidth,
//                 y: Math.random() * window.innerHeight,
//               }}
//               animate={{
//                 y: [null, -100],
//                 opacity: [0, 1, 0],
//               }}
//               transition={{
//                 duration: 5 + Math.random() * 5,
//                 repeat: Infinity,
//                 delay: Math.random() * 5,
//               }}
//             >
//               🎨
//             </motion.div>
//           ))}
//         </div>

//         <RegisterForm />
//       </div>
//     </Layout>
//   );
// };

// export default RegisterPage;

"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import RegisterForm from '../../components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-secondary to-white py-12 px-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden opacity-5">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-6xl"
              initial={{
                x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
                y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
              }}
              animate={{
                y: [null, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            >
              🎨
            </motion.div>
          ))}
        </div>

        <RegisterForm />
      </div>
    </Layout>
  );
};

export default RegisterPage;