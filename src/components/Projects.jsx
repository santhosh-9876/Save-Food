import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { MdRestaurant } from 'react-icons/md';
import { BiCameraMovie } from 'react-icons/bi';
import { HiExternalLink } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import { 
  SiReact, 
  SiPython, 
  SiDjango, 
  SiJavascript, 
  SiMongodb, 
  SiBootstrap, 
  SiGit 
} from 'react-icons/si';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: 'ease-out-quart',
      offset: 100,
    });
  }, []);

  // Function to get technology icon and color
  const getTechIcon = (tech) => {
    const techMap = {
      'React': { icon: SiReact, color: 'text-cyan-400' },
      'Python': { icon: SiPython, color: 'text-yellow-400' },
      'Django': { icon: SiDjango, color: 'text-green-500' },
      'Django REST': { icon: SiDjango, color: 'text-green-500' },
      'JavaScript': { icon: SiJavascript, color: 'text-yellow-300' },
      'MongoDB': { icon: SiMongodb, color: 'text-green-400' },
      'Bootstrap': { icon: SiBootstrap, color: 'text-purple-500' },
      'Git': { icon: SiGit, color: 'text-orange-500' }
    };
    return techMap[tech] || { icon: null, color: 'text-gray-400' };
  };

  const projects = [
    {
      id: 1,
      title: 'BiteShare',
      description: 'Social food sharing platform connecting food lovers and local restaurants',
      tags: ['React', 'Django REST', 'Python', 'MongoDB'],
      icon: MdRestaurant,
      iconColor: 'from-orange-500 to-red-500',
      details:
        'BiteShare is a comprehensive food sharing platform that connects food enthusiasts with local restaurants and home cooks. Users can discover new dishes, share their culinary experiences, and build a community around food culture.',
      features: ['User Profiles', 'Restaurant Integration', 'Food Reviews', 'Social Sharing', 'Location-based Discovery'],
    },
    {
      id: 2,
      title: 'ShowTime',
      description: 'Real-time movie and event schedule website for entertainment planning',
      tags: ['React', 'Django', 'JavaScript', 'Bootstrap'],
      icon: BiCameraMovie,
      iconColor: 'from-purple-500 to-indigo-500',
      details:
        'ShowTime is a website that displays real-time movie and event schedules. It helps users quickly find what\'s playing nearby and plan their visits. With easy access to show timings and venues, users can explore options effortlessly. The website makes entertainment planning fast, simple, and convenient.',
      features: ['Real-time Schedules', 'Location-based Search', 'Venue Information', 'Show Timings', 'Entertainment Planning'],
    },
  ];

  return (
    <section className="min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Mesh gradient */}
      <div className="mesh-gradient"></div>
      
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-400/30 to-pink-400/30 dark:from-purple-600/15 dark:to-pink-600/15 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/30 to-cyan-400/30 dark:from-blue-600/15 dark:to-cyan-600/15 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-gradient-to-br from-green-400/20 to-emerald-400/20 dark:from-green-600/10 dark:to-emerald-600/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Spotlight */}
      <div className="spotlight" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
      
      {/* Glowing dots grid */}
      <div className="glow-dot" style={{ top: '10%', left: '20%', animationDelay: '0s' }}></div>
      <div className="glow-dot" style={{ top: '30%', right: '15%', animationDelay: '1s' }}></div>
      <div className="glow-dot" style={{ bottom: '20%', left: '40%', animationDelay: '2s' }}></div>
      <div className="glow-dot" style={{ bottom: '40%', right: '30%', animationDelay: '1.5s' }}></div>
      
      {/* Floating particles */}
      <div className="particles">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${18 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-white dark:text-white"
            data-aos="fade-up"
            data-aos-duration="600"
          >
             Projects
          </h2>
          <div 
            className="w-24 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mx-auto mb-6 rounded-full"
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="600"
          ></div>
          <p 
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="600"
          >
            Explore my latest work showcasing full-stack development with modern technologies
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 cursor-pointer overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:scale-105 hover:-translate-y-2"
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedProject(project);
                }
              }}
              aria-label={`View details for ${project.title}`}
              data-aos={index % 2 === 0 ? "flip-left" : "flip-right"}
              data-aos-duration="800"
              data-aos-delay={300 + index * 200}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              
              <div className="relative p-8">
                {/* Project Icon */}
                <div 
                  className={`flex items-center justify-center w-20 h-20 bg-gradient-to-br ${project.iconColor} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-200 shadow-lg`}
                  data-aos="zoom-in"
                  data-aos-delay={400 + index * 200}
                  data-aos-duration="500"
                >
                  <project.icon className="text-4xl text-white" />
                </div>
                
                {/* Project Title */}
                <h3 
                  className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200"
                  data-aos="fade-down"
                  data-aos-delay={500 + index * 200}
                  data-aos-duration="500"
                >
                  {project.title}
                </h3>
                
                {/* Project Description */}
                <p 
                  className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed line-clamp-3"
                  data-aos="fade-up"
                  data-aos-delay={600 + index * 200}
                  data-aos-duration="500"
                >
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div 
                  className="flex flex-wrap gap-2 mb-6"
                  data-aos="fade-up"
                  data-aos-delay={700 + index * 200}
                  data-aos-duration="500"
                >
                  {project.tags.map(tag => {
                    const { icon: TechIcon, color } = getTechIcon(tag);
                    return (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-lg border border-blue-200 dark:border-blue-700/50 group-hover:border-blue-300 dark:group-hover:border-blue-600 transition-colors duration-200 flex items-center gap-2"
                      >
                        {TechIcon && <TechIcon className={`w-4 h-4 ${color}`} />}
                        {tag}
                      </span>
                    );
                  })}
                </div>
                
                {/* View Details Button */}
                <div 
                  className="flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200"
                  data-aos="fade-up"
                  data-aos-delay={800 + index * 200}
                  data-aos-duration="500"
                >
                  <span>View Details</span>
                  <HiExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={e => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`flex items-center justify-center w-20 h-20 bg-gradient-to-br ${selectedProject.iconColor} rounded-2xl shadow-lg`}>
                      <selectedProject.icon className="text-4xl text-white" />
                    </div>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                      aria-label="Close modal"
                    >
                      <IoClose className="w-6 h-6" />
                    </button>
                  </div>
                  <h3 id="modal-title" className="text-3xl font-bold mb-2">
                    {selectedProject.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {selectedProject.details}
                  </p>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Key Features:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                      {selectedProject.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.tags.map(tag => {
                      const { icon: TechIcon, color } = getTechIcon(tag);
                      return (
                        <span
                          key={tag}
                          className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-lg border border-blue-200 dark:border-blue-700/50 flex items-center gap-2"
                        >
                          {TechIcon && <TechIcon className={`w-4 h-4 ${color}`} />}
                          {tag}
                        </span>
                      );
                    })}
                  </div>

                 
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
