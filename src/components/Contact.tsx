
import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Message Sent!",
      description: "Thank you for your message! We will get back to you within 24 hours."
    });

    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      info: '+63 02 123 4567',
      href: 'tel:+63021234567',
      color: 'from-red-500 to-red-400'
    },
    {
      icon: Mail,
      title: 'Email',
      info: 'info@rocksolidmanpower.com',
      href: 'mailto:info@rocksolidmanpower.com',
      color: 'from-green-500 to-green-400'
    },
    {
      icon: MapPin,
      title: 'Address',
      info: '123 Business St., Makati City, Philippines',
      href: null,
      color: 'from-blue-500 to-blue-400'
    }
  ];

  return (
    <section id="contact" className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4">
        <Card className="max-w-6xl mx-auto bg-gradient-to-br from-white to-blue-50 shadow-2xl border-0 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Info */}
            <div className="p-8 lg:p-12">
              <div className="inline-block bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                Get In Touch
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Ready to Start Your 
                <span className="block bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                  Journey?
                </span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Contact us today to learn more about overseas opportunities and take the first step towards your career abroad.
              </p>

              <div className="space-y-6">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  const content = (
                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-blue-500">
                      <div className={`w-14 h-14 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 mb-1">{item.title}</div>
                        <div className="text-gray-600">{item.info}</div>
                      </div>
                    </div>
                  );

                  return item.href ? (
                    <a key={index} href={item.href} className="block">
                      {content}
                    </a>
                  ) : (
                    <div key={index}>
                      {content}
                    </div>
                  );
                })}
              </div>

              <div className="mt-8">
                <div className="inline-block bg-gradient-to-r from-green-100 to-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                  🌏 We speak Tagalog & English!
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 lg:p-12 border-l lg:border-l-gray-100">
              <h3 className="text-2xl lg:text-3xl font-bold mb-2 text-gray-800">
                💬 Send us a Message
              </h3>
              <p className="text-gray-600 mb-8">We'll get back to you within 24 hours</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your interests and experience..."
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white resize-vertical"
                    required
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  📋 Send Message
                </Button>
              </form>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
