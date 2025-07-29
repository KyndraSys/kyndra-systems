import React from 'react';
import { Target, Users, Award, TrendingUp } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: Target,
      title: "Client-Centered Innovation",
      description: "We focus on creating technology experiences that people want to be part of."
    },
    {
      icon: TrendingUp,
      title: "Measurable Impact",
      description: "Solutions that drive both market growth and real-world influence."
    },
    {
      icon: Award,
      title: "Engineering Excellence",
      description: "Refined, optimized, and robust IT solutions built to last."
    },
    {
      icon: Users,
      title: "Enterprise Focus",
      description: "Specialized in serving large corporations and ambitious teams."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-block px-3 py-1 text-sm font-medium rounded-full mb-6"
                 style={{ backgroundColor: '#FF6200/10', color: '#FF6200' }}>
              About Kyndra Systems
            </div>

            <h2 className="text-4xl font-bold mb-6" style={{ color: '#000000' }}>
              Empowering Industries Through
              <span className="block" style={{ color: '#FF6200' }}>Technology Excellence</span>
            </h2>

            <p className="text-lg mb-8 leading-relaxed" style={{ color: '#A0A0A0' }}>
              At Kyndra Systems, we combine research, creativity, and technical expertise 
              to help organizations thrive in an increasingly digital world. Our mission 
              centers on creating technology experiences that people want to be part of - 
              solutions that drive both market growth and real-world impact.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                         style={{ backgroundColor: '#FF6200/10' }}>
                      <Icon className="h-6 w-6" style={{ color: '#FF6200' }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2" style={{ color: '#000000' }}>
                        {feature.title}
                      </h3>
                      <p style={{ color: '#A0A0A0' }}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br flex items-center justify-center"
                   style={{ backgroundImage: 'linear-gradient(to bottom right, #FF6200, #000000)' }}>
                <div className="text-center text-white">
                  <div className="w-32 h-32 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-6xl">🚀</span>
                  </div>
                  <h4 className="text-2xl font-semibold mb-3">
                    Innovation at Scale
                  </h4>
                  <p style={{ color: '#A0A0A0' }}>
                    Transforming enterprises through technology
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full blur-xl"
                 style={{ backgroundColor: '#FF6200/20' }}></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full blur-xl"
                 style={{ backgroundColor: '#FF6200/10' }}></div>
          </div>
        </div>

        {/* Company Vision */}
        <div className="mt-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6" style={{ color: '#000000' }}>Our Vision</h3>
            <blockquote className="text-xl italic border-l-4 pl-6"
                        style={{ color: '#A0A0A0', borderColor: '#FF6200' }}>
              "A sustainable, forward-driven society where industries thrive through IT and technology"
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;