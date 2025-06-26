
import React from 'react';
import { Card } from './ui/card';

export const Mission = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Our Purpose
          </div>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6">
            Our Vision &
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Mission
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-l-4 border-l-blue-500">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🔮</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">VISION</h3>
            </div>
            <p className="text-gray-600 leading-relaxed text-center">
              To be a globally recognized recruitment agency that champions the dreams of Filipino workers and the success of international employers through quality, integrity, and professionalism.
            </p>
          </Card>

          <Card className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-l-4 border-l-green-500">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">MISSION</h3>
            </div>
            <p className="text-gray-600 leading-relaxed text-center">
              To empower Filipino workers by providing ethical, sustainable, and life-changing overseas employment opportunities while maintaining excellence in service delivery, client satisfaction, and regulatory compliance.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};
