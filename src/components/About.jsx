import { motion, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { 
  SiPython, 
  SiReact, 
  SiDjango, 
  SiJavascript, 
  SiMongodb, 
  SiBootstrap, 
  SiGithub 
} from 'react-icons/si';
import { HiOutlineLink } from 'react-icons/hi';
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true, // Only animate once for better performance
      easing: 'ease-out-quart',
      offset: 100,
      delay: 0,
      mirror: false, // Disable mirror for better performance
      anchorPlacement: 'top-bottom',
    });
  }, []);

  const skills = [
    { 
      name: 'Python', 
      icon: SiPython, 
      color: 'text-yellow-400',
      category: 'Backend Language',
      description: 'Server-side development & automation'
    },
    { 
      name: 'React', 
      icon: SiReact, 
      color: 'text-cyan-400',
      category: 'Frontend Library',
      description: 'Interactive user interfaces'
    },
    { 
      name: 'Django REST', 
      icon: SiDjango, 
      color: 'text-green-500',
      category: 'Backend Framework',
      description: 'RESTful API development'
    },
    { 
      name: 'JavaScript', 
      icon: SiJavascript, 
      color: 'text-yellow-300',
      category: 'Programming Language',
      description: 'Dynamic web functionality'
    },
    { 
      name: 'MongoDB', 
      icon: SiMongodb, 
      color: 'text-green-400',
      category: 'NoSQL Database',
      description: 'Document-based data storage'
    },
    { 
      name: 'Bootstrap', 
      icon: SiBootstrap, 
      color: 'text-purple-500',
      category: 'CSS Framework',
      description: 'Responsive design system'
    },
    { 
      name: 'GitHub', 
      icon: SiGithub, 
      color: 'text-gray-300',
      category: 'Version Control',
      description: 'Code collaboration & hosting'
    },
    { 
      name: 'API Design', 
      icon: HiOutlineLink, 
      color: 'text-blue-400',
      category: 'Architecture',
      description: 'RESTful service design'
    },
  ];



  return (
    <section className="min-h-screen py-20 px-4 relative overflow-hidden" ref={ref}>
      {/* Geometric pattern */}
      <div className="geometric-bg"></div>
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 dark:from-blue-600/10 dark:to-cyan-600/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 dark:from-purple-600/10 dark:to-pink-600/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 animate-blob animation-delay-2000"></div>
      </div>
      
      {/* Glowing dots */}
      <div className="glow-dot" style={{ top: '15%', right: '20%', animationDelay: '0.5s' }}></div>
      <div className="glow-dot" style={{ bottom: '25%', left: '15%', animationDelay: '1.5s' }}></div>
      

      
      {/* Floating particles */}
      <div className="particles">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${20 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-white dark:text-white"
            data-aos="fade-up"
            data-aos-duration="600"
          >
            About Me
          </h2>
          <div 
            className="w-24 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mx-auto mb-8 rounded-full"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="600"
          ></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <div 
            className="max-w-4xl mx-auto bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-gray-700/50 shadow-xl"
            data-aos="zoom-in"
            data-aos-duration="800"
            data-aos-delay="400"
          >
            <p className="text-xl text-gray-100 dark:text-gray-200 text-center leading-relaxed font-light">
              I'm a passionate <span className="font-semibold text-cyan-300">Python Full-Stack Developer</span> specializing in 
              <span className="font-semibold text-blue-300"> React</span> and 
              <span className="font-semibold text-purple-300"> Django REST Framework</span>. 
              I enjoy building scalable, user-friendly web applications that solve real-world problems. 
              I focus on clean code, responsive design, and efficient APIs while continuously learning new technologies.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h3 
              className="text-3xl font-bold mb-4 text-white dark:text-white"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="600"
            >
              Skills & Technologies
            </h3>
            <p 
              className="text-gray-300 dark:text-gray-400 max-w-2xl mx-auto"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="700"
            >
              Technologies I work with to bring ideas to life
            </p>
          </div>
          
          <div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="800"
          >
            {skills.map((skill, index) => {
              const colors = [
                'from-cyan-400 to-blue-500',
                'from-blue-400 to-purple-500', 
                'from-purple-400 to-pink-500',
                'from-pink-400 to-red-500',
                'from-emerald-400 to-teal-500',
                'from-orange-400 to-yellow-500',
                'from-indigo-400 to-purple-500',
                'from-green-400 to-emerald-500'
              ];
              
              const animationTypes = [
                'fade-up-right',
                'fade-up-left', 
                'fade-down-right',
                'fade-down-left',
                'zoom-in-up',
                'zoom-in-down',
                'flip-up',
                'flip-down'
              ];
              
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="group relative bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center border border-white/20 dark:border-gray-700/50 overflow-hidden cursor-pointer min-h-[180px] flex flex-col justify-center hover:min-h-[240px] hover:scale-105 hover:-translate-y-2"
                  style={{ perspective: '1000px' }}
                  data-aos={animationTypes[index % animationTypes.length]}
                  data-aos-duration="1000"
                  data-aos-delay={50 + index * 100}
                  data-aos-easing="ease-out-back"
                  data-aos-anchor-placement="center-bottom"
                >
                  {/* Simple gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors[index % colors.length]} rounded-2xl opacity-0 group-hover:opacity-20 transition-all duration-300`} />
                  

                  
                  {/* Glowing border effect */}
                  <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:${colors[index % colors.length]} opacity-0 group-hover:opacity-100 transition-all duration-300`} />
                  

                  
                  <motion.div 
                    className="relative z-10"
                    whileHover={{
                      y: -15,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                  >
                    {/* Icon with unique animations */}
                    <motion.div 
                      className="text-5xl mb-4 relative flex justify-center"
                      whileHover={{
                        scale: [1, 1.2, 1.1],
                        rotate: [0, -10, 5, 0],
                        y: [-2, -8, -4],
                      }}
                      transition={{
                        duration: 0.4,
                        ease: "easeOut"
                      }}
                      data-aos="zoom-in"
                      data-aos-duration="600"
                      data-aos-delay={200 + index * 100}
                    >
                      <skill.icon className={`w-12 h-12 ${skill.color} group-hover:scale-110 transition-transform duration-300`} />
                    </motion.div>
                    
                    {/* Text with simple hover effect */}
                    <div 
                      className="font-semibold text-white dark:text-white text-xl group-hover:text-2xl transition-all duration-300 overflow-hidden"
                      data-aos="fade-up"
                      data-aos-duration="500"
                      data-aos-delay={300 + index * 100}
                    >
                      <span
                        className={`inline-block bg-gradient-to-r ${colors[index % colors.length]} bg-clip-text text-transparent group-hover:text-transparent transition-all duration-300`}
                      >
                        {skill.name}
                      </span>
                    </div>
                    
                    {/* Enhanced hover content */}
                    <div className="mt-3 max-h-0 group-hover:max-h-20 opacity-0 group-hover:opacity-100 overflow-hidden transition-all duration-300 delay-100">
                      <div className="text-center space-y-2">
                        <div 
                          className={`text-sm group-hover:text-base font-semibold ${skill.color} uppercase tracking-wider transition-all duration-300`}
                          data-aos="slide-up"
                          data-aos-duration="300"
                          data-aos-delay={450 + index * 100}
                        >
                          {skill.category}
                        </div>
                        <div 
                          className="text-sm group-hover:text-base text-gray-300 leading-relaxed px-2 transition-all duration-300"
                          data-aos="slide-up"
                          data-aos-duration="300"
                          data-aos-delay={500 + index * 100}
                        >
                          {skill.description}
                        </div>
                        <div 
                          className="w-8 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent mx-auto opacity-60"
                          data-aos="fade-in"
                          data-aos-duration="200"
                          data-aos-delay={550 + index * 100}
                        ></div>
                      </div>
                    </div>
                  </motion.div>
                  

                </motion.div>
              );
            })}
          </div>
        </motion.div>


      </div>
    </section>
  );
};

export default About;
