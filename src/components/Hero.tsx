
import React from 'react';
import { Button } from './ui/button';

export const Hero = () => {
  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden pt-16">
      <div className="absolute inset-0 opacity-60">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-green-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-32 left-32 w-60 h-60 bg-blue-200 rounded-full opacity-15 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10 animate-fade-in">
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-semibold text-gray-700 mb-8 border border-white/20 shadow-sm">
          ✨ Trusted for Over 30 Years
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
          Your Gateway to <br />
          <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Overseas
          </span>
          <br />
          <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            Opportunities
          </span>
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
          Rock Solid Manpower Network & Consultancy Inc. - Your trusted partner in connecting Filipino workers with quality overseas employment opportunities across the Middle East.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={() => handleScrollTo('#contact')}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            🚀 Get Started Today
          </Button>
          <Button 
            onClick={() => handleScrollTo('#about')}
            variant="outline"
            size="lg"
            className="border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
          >
            📖 Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};
