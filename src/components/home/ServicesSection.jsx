import React, { useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { webServices, graphicsServices } from '../../data/services';

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState('web');

  const currentServices = activeTab === 'web' ? webServices : graphicsServices;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 text-sm font-medium rounded-full mb-4"
               style={{ backgroundColor: '#FF6200/10', color: '#FF6200' }}>
            Comprehensive Technology Solutions
          </div>
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#000000' }}>
            Engineering Excellence Powers
            <span className="block" style={{ color: '#FF6200' }}>Transformation</span>
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: '#A0A0A0' }}>
            Engineering excellence is powering transformation in every industry we serve. 
            Discover our comprehensive suite of web solutions and graphics services.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 rounded-lg p-1 flex">
            <button
              onClick={() => setActiveTab('web')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'web'
                  ? 'bg-white shadow-sm'
                  : 'hover:opacity-80'
              }`}
              style={{ 
                color: activeTab === 'web' ? '#FF6200' : '#A0A0A0'
              }}
            >
              Web Solutions
            </button>
            <button
              onClick={() => setActiveTab('graphics')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'graphics'
                  ? 'bg-white shadow-sm'
                  : 'hover:opacity-80'
              }`}
              style={{ 
                color: activeTab === 'graphics' ? '#FF6200' : '#A0A0A0'
              }}
            >
              Graphics
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentServices.map((service) => (
            <div
              key={service.id}
              className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 card-hover"
              style={{ 
                borderColor: 'group-hover:#FF6200/30'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#FF6200/30';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
              }}
            >
              {/* Service Icon */}
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:opacity-90 transition-colors"
                   style={{ backgroundColor: '#FF6200/10' }}>
                <span className="text-2xl">{service.icon}</span>
              </div>

              {/* Service Content */}
              <h3 className="text-xl font-semibold mb-3 group-hover:transition-colors"
                  style={{ color: '#000000' }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#FF6200';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#000000';
                  }}>
                {service.name}
              </h3>

              <p className="mb-4 leading-relaxed" style={{ color: '#A0A0A0' }}>
                {service.description}
              </p>

              {/* Deliverables */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-2" style={{ color: '#000000' }}>Key Deliverables:</h4>
                <ul className="space-y-1">
                  {service.deliverables.slice(0, 3).map((deliverable, index) => (
                    <li key={index} className="text-sm flex items-center" style={{ color: '#A0A0A0' }}>
                      <div className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: '#FF6200' }}></div>
                      {deliverable}
                    </li>
                  ))}
                  {service.deliverables.length > 3 && (
                    <li className="text-sm italic" style={{ color: '#A0A0A0' }}>
                      +{service.deliverables.length - 3} more deliverables
                    </li>
                  )}
                </ul>
              </div>

              {/* CTA Button */}
              <button className="w-full text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center group hover:opacity-90"
                      style={{ backgroundColor: '#FF6200' }}>
                Order Service
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>

        {/* All Services Button */}
        <div className="text-center">
          <button className="text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center mx-auto group hover:opacity-90"
                  style={{ backgroundColor: '#000000' }}>
            View All Services
            <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;