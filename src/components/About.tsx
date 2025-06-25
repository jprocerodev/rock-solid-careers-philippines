
import React from 'react';
import { Card } from './ui/card';

const features = [
  {
    title: '🏆 Trusted Experience',
    description: 'Over three decades of successful placements and satisfied clients'
  },
  {
    title: '💼 Professional Excellence',
    description: 'Committed to integrity, efficiency, and professional service'
  },
  {
    title: '🤝 Global Partnerships',
    description: 'Strong relationships with employers across the Middle East'
  }
];

export const About = () => {
  return (
    <section id="about" className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-block bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              About Our Company
            </div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 leading-tight">
              Building Careers, 
              <span className="block bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Connecting
              </span> Dreams
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
              Rock Solid Manpower Network & Consultancy Inc. is a trusted Philippines-based recruitment agency specializing in overseas job placement for Filipino workers. With over 30 years of industry experience, we've built a solid reputation for integrity, efficiency, and professionalism.
            </p>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-blue-500">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-green-400 rounded-3xl transform rotate-3"></div>
            <img 
              src="https://images.unsplash.com/photo-1560472355-536de3962603?w=600&h=600&fit=crop" 
              alt="Professional team" 
              className="relative rounded-3xl shadow-2xl w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
