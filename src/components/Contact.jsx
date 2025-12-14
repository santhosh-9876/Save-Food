import { useState, useEffect } from 'react';
import { HiMail, HiPhone } from 'react-icons/hi';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { BiMessageDetail } from 'react-icons/bi';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: 'ease-out-quart',
      offset: 100,
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://formspree.io/f/xvgelwlr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactLinks = [
    { 
      icon: HiMail, 
      label: 'Email', 
      value: 'msanthoshk032@gmail.com',
      href: 'mailto:msanthoshk032@gmail.com' 
    },
    { 
      icon: HiPhone, 
      label: 'Phone', 
      value: '+91 63790 19258',
      href: 'tel:+916379019258' 
    },
    { 
      icon: FaLinkedinIn, 
      label: 'LinkedIn', 
      value: 'linkedin.com/in/santhoshkumar-m',
      href: 'https://www.linkedin.com/in/santhoshkumar-m-06005338b/' 
    },
    { 
      icon: FaGithub, 
      label: 'GitHub', 
      value: 'github.com/santhosh-9876',
      href: 'https://github.com/santhosh-9876/' 
    }
  ];

  return (
    <section className="min-h-screen py-20 px-4 relative overflow-hidden">
      <div className="geometric-bg"></div>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-400/25 to-purple-400/25 dark:from-indigo-600/15 dark:to-purple-600/15 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-400/25 to-rose-400/25 dark:from-pink-600/15 dark:to-rose-600/15 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 dark:from-blue-600/10 dark:to-cyan-600/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="spotlight" style={{ bottom: '-200px', left: '50%', transform: 'translateX(-50%)' }}></div>
      
      <div className="glow-dot" style={{ top: '20%', left: '10%', animationDelay: '0s' }}></div>
      <div className="glow-dot" style={{ top: '70%', right: '10%', animationDelay: '1.5s' }}></div>
      <div className="glow-dot" style={{ bottom: '30%', left: '50%', animationDelay: '0.8s' }}></div>
      

      
      <div className="particles">
        {[...Array(6)].map((_, i) => (
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
        <div className="text-center mb-16">
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            data-aos="fade-up"
            data-aos-duration="600"
          >
            Get In Touch
          </h2>
          <div 
            className="w-24 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mx-auto mb-6 rounded-full"
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="600"
          ></div>
          <p 
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="600"
          >
            Have a project in mind or want to collaborate? I'd love to hear from you. 
            Let's create something amazing together!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Contact Form Card */}
          <div
            className="bg-gradient-to-br from-slate-800/40 via-gray-800/30 to-slate-900/40 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-600/40 shadow-2xl hover:shadow-cyan-500/20 flex flex-col group hover:border-cyan-400/50 hover:bg-gradient-to-br hover:from-slate-800/50 hover:via-gray-800/40 hover:to-slate-900/50 transition-all duration-500"
            data-aos="flip-left"
            data-aos-duration="800"
            data-aos-delay="300"
          >
            <div 
              className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-8"
              data-aos="fade-down"
              data-aos-delay="600"
              data-aos-duration="500"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 via-cyan-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-cyan-500/30 group-hover:scale-105 transition-all duration-300">
                <BiMessageDetail className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-cyan-100 transition-colors duration-300">Send me a message</h3>
                <p className="text-sm text-gray-300 mt-1">Fill out the form below</p>
              </div>
            </div>
            
            <form 
              onSubmit={handleSubmit} 
              className="space-y-6 flex-1"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div 
                  className="space-y-2"
                  data-aos="fade-right"
                  data-aos-delay="700"
                  data-aos-duration="500"
                >
                  <label htmlFor="name" className="block text-sm font-semibold text-white">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 sm:py-4 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 text-sm sm:text-base"
                  />
                </div>
                <div 
                  className="space-y-2"
                  data-aos="fade-left"
                  data-aos-delay="800"
                  data-aos-duration="500"
                >
                  <label htmlFor="email" className="block text-sm font-semibold text-white">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 sm:py-4 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 text-sm sm:text-base"
                  />
                </div>
              </div>
              
              <div 
                className="space-y-2"
                data-aos="fade-up"
                data-aos-delay="900"
                data-aos-duration="500"
              >
                <label htmlFor="message" className="block text-sm font-semibold text-white">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project or just say hello..."
                  className="w-full px-4 py-3 sm:py-4 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 resize-none text-sm sm:text-base"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-4 bg-gradient-to-r from-cyan-600 via-cyan-700 to-blue-600 text-white rounded-xl font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl hover:shadow-cyan-500/30 hover:from-cyan-700 hover:via-cyan-800 hover:to-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 mt-auto relative overflow-hidden group hover:scale-105 hover:-translate-y-1 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                data-aos="zoom-in"
                data-aos-delay="1000"
                data-aos-duration="500"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-300 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Message sent successfully! I'll get back to you soon.
                  </div>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Failed to send message. Please try again or contact me directly.
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Contact Information Card */}
          <div
            className="bg-gradient-to-br from-slate-800/40 via-gray-800/30 to-slate-900/40 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-600/40 shadow-2xl hover:shadow-purple-500/20 flex flex-col group hover:border-purple-400/50 hover:bg-gradient-to-br hover:from-slate-800/50 hover:via-gray-800/40 hover:to-slate-900/50 transition-all duration-500"
            data-aos="flip-right"
            data-aos-duration="800"
            data-aos-delay="500"
          >
            <div 
              className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-8"
              data-aos="fade-down"
              data-aos-delay="800"
              data-aos-duration="500"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-purple-500/30 group-hover:scale-105 transition-all duration-300">
                <HiPhone className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-purple-100 transition-colors duration-300">Let's Connect</h3>
                <p className="text-sm text-gray-300 mt-1">Get in touch with me</p>
              </div>
            </div>
            
            <div className="space-y-4 sm:space-y-5 flex-1">
              {contactLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link-card group flex items-center gap-4 sm:gap-5 p-4 sm:p-5 bg-gradient-to-r from-slate-700/30 to-slate-600/30 backdrop-blur-sm rounded-2xl border border-slate-500/30 hover:border-purple-400/60 hover:bg-gradient-to-r hover:from-purple-500/15 hover:to-pink-500/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:shadow-lg hover:shadow-purple-500/20 hover:translate-x-2 hover:scale-105"
                  data-aos="fade-up"
                  data-aos-delay={600 + index * 100}
                  data-aos-duration="500"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-purple-700 group-hover:to-pink-700 transition-all duration-300 flex-shrink-0 shadow-lg">
                    <link.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white transition-colors duration-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-base sm:text-lg text-white group-hover:text-purple-200 transition-colors duration-300">
                      {link.label}
                    </div>
                    <div className="text-sm sm:text-base text-gray-300 group-hover:text-gray-100 transition-colors duration-300 truncate">
                      {link.value}
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;