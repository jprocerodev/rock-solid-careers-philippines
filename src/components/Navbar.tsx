
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/98 backdrop-blur-md shadow-lg' : 'bg-white/95 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          <button 
            onClick={() => handleNavClick('#home')}
            className="group flex items-center gap-3 hover:scale-105 transition-all duration-300"
          >
            <div className="relative">
              <img 
                src="/lovable-uploads/d05db3d9-dcc4-48ce-9dfe-9fc2e28b5f22.png" 
                alt="Rock Solid Manpower Logo" 
                className="w-10 h-10 lg:w-12 lg:h-12 object-contain group-hover:scale-110 transition-all duration-300"
              />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent leading-tight">
                Rock Solid Manpower
              </span>
              <span className="text-xs lg:text-sm font-medium text-gray-500 -mt-1">
                Network & Consultancy Inc.
              </span>
            </div>
          </button>
          
          <div className="hidden md:flex space-x-8">
            {[
              { href: '#home', label: 'Home' },
              { href: '#about', label: 'About' },
              { href: '#services', label: 'Services' },
              { href: '#contact', label: 'Contact' }
            ].map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden bg-white/98 backdrop-blur-md border-t border-gray-200">
            <div className="px-4 py-4 space-y-4">
              {[
                { href: '#home', label: 'Home' },
                { href: '#about', label: 'About' },
                { href: '#services', label: 'Services' },
                { href: '#contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
