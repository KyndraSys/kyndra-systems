import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../../assets/logo-o.png';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
        { name: 'Onboard', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src={logo} 
              alt="Kyndra Systems Logo" 
              className="h-8 w-auto object-contain" 
            />
          </Link>

          {/* Desktop Navigation - Original design with brand colors */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'border-b-2'
                    : 'hover:text-gray-900'
                }`}
                style={
                  isActive(item.href) 
                    ? { color: '#27397d', borderBottomColor: '#27397d' }
                    : { color: '#6b7280' }
                }
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button - Updated with brand orange */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/blog"
              className="px-4 py-2 rounded-lg font-medium text-white transition-colors"
              style={{ backgroundColor: '#ff6200' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#e55a00'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#ff6200'}
            >
              Start a Project
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 text-base font-medium ${
                    isActive(item.href)
                      ? 'bg-gray-50'
                      : 'hover:bg-gray-50'
                  }`}
                  style={
                    isActive(item.href) 
                      ? { color: '#27397d' }
                      : { color: '#6b7280' }
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/blog"
                className="mt-4 px-4 py-2 rounded-lg font-medium text-white text-center transition-colors"
                style={{ backgroundColor: '#ff6200' }}
                onClick={() => setIsMenuOpen(false)}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#e55a00'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#ff6200'}
              >
                Start a Project
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;