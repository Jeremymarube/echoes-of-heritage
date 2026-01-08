
// "use client";
// import React, { useState } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { 
//   Calendar, 
//   Users, 
//   TrendingUp, 
//   Globe, 
//   Sparkles,
//   ArrowRight,
//   CheckCircle,
//   BarChart3,
//   Shield,
//   Zap
// } from 'lucide-react';
// import Button from '../components/common/Button';
// import { CULTURAL_PATTERNS, EVENT_TYPES } from '../utils/constants';
// import { useNavigate } from 'react-router-dom';

// const HomePage = () => {
//   const navigate = useNavigate();
//   const { scrollYProgress } = useScroll();
//   const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
//   const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

//   return (
//     <div className="bg-white">
//       {/* Hero Section */}
//       <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-secondary to-white">
//         {/* Animated Background Patterns */}
//         <div className="absolute inset-0 overflow-hidden">
//           {CULTURAL_PATTERNS.map((pattern, index) => (
//             <motion.div
//               key={index}
//               className="absolute text-6xl opacity-10"
//               initial={{ 
//                 x: Math.random() * window.innerWidth,
//                 y: Math.random() * window.innerHeight,
//               }}
//               animate={{
//                 x: [null, Math.random() * window.innerWidth],
//                 y: [null, Math.random() * window.innerHeight],
//                 rotate: [0, 360],
//               }}
//               transition={{
//                 duration: 20 + Math.random() * 10,
//                 repeat: Infinity,
//                 ease: "linear",
//               }}
//             >
//               {pattern.emoji}
//             </motion.div>
//           ))}
//         </div>

//         {/* Hero Content */}
//         <motion.div 
//           className="container mx-auto px-4 lg:px-8 relative z-10 text-center"
//           style={{ opacity, scale }}
//         >
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="mb-6"
//           >
//             <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-accent font-semibold shadow-lg">
//               <Sparkles className="w-4 h-4" />
//                Complete Culture Week Management
//             </span>
//           </motion.div>

//           <motion.h1
//             className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//           >
//             Plan it. Schedule it.
//             <br />
//             <span className="gradient-accent bg-clip-text text-transparent">
//               Celebrate it.
//             </span>
//           </motion.h1>

//           <motion.p
//             className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//           >
//             The complete platform for institutions to manage Culture Week events—from 
//             planning and registration to celebration and lasting legacy.
//           </motion.p>

//           <motion.div
//             className="flex flex-col sm:flex-row gap-4 justify-center"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.6 }}
//           >
//             <Button 
//               variant="primary" 
//               size="lg"
//               onClick={() => navigate('/register')}
//               icon={ArrowRight}
//             >
//               Get Started Free
//             </Button>
//             <Button 
//               variant="outline" 
//               size="lg"
//               onClick={() => navigate('/schedule')}
//             >
//               View Demo
//             </Button>
//           </motion.div>

//           {/* Stats */}
//           <motion.div
//             className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.8 }}
//           >
//             {[
//               { number: '500+', label: 'Institutions' },
//               { number: '10k+', label: 'Events Managed' },
//               { number: '50+', label: 'Cultures Celebrated' },
//               { number: '99%', label: 'Satisfaction Rate' },
//             ].map((stat, index) => (
//               <motion.div
//                 key={index}
//                 className="glass-effect rounded-2xl p-6"
//                 whileHover={{ scale: 1.05, y: -5 }}
//                 transition={{ type: 'spring', stiffness: 300 }}
//               >
//                 <h3 className="text-3xl font-bold gradient-accent bg-clip-text text-transparent mb-2">
//                   {stat.number}
//                 </h3>
//                 <p className="text-gray-600 text-sm">{stat.label}</p>
//               </motion.div>
//             ))}
//           </motion.div>
//         </motion.div>

//         {/* Scroll Indicator */}
//         <motion.div
//           className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
//           animate={{ y: [0, 10, 0] }}
//           transition={{ duration: 2, repeat: Infinity }}
//         >
//           <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2">
//             <motion.div
//               className="w-1.5 h-1.5 bg-accent rounded-full"
//               animate={{ y: [0, 12, 0] }}
//               transition={{ duration: 2, repeat: Infinity }}
//             />
//           </div>
//         </motion.div>
//       </section>

//       {/* Features Section */}
//       <section className="py-24 bg-white">
//         <div className="container mx-auto px-4 lg:px-8">
//           <motion.div
//             className="text-center mb-16"
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//               Everything You Need in One Platform
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               From event registration to cultural archiving, manage your entire Culture Week lifecycle
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: Calendar,
//                 title: 'Smart Scheduling',
//                 description: 'AI-powered scheduling with automatic conflict detection and optimal time slot suggestions.',
//                 color: 'from-blue-500 to-cyan-500',
//               },
//               {
//                 icon: Users,
//                 title: 'Presenter Portal',
//                 description: 'Easy registration, real-time status tracking, and seamless communication for all presenters.',
//                 color: 'from-purple-500 to-pink-500',
//               },
//               {
//                 icon: BarChart3,
//                 title: 'Admin Dashboard',
//                 description: 'Complete oversight with analytics, approval workflows, and real-time event management.',
//                 color: 'from-orange-500 to-red-500',
//               },
//               {
//                 icon: Globe,
//                 title: 'Cultural Diversity',
//                 description: 'Celebrate multiple cultures with category filters, diversity metrics, and beautiful presentations.',
//                 color: 'from-green-500 to-emerald-500',
//               },
//               {
//                 icon: Shield,
//                 title: 'Multi-Institution',
//                 description: 'Secure platform supporting multiple institutions with customizable branding and settings.',
//                 color: 'from-indigo-500 to-purple-500',
//               },
//               {
//                 icon: Zap,
//                 title: 'Real-Time Updates',
//                 description: 'Instant notifications, live schedule changes, and automated reminders for all participants.',
//                 color: 'from-yellow-500 to-orange-500',
//               },
//             ].map((feature, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 card-hover"
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//               >
//                 <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
//                   <feature.icon className="w-8 h-8 text-white" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-3">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600 leading-relaxed">
//                   {feature.description}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Event Types Showcase */}
//       <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
//         <div className="container mx-auto px-4 lg:px-8">
//           <motion.div
//             className="text-center mb-16"
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//               Diverse Cultural Experiences
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Support every type of cultural presentation with our flexible event management system
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
//             {EVENT_TYPES.map((type, index) => (
//               <motion.div
//                 key={type.id}
//                 className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer card-hover"
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.4, delay: index * 0.05 }}
//                 whileHover={{ y: -10 }}
//                 style={{ borderTop: `4px solid ${type.color}` }}
//               >
//                 <div className="text-5xl mb-4">{type.icon}</div>
//                 <h3 className="font-bold text-gray-900 mb-2">{type.label}</h3>
//                 <div 
//                   className="w-12 h-1 mx-auto rounded-full"
//                   style={{ backgroundColor: type.color }}
//                 />
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section className="py-24 bg-white">
//         <div className="container mx-auto px-4 lg:px-8">
//           <motion.div
//             className="text-center mb-16"
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//               Simple Yet Powerful Workflow
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Manage your entire Culture Week in three easy phases
//             </p>
//           </motion.div>

//           <div className="max-w-5xl mx-auto">
//             {[
//               {
//                 phase: 'BEFORE',
//                 title: 'Planning & Registration',
//                 description: 'Presenters submit events, admins review and approve, schedule gets built automatically.',
//                 steps: ['Submit Presentation', 'Admin Review', 'Schedule Assignment'],
//                 color: 'from-blue-500 to-cyan-500',
//               },
//               {
//                 phase: 'DURING',
//                 title: 'Scheduling & Coordination',
//                 description: 'Real-time schedule access, notifications, personal agendas, and seamless event coordination.',
//                 steps: ['Browse Events', 'Create Agenda', 'Get Reminders'],
//                 color: 'from-purple-500 to-pink-500',
//               },
//               {
//                 phase: 'AFTER',
//                 title: 'Documentation & Legacy',
//                 description: 'Archive events, collect feedback, analyze data, and preserve cultural memories forever.',
//                 steps: ['Collect Feedback', 'View Analytics', 'Build Archive'],
//                 color: 'from-orange-500 to-red-500',
//               },
//             ].map((phase, index) => (
//               <motion.div
//                 key={index}
//                 className="mb-12 last:mb-0"
//                 initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: index * 0.2 }}
//               >
//                 <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-accent">
//                   <div className="flex items-start gap-6">
//                     <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${phase.color} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
//                       {index + 1}
//                     </div>
//                     <div className="flex-1">
//                       <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-sm font-bold rounded-full mb-3">
//                         {phase.phase}
//                       </span>
//                       <h3 className="text-2xl font-bold text-gray-900 mb-3">
//                         {phase.title}
//                       </h3>
//                       <p className="text-gray-600 mb-6 leading-relaxed">
//                         {phase.description}
//                       </p>
//                       <div className="flex flex-wrap gap-3">
//                         {phase.steps.map((step, stepIndex) => (
//                           <div
//                             key={stepIndex}
//                             className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg"
//                           >
//                             <CheckCircle className="w-4 h-4 text-green-500" />
//                             <span className="text-sm font-medium text-gray-700">
//                               {step}
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-24 bg-gradient-to-br from-accent to-accent-dark text-white relative overflow-hidden">
//         {/* Background Pattern */}
//         <div className="absolute inset-0 opacity-10">
//           {[...Array(20)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute text-6xl"
//               initial={{
//                 x: Math.random() * window.innerWidth,
//                 y: Math.random() * 200,
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

//         <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <h2 className="text-4xl md:text-5xl font-bold mb-6">
//               Ready to Transform Your Culture Week?
//             </h2>
//             <p className="text-xl mb-12 max-w-2xl mx-auto opacity-90">
//               Join hundreds of institutions already celebrating diversity with Echoes of Heritage
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Button 
//                 variant="secondary" 
//                 size="lg"
//                 onClick={() => navigate('/register')}
//                 className="bg-white text-accent hover:bg-gray-100"
//               >
//                 Start Free Trial
//               </Button>
//               <Button 
//                 variant="outline" 
//                 size="lg"
//                 className="border-2 border-white text-white hover:bg-white hover:text-accent"
//                 onClick={() => navigate('/contact')}
//               >
//                 Schedule Demo
//               </Button>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="py-24 bg-gray-50">
//         <div className="container mx-auto px-4 lg:px-8">
//           <motion.div
//             className="text-center mb-16"
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//               Loved by Event Organizers
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               See what institutions are saying about Echoes of Heritage
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 name: 'Dr. Sarah Johnson',
//                 role: 'Cultural Affairs Director',
//                 institution: 'State University',
//                 quote: 'Echoes of Heritage transformed our Culture Week from chaotic spreadsheets to a seamless, professional experience.',
//                 rating: 5,
//               },
//               {
//                 name: 'Michael Chen',
//                 role: 'Student Activities Coordinator',
//                 institution: 'Community College',
//                 quote: 'The admin dashboard gives us complete control while the student-facing side is beautiful and engaging.',
//                 rating: 5,
//               },
//               {
//                 name: 'Amina Patel',
//                 role: 'Diversity & Inclusion Officer',
//                 institution: 'International School',
//                 quote: 'Finally, a platform that truly celebrates cultural diversity and makes event management effortless.',
//                 rating: 5,
//               },
//             ].map((testimonial, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-white rounded-2xl p-8 shadow-lg"
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 whileHover={{ y: -10, shadow: '0 20px 40px rgba(0,0,0,0.1)' }}
//               >
//                 <div className="flex gap-1 mb-4">
//                   {[...Array(testimonial.rating)].map((_, i) => (
//                     <span key={i} className="text-yellow-400 text-xl">⭐</span>
//                   ))}
//                 </div>
//                 <p className="text-gray-700 italic mb-6 leading-relaxed">
//                   "{testimonial.quote}"
//                 </p>
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 gradient-accent rounded-full flex items-center justify-center text-white font-bold text-lg">
//                     {testimonial.name.charAt(0)}
//                   </div>
//                   <div>
//                     <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
//                     <p className="text-sm text-gray-600">{testimonial.role}</p>
//                     <p className="text-xs text-gray-500">{testimonial.institution}</p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HomePage;


"use client";
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  Globe, 
  Sparkles,
  ArrowRight,
  CheckCircle,
  BarChart3,
  Shield,
  Zap
} from 'lucide-react';
import Button from '../components/common/Button';
import { CULTURAL_PATTERNS, EVENT_TYPES } from '../utils/constants';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  // Handle SSR window check
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-secondary to-white">
        <div className="absolute inset-0 overflow-hidden">
          {isMounted && CULTURAL_PATTERNS.map((pattern, index) => (
            <motion.div
              key={index}
              className="absolute text-6xl opacity-10"
              initial={{ 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              }}
              animate={{
                x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)],
                y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)],
                rotate: [0, 360],
              }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {pattern.emoji}
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="container mx-auto px-4 lg:px-8 relative z-10 text-center"
          style={{ opacity, scale }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-accent font-semibold shadow-lg">
              <Sparkles className="w-4 h-4" />
               Complete Culture Week Management
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Plan it. Schedule it.
            <br />
            <span className="gradient-accent bg-clip-text text-transparent">
              Celebrate it.
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            The complete platform for institutions to manage Culture Week events—from 
            planning and registration to celebration and lasting legacy.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => router.push('/register')}
              icon={ArrowRight}
            >
              Get Started Free
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => router.push('/schedule')}
            >
              View Demo
            </Button>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { number: '500+', label: 'Institutions' },
              { number: '10k+', label: 'Events Managed' },
              { number: '50+', label: 'Cultures Celebrated' },
              { number: '99%', label: 'Satisfaction Rate' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="glass-effect rounded-2xl p-6"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <h3 className="text-3xl font-bold gradient-accent bg-clip-text text-transparent mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 bg-accent rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need in One Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From event registration to cultural archiving, manage your entire Culture Week lifecycle
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Calendar, title: 'Smart Scheduling', description: 'AI-powered scheduling with automatic conflict detection.', color: 'from-blue-500 to-cyan-500' },
              { icon: Users, title: 'Presenter Portal', description: 'Easy registration and status tracking for all presenters.', color: 'from-purple-500 to-pink-500' },
              { icon: BarChart3, title: 'Admin Dashboard', description: 'Complete oversight with analytics and approval workflows.', color: 'from-orange-500 to-red-500' },
              { icon: Globe, title: 'Cultural Diversity', description: 'Celebrate multiple cultures with beautiful presentations.', color: 'from-green-500 to-emerald-500' },
              { icon: Shield, title: 'Multi-Institution', description: 'Secure platform supporting multiple institutions.', color: 'from-indigo-500 to-purple-500' },
              { icon: Zap, title: 'Real-Time Updates', description: 'Instant notifications and live schedule changes.', color: 'from-yellow-500 to-orange-500' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Dr. Sarah Johnson', role: 'Director', quote: 'Echoes of Heritage transformed our Culture Week experience.', institution: 'State University' },
              { name: 'Michael Chen', role: 'Coordinator', quote: 'The admin dashboard gives us complete control.', institution: 'Community College' },
              { name: 'Amina Patel', role: 'Officer', quote: 'Finally, a platform that truly celebrates cultural diversity.', institution: 'International School' },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg"
                whileHover={{ y: -10 }}
              >
                <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-xs text-gray-500">{testimonial.role}, {testimonial.institution}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// CRITICAL: Next.js needs this line to find the component
export default HomePage;



