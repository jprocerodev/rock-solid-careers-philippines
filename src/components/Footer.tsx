
import React from 'react';

export const Footer = () => {
  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white relative">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-green-400"></div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          <div>
            <div className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-4">
              🏢 Rock Solid Manpower
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Your trusted partner for overseas employment opportunities with over 30 years of experience.
            </p>
            <div className="text-xs text-gray-400 mb-6">
              License No. DMW-154-LB-08082023-R
            </div>
            <div className="flex gap-4">
              {['📘', '📧', '📞'].map((emoji, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300"
                >
                  <span className="text-lg">{emoji}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">🔗 Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: '#home', label: 'Home' },
                { href: '#about', label: 'About' },
                { href: '#services', label: 'Services' },
                { href: '#contact', label: 'Contact' }
              ].map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => handleScrollTo(item.href)}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Contact Info</h4>
            <div className="space-y-3 text-gray-300 text-sm">
              <p className="flex items-start gap-2">
                <span className="text-base">🏢</span>
                <span>2nd Floor Lifestyle building, 1928 Leon guinto street<br />Brgy 692 Malate Manila</span>
              </p>
              <p className="flex items-center gap-2">
                🇵🇭 Philippines
              </p>
              <p className="flex items-center gap-2 text-blue-400">
                📞 Phone: (02) 84-2061-59
              </p>
              <p className="flex items-center gap-2 text-green-400">
                📧 Email: info@rocksolidmanpower.com
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>© 2023 Rock Solid Manpower Network & Consultancy Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
