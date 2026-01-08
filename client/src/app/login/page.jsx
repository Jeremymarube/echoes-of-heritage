
// "use client";
// import React from 'react';
// import { motion } from 'framer-motion';
// import LoginForm from "../../components/auth/LoginForm";
// import Layout from "../../components/layout/Layout";


// const LoginPage = () => {
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
//               🎭
//             </motion.div>
//           ))}
//         </div>

//         <LoginForm />
//       </div>
//     </Layout>
//   );
// };

// export default LoginPage;
       


"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LoginForm from "../../components/auth/LoginForm";
import Layout from "../../components/layout/Layout";

const LoginPage = () => {
  const [viewport, setViewport] = useState(null);

  useEffect(() => {
    setViewport({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  return (
    <Layout>
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-secondary to-white py-12 px-4 overflow-hidden">
        
        {/* Background Pattern */}
        {viewport && (
          <div className="absolute inset-0 overflow-hidden opacity-5">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-6xl"
                initial={{
                  x: Math.random() * viewport.width,
                  y: Math.random() * viewport.height,
                  opacity: 0,
                }}
                animate={{
                  y: -100,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 5 + Math.random() * 5,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "linear",
                }}
              >
                🎭
              </motion.div>
            ))}
          </div>
        )}

        <LoginForm />
      </div>
    </Layout>
  );
};

export default LoginPage;
