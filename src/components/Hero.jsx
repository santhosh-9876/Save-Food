import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const roles = ['Full-Stack Developer', 'Python Developer', 'Django Expert', 'React Specialist'];
  const [currentRole, setCurrentRole] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRoleText = roles[currentRole];
    
    const typeSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 300 : 800;
    
    if (!isDeleting && displayedText === currentRoleText) {
      // Finished typing, pause then start deleting
      setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayedText === '') {
      // Finished deleting, move to next role
      setIsDeleting(false);
      setCurrentRole((prev) => (prev + 1) % roles.length);
    } else {
      // Continue typing or deleting
      setTimeout(() => {
        if (isDeleting) {
          setDisplayedText(currentRoleText.substring(0, displayedText.length - 1));
        } else {
          setDisplayedText(currentRoleText.substring(0, displayedText.length + 1));
        }
      }, typeSpeed);
    }
  }, [displayedText, isDeleting, currentRole, roles]);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-16 relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 dark:from-black dark:via-gray-900 dark:to-slate-900">
      {/* Dynamic background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-5"></div>
      
      {/* Interactive cursor glow */}
      <motion.div
        className="fixed w-96 h-96 rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Cursor-reactive floating balls */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => {
          const colors = [
            'from-cyan-400 to-blue-500',
            'from-blue-400 to-purple-500', 
            'from-purple-400 to-pink-500',
            'from-pink-400 to-red-500',
            'from-emerald-400 to-teal-500'
          ];
          const sizes = ['w-3 h-3', 'w-4 h-4', 'w-5 h-5', 'w-6 h-6'];
          const baseLeft = 20 + (i * 8) % 60;
          const baseTop = 15 + (i * 12) % 70;
          
          return (
            <motion.div
              key={i}
              className={`absolute ${sizes[i % sizes.length]} bg-gradient-to-br ${colors[i % colors.length]} rounded-full opacity-25`}
              style={{
                left: `${baseLeft}%`,
                top: `${baseTop}%`,
              }}
              animate={{
                x: [
                  (mousePosition.x / window.innerWidth - 0.5) * (30 + i * 5),
                  (mousePosition.x / window.innerWidth - 0.5) * (30 + i * 5) + Math.sin(Date.now() / 1000 + i) * 20,
                  (mousePosition.x / window.innerWidth - 0.5) * (30 + i * 5) + Math.cos(Date.now() / 1000 + i) * 15,
                  (mousePosition.x / window.innerWidth - 0.5) * (30 + i * 5)
                ],
                y: [
                  (mousePosition.y / window.innerHeight - 0.5) * (30 + i * 5),
                  (mousePosition.y / window.innerHeight - 0.5) * (30 + i * 5) + Math.cos(Date.now() / 1000 + i) * 25,
                  (mousePosition.y / window.innerHeight - 0.5) * (30 + i * 5) + Math.sin(Date.now() / 1000 + i) * 20,
                  (mousePosition.y / window.innerHeight - 0.5) * (30 + i * 5)
                ],
                rotate: [0, 180, 360, 0],
                scale: [1, 1.2, 0.8, 1],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          );
        })}
        
        {/* Auto-moving floating orbs */}
        {[...Array(6)].map((_, i) => {
          const orbColors = [
            'from-cyan-300 to-blue-400',
            'from-purple-300 to-pink-400',
            'from-emerald-300 to-teal-400',
            'from-orange-300 to-red-400',
            'from-indigo-300 to-purple-400',
            'from-pink-300 to-rose-400'
          ];
          
          return (
            <motion.div
              key={`auto-${i}`}
              className={`absolute w-8 h-8 bg-gradient-to-br ${orbColors[i]} rounded-full opacity-20 blur-sm`}
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + i * 10}%`,
              }}
              animate={{
                x: [0, 100, -50, 80, 0],
                y: [0, -80, 60, -40, 0],
                scale: [1, 1.5, 0.8, 1.3, 1],
                rotate: [0, 180, 270, 90, 360],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1.5,
              }}
            />
          );
        })}
        
        {/* Static decorative particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`static-${i}`}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center">
        
          {/* Main heading */}
          <motion.h1
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="block text-gray-100 dark:text-white">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 sm:from-cyan-400 sm:via-blue-400 sm:to-purple-400 md:from-cyan-500 md:via-blue-500 md:to-purple-500 bg-clip-text text-transparent drop-shadow-sm">
                Santhoshkumar
              </span>
            </span>
          </motion.h1>

          {/* Dynamic role */}
          <motion.div
            className="h-20 mb-8 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.p
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-700 dark:text-gray-300 min-h-[1.2em] flex items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span>{displayedText}</span>
              <motion.span
                className="inline-block w-0.5 h-8 sm:h-10 md:h-12 bg-blue-500 ml-1"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.p>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Passionate about building scalable web applications with{' '}
            <span className="text-blue-600 dark:text-blue-400 font-semibold">Python</span>,{' '}
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">React</span>, and{' '}
            <span className="text-green-600 dark:text-green-400 font-semibold">Django REST Framework</span>.
            <br />
            I create clean, efficient solutions that solve real-world problems.
          </motion.p>

        </div>
      </div>

      

      {/* Enhanced Scroll Area - Full Width Clickable */}
      <div 
        className='scroll-area absolute bottom-0 left-0 w-full h-32 flex items-center justify-center cursor-pointer group'
        onClick={() => {
          setTimeout(() => {
            const element = document.getElementById('about');
            if (element) {
              const offset = 80;
              const elementPosition = element.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - offset;
              window.scrollTo({ 
                top: offsetPosition, 
                behavior: 'smooth' 
              });
            } else {
              window.scrollTo({ 
                top: window.innerHeight, 
                behavior: 'smooth' 
              });
            }
          }, 100);
        }}
      >
        {/* Visual indicator that it's clickable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
       
      <motion.button
        className="relative cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full p-2 hover:bg-white/5 hover:backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="w-7 h-11 border-2 border-white/40 dark:border-gray-400 hover:border-blue-400 dark:hover:border-blue-400 rounded-full flex justify-center transition-colors duration-300"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1.5 h-3 bg-white/50 dark:bg-gray-400 hover:bg-blue-400 dark:hover:bg-blue-400 rounded-full mt-2 transition-colors duration-300"
            animate={{ scaleY: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.button>
      </div>
    </section>
  );
};

export default Hero;
