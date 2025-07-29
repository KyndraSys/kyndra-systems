import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { X, Upload, ChevronLeft, Check } from 'lucide-react';

import OnboardingForm from '../components/forms/OnboardingForm';

const Onboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black z-10"></div>
          <div className="absolute inset-0">
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <span className="text-gray-500 text-lg"></span>
            </div>
          </div>
          
          {/* Geometric patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 right-20 w-64 h-64 border border-[#ff6200] rotate-45 rounded-2xl"></div>
            <div className="absolute bottom-32 left-32 w-48 h-48 border border-[#ff6200] rotate-12 rounded-xl"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-20 flex items-center min-h-[50vh]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-light text-white mb-6 leading-tight">
                Let's get <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6200] to-[#ff8533] font-normal">Started</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-3xl">
                Ready to grow your business? Let's discuss your project and bring your vision to life.
              </p>
              
              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="group inline-flex items-center justify-center px-8 py-4 bg-[#ff6200] text-white text-lg font-medium rounded-lg hover:bg-[#e55500] transition-all duration-300 hover:shadow-lg hover:shadow-[#ff6200]/25 transform hover:-translate-y-1"
                >
                  Start Your Project
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="group inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 text-white text-lg font-medium rounded-lg hover:border-[#ff6200] hover:bg-[#ff6200]/10 transition-all duration-300"
                >
                  Get Free Consultation
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      

      {/* Additional Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Why Choose <span className="text-[#ff6200] font-normal">Kyndra Systems</span>?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're committed to delivering exceptional results that drive your business forward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#ff6200]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-[#ff6200]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Team</h3>
              <p className="text-gray-600">
                Our experienced developers and designers bring your vision to life with precision and creativity.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#ff6200]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-[#ff6200]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Delivery</h3>
              <p className="text-gray-600">
                We ensure every project meets the highest standards of quality and performance.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#ff6200]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-[#ff6200]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ongoing Support</h3>
              <p className="text-gray-600">
                We provide continuous support and maintenance to keep your solutions running smoothly.
              </p>
            </div>
          </div>

          {/* Another CTA Section */}
          <div className="text-center mt-12">
            <p className="text-lg text-gray-600 mb-6">
              Ready to transform your business with cutting-edge solutions?
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center px-8 py-4 bg-[#000000] text-white text-lg font-medium rounded-lg hover:bg-[#27397d] transition-all duration-300 hover:shadow-lg hover:shadow-[#ff6200]/25 transform hover:-translate-y-1"
            >
              Let's Talk About Your Project
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Onboarding Form Modal */}
      {isFormOpen && (
        <OnboardingForm 
          isOpen={isFormOpen} 
          onClose={() => setIsFormOpen(false)} 
        />
      )}
    </div>
  );
};

export default Onboard;