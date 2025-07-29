import React from 'react';
import { ChevronRight } from 'lucide-react';

const Contact = () => {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] overflow-hidden" style={{ backgroundColor: '#27397d' }}>
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 z-10" style={{ backgroundColor: 'rgba(39, 57, 125, 0.85)' }}></div>
          <div className="absolute inset-0">
            <img
              src="https://l0kbxarjd9.ufs.sh/f/GBNtWc6jN1ySCcuz80ZAjYfSNlDxysGeth8IP6CQV29Mmari"
              alt="Contact Kyndra"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Geometric patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 right-20 w-64 h-64 border-2 rotate-45 rounded-2xl" style={{ borderColor: '#ff6200' }}></div>
            <div className="absolute bottom-32 left-32 w-48 h-48 border-2 rotate-12 rounded-xl" style={{ borderColor: '#ff6200' }}></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-20 flex items-center min-h-[50vh]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-light text-white mb-6 leading-tight">
                Connect with Kyndra <span className="font-normal" style={{ color: '#ff6200' }}>Network</span>
              </h1>
              <p className="text-lg md:text-xl text-white mb-8 leading-relaxed opacity-90">
                Ready to transform industries with IT and technology solutions? Reach us at{' '}
                <a 
                  href="mailto:kyndrasystems@gmail.com" 
                  className="hover:text-orange-400 transition-all duration-300 hover:drop-shadow-lg"
                  style={{ 
                    color: '#ff6200',
                    textShadow: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.textShadow = '0 0 10px #ff6200, 0 0 20px #ff6200';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.textShadow = 'none';
                  }}
                >
                  kyndrasystems@gmail.com
                </a>{' '}
                or call us at{' '}
                <a 
                  href="tel:+254113904796" 
                  className="hover:text-orange-400 transition-all duration-300 hover:drop-shadow-lg"
                  style={{ 
                    color: '#ff6200',
                    textShadow: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.textShadow = '0 0 10px #ff6200, 0 0 20px #ff6200';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.textShadow = 'none';
                  }}
                >
                  +254 113 904 796
                </a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;