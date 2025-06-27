import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Phone, Mail, MapPin, Upload, X } from 'lucide-react';
import { useContactForm } from '@/hooks/useContactForm';
import { useToast } from '@/hooks/use-toast';

export const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const { isSubmitting, submitContactForm } = useContactForm();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 5MB.",
          variant: "destructive"
        });
        return;
      }
      
      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or Word document.",
          variant: "destructive"
        });
        return;
      }
      
      setCvFile(file);
    }
  };

  const removeFile = () => {
    setCvFile(null);
    const fileInput = document.getElementById('cvUpload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    const success = await submitContactForm(formData, cvFile);
    
    if (success) {
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
      });
      setCvFile(null);
      const fileInput = document.getElementById('cvUpload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      info: '(02) 84-2061-59',
      href: 'tel:02842061459',
      color: 'from-red-500 to-red-400'
    },
    {
      icon: Mail,
      title: 'Email',
      info: 'rocksolidskilled@gmail.com',
      href: 'mailto:rocksolidskilled@gmail.com',
      color: 'from-green-500 to-green-400'
    },
    {
      icon: MapPin,
      title: 'Address',
      info: '2nd Floor Lifestyle building, 1928 Leon guinto street, Brgy 692 Malate Manila',
      href: null,
      color: 'from-blue-500 to-blue-400'
    }
  ];

  return (
    <section id="contact" className="py-8 sm:py-12 lg:py-24 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4">
        {/* Contact Us Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Get In Touch
          </div>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6">
            Contact{' '}
            <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Us
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to start your journey? Get in touch with us today to learn more about overseas opportunities.
          </p>
        </div>

        <Card className="max-w-6xl mx-auto bg-gradient-to-br from-white to-blue-50 shadow-2xl border-0 overflow-hidden">
          <div className="flex flex-col lg:grid lg:grid-cols-2">
            {/* Contact Info */}
            <div className="p-6 sm:p-8 lg:p-12 order-2 lg:order-1">
              <div className="inline-block bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4 sm:mb-6">
                Get In Touch
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                Ready to Start Your 
                <span className="block bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                  Journey?
                </span>
              </h3>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Contact us today to learn more about overseas opportunities and take the first step towards your career abroad.
              </p>

              <div className="space-y-4 sm:space-y-6">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  const content = (
                    <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-blue-500">
                      <div className={`w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center shadow-lg flex-shrink-0 mt-1`}>
                        <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">{item.title}</div>
                        <div className="text-gray-600 text-sm sm:text-base leading-relaxed">{item.info}</div>
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

              <div className="mt-6 sm:mt-8 space-y-3">
                <div className="inline-block bg-gradient-to-r from-green-100 to-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                  🌏 We speak Tagalog & English!
                </div>
                <div className="bg-gradient-to-r from-blue-100 to-green-100 text-blue-700 px-4 py-2 rounded-full text-xs font-semibold inline-block ml-2">
                  📜 License No. DMW-154-LB-08082023-R
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-6 sm:p-8 lg:p-12 border-t lg:border-t-0 lg:border-l lg:border-l-gray-100 order-1 lg:order-2">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 text-gray-800">
                💬 Send us a Message
              </h3>
              <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">We'll get back to you within 24 hours</p>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white text-sm sm:text-base"
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
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white text-sm sm:text-base"
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
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white text-sm sm:text-base"
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
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white resize-vertical text-sm sm:text-base"
                    required
                  />
                </div>

                {/* CV/Resume Upload */}
                <div>
                  <label htmlFor="cvUpload" className="block text-sm font-semibold text-gray-700 mb-2">
                    CV/Resume Upload (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="cvUpload"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="cvUpload"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-sm sm:text-base text-gray-600"
                    >
                      <Upload className="w-4 h-4" />
                      {cvFile ? cvFile.name : 'Choose CV/Resume file (PDF, DOC, DOCX)'}
                    </label>
                    {cvFile && (
                      <button
                        type="button"
                        onClick={removeFile}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Maximum file size: 5MB. Accepted formats: PDF, DOC, DOCX
                  </p>
                </div>

                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : '📋 Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
