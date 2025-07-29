import React, { useState } from 'react';
import Hero from '../components/home/Hero';
import BlogSection from '../components/home/BlogSection';
import ServicesSection from '../components/home/ServicesSection';
import AboutSection from '../components/home/AboutSection';
import OnboardingForm from '../components/forms/OnboardingForm';

const Home = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="pt-16"> {/* Account for fixed header */}
      <Hero onOpenForm={() => setIsFormOpen(true)} />
      
    </div>
  );
};

export default Home;