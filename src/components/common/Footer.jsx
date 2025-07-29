import React from 'react';
import { Mail, Phone, MapPin, Clock, ChevronRight } from 'lucide-react';

import logo from '../../assets/logo-o.png';
import kyndra from '../../assets/logo.png';


const Footer = () => {
  const currentTime = new Date().toLocaleTimeString('en-US', {
    timeZone: 'Africa/Nairobi',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  });

  const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'Digital Products', href: '#' },
  
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <footer className="bg-black text-white border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <img 
                  src={logo} 
                  alt="Kyndra Systems Logo" 
                  className="h-8 w-auto object-contain mr-3" 
                />
                
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Transforming enterprises through refined technology solutions. 
                We empower large corporations to create measurable impact through 
                cutting-edge web solutions and strategic design.
              </p>
              
              {/* Start Project Button */}
              <a 
                href="/blog"
                className="inline-flex items-center px-6 py-3 bg-[#a0a0a0] text-black text-sm font-medium rounded-lg hover:bg-[#e55500] transition-colors"
              >
                Start Your Project
                <ChevronRight className="h-4 w-4 ml-2" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-[#ff6200] transition-colors flex items-center group"
                  >
                    <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-300">
                <Phone className="h-4 w-4 mr-3 text-gray-400" />
                <a href="tel:0113904796" className="hover:text-[#ff6200] transition-colors">
                  0113 904796
                </a>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Mail className="h-4 w-4 mr-3 text-gray-400" />
                <a href="mailto:kyndrasystems@gmail.com" className="hover:text-[#ff6200] transition-colors">
                  kyndrasystems@gmail.com
                </a>
              </div>
              <div className="flex items-start text-sm text-gray-300">
                <MapPin className="h-4 w-4 mr-3 mt-0.5 text-gray-400 flex-shrink-0" />
                <span>Westwood Vale Close<br />Nairobi, Kenya</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Clock className="h-4 w-4 mr-3 text-gray-400" />
                <span>Local time: {currentTime}</span>
              </div>
            </div>
          </div>
        </div>

        
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 bg-[#a0a0a0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-sm text-[#000000]">
                © 2025 Kyndra Systems. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-sm text-[#000000]">
                  Privacy Policy
                </a>
                <a href="#" className="text-sm text-[#000000]">
                  Terms of Service
                </a>
                <a href="#" className="text-sm text-[#000000] ">
                  Cookie Policy
                </a>
              </div>
            </div>

           {/* Your Signature - Powered by */}
            <div className="powered-by flex justify-center items-center space-x-3">
              <span className="text-black hover:text-[#ff6200] hover:text-shadow-[0_0_5px_#ff6200,0_0_10px_#ff6200] text-sm transition-colors">
                Powered by
              </span>
              <a 
                href="https://kyndrasystems.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-black hover:text-[#ff6200] transition-colors"
              >
                <img src={kyndra} alt="Kyndra Systems" className="h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;