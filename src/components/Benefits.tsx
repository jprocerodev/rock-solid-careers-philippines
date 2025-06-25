
import React from 'react';
import { Card } from './ui/card';
import { DollarSign, Briefcase, Home, GraduationCap, Heart, FileText } from 'lucide-react';

const benefits = [
  {
    icon: DollarSign,
    title: '💰 Financial Assistance',
    description: 'Support with financial needs during the application process'
  },
  {
    icon: Briefcase,
    title: '🎒 Free Luggage Bag',
    description: 'Complimentary travel bag for your overseas journey'
  },
  {
    icon: Home,
    title: '🏠 Free Accommodation',
    description: 'Temporary housing assistance before departure'
  },
  {
    icon: GraduationCap,
    title: '🎓 Free TESDA',
    description: 'Technical Education and Skills Development training'
  },
  {
    icon: Heart,
    title: '⚕️ Free Medical',
    description: 'Medical examination and health certification'
  },
  {
    icon: FileText,
    title: '📋 Documentation Support',
    description: 'Complete assistance with all required paperwork'
  }
];

export const Benefits = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-green-50 via-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-green-50 text-green-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            What We Provide
          </div>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6">
            Complete Support for Your 
            <span className="block bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive assistance to ensure your overseas employment journey is smooth and successful
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card 
                key={index} 
                className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border-t-4 border-t-blue-500 bg-white"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
