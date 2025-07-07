
import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Stats } from '../components/Stats';
import { About } from '../components/About';
import { Mission } from '../components/Mission';
import { Benefits } from '../components/Benefits';
import { Services } from '../components/Services';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

const Index = () => {
  console.log('Index page rendering...');
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Mission />
      <Benefits />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
