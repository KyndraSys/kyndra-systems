import React, { useState, useMemo } from 'react';
import { 
  ChevronRight, 
  ArrowRight, 
  Calendar,
  User,
  Tag,
  Search,
  Filter,
  Globe,
  Code,
  Palette,
  Smartphone,
  TrendingUp,
  Users,
  Award,
  ExternalLink,
  Clock,
  Monitor,
  ShoppingCart,
  Cpu,
  Database,
  Layers,
  MessageCircle
} from 'lucide-react';

const HeroProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [isTouched, setIsTouched] = useState(false);

  const featuredProducts = [
    {
      id: 1,
      title: 'Enterprise Web Applications with Scalable Architecture',
      excerpt: 'Build robust, enterprise-grade web applications that handle massive traffic and complex business logic with cutting-edge technology stacks and cloud-native solutions.',
      category: 'Web Solutions',
      author: 'Development Team',
      date: '2025-07-20',
      readTime: 'Custom Built',
      image: '/api/placeholder/600/400',
      featured: true,
      tags: ['React', 'Node.js', 'Cloud-Native', 'Scalable'],
      icon: <Globe className="h-6 w-6 text-white" />,
      deliverables: ['Custom Web App', 'Admin Dashboard', 'API Integration', 'Cloud Deployment']
    },
    {
      id: 2,
      title: 'Professional Brand Identity & Visual Design Systems',
      excerpt: 'Create compelling brand identities and comprehensive visual design systems that communicate your message effectively across all digital and print platforms.',
      category: 'Graphics & Design',
      author: 'Design Team',
      date: '2025-07-18',
      readTime: 'Creative Process',
      image: '/api/placeholder/600/400',
      featured: true,
      tags: ['Branding', 'Logo Design', 'Visual Identity', 'Print Design'],
      icon: <Palette className="h-6 w-6 text-white" />,
      deliverables: ['Logo Design', 'Brand Guidelines', 'Business Cards', 'Digital Assets']
    }
  ];

  const allProducts = [
    {
      id: 3,
      title: 'E-commerce Platform Development',
      excerpt: 'Complete online store solutions with payment integration, inventory management, and customer analytics for growing businesses.',
      category: 'Web Solutions', 
      author: 'E-commerce Team',
      date: '2025-07-15',
      readTime: 'Full-Stack',
      image: '/api/placeholder/400/300',
      tags: ['E-commerce', 'Payment Gateway', 'Analytics'],
      icon: <ShoppingCart className="h-5 w-5 text-white" />,
      deliverables: ['Online Store', 'Payment Integration', 'Admin Panel']
    },
    {
      id: 4,
      title: 'iOS & Android Mobile Applications',
      excerpt: 'Native and cross-platform mobile applications that deliver exceptional user experiences and seamless performance across devices.',
      category: 'Mobile Apps',
      author: 'Mobile Team',
      date: '2025-07-12',
      readTime: 'Cross-Platform',
      image: '/api/placeholder/400/300',
      tags: ['iOS', 'Android', 'React Native', 'Flutter'],
      icon: <Smartphone className="h-5 w-5 text-white" />,
      deliverables: ['Mobile App', 'App Store Deployment', 'Push Notifications']
    },
    {
      id: 5,
      title: 'Custom Software Solutions',
      excerpt: 'Tailored software applications designed to solve specific business challenges and streamline operational workflows.',
      category: 'Web Solutions',
      author: 'Software Team',
      date: '2025-07-10',
      readTime: 'Enterprise',
      image: '/api/placeholder/400/300',
      tags: ['Custom Software', 'Business Logic', 'Automation'],
      icon: <Cpu className="h-5 w-5 text-white" />,
      deliverables: ['Custom Application', 'User Training', 'Technical Support']
    },
    {
      id: 6,
      title: 'UI/UX Design & Prototyping',
      excerpt: 'User-centered design solutions that create intuitive interfaces and exceptional user experiences for digital products.',
      category: 'Graphics & Design',
      author: 'UX Team',
      date: '2025-07-08',
      readTime: 'Design Process',
      image: '/api/placeholder/400/300',
      tags: ['UI Design', 'UX Research', 'Prototyping', 'User Testing'],
      icon: <Monitor className="h-5 w-5 text-white" />,
      deliverables: ['Design System', 'Interactive Prototypes', 'User Testing']
    },
    {
      id: 7,
      title: 'Progressive Web Applications (PWA)',
      excerpt: 'Modern web applications that work offline, load instantly, and provide native app-like experiences across all devices.',
      category: 'Web Solutions',
      author: 'PWA Team',
      date: '2025-07-05',
      readTime: 'Modern Web',
      image: '/api/placeholder/400/300',
      tags: ['PWA', 'Offline Support', 'Performance', 'Mobile-First'],
      icon: <Layers className="h-5 w-5 text-white" />,
      deliverables: ['PWA Application', 'Offline Functionality', 'Performance Optimization']
    },
    {
      id: 8,
      title: 'Database Design & Management',
      excerpt: 'Robust database solutions with optimal performance, security, and scalability for your business data requirements.',
      category: 'Web Solutions',
      author: 'Database Team',
      date: '2025-07-03',
      readTime: 'Data Architecture',
      image: '/api/placeholder/400/300',
      tags: ['Database Design', 'Performance', 'Security', 'Backup'],
      icon: <Database className="h-5 w-5 text-white" />,
      deliverables: ['Database Schema', 'Performance Tuning', 'Backup Strategy']
    }
  ];

  // Filter products based on search term and category
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;
    
    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (activeCategory !== 'all') {
      const categoryMap = {
        'web': 'Web Solutions',
        'mobile': 'Mobile Apps',
        'graphics': 'Graphics & Design'
      };
      filtered = filtered.filter(product => product.category === categoryMap[activeCategory]);
    }
    
    return filtered;
  }, [searchTerm, activeCategory]);

  // Filter featured products based on search term
  const filteredFeaturedProducts = useMemo(() => {
    if (!searchTerm.trim()) return featuredProducts;
    
    return featuredProducts.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Calculate dynamic category counts based on current search
  const categories = useMemo(() => {
    let productsToCount = allProducts;
    
    // If there's a search term, filter first
    if (searchTerm.trim()) {
      productsToCount = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    const webCount = productsToCount.filter(p => p.category === 'Web Solutions').length;
    const mobileCount = productsToCount.filter(p => p.category === 'Mobile Apps').length;
    const graphicsCount = productsToCount.filter(p => p.category === 'Graphics & Design').length;
    
    return [
      { id: 'all', name: 'All Products', count: productsToCount.length },
      { id: 'web', name: 'Web Solutions', count: webCount },
      { id: 'mobile', name: 'Mobile Apps', count: mobileCount },
      { id: 'graphics', name: 'Graphics & Design', count: graphicsCount }
    ];
  }, [searchTerm]);

  const stats = [
    { number: '200+', label: 'Projects delivered successfully', icon: Award },
    { number: '50+', label: 'Enterprise clients served', icon: Users },
    { number: '15+', label: 'Countries with active projects', icon: Globe },
    { number: '99.9%', label: 'Client satisfaction rate', icon: TrendingUp }
  ];

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://l0kbxarjd9.ufs.sh/f/GBNtWc6jN1ySaInCPxE4wku0rKB1z9o2MASeiNXltdGjnOYF')`
            }}
          ></div>
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-70"></div>
          {/* Additional tech pattern overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='1200' height='600' viewBox='0 0 1200 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='tech-pattern' x='0' y='0' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='50' cy='50' r='2' fill='%23ffffff' fill-opacity='0.1'/%3E%3Cpath d='M50 20v60M20 50h60' stroke='%23ffffff' stroke-width='0.5' stroke-opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='1200' height='600' fill='url(%23tech-pattern)'/%3E%3C/svg%3E")`
            }}
          ></div>
        </div>

        {/* Main Content */}
        <div className="relative z-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="flex items-center mb-4">
                <div className="flex items-center text-sm font-medium" style={{ color: '#FF6200' }}>
                  <Code className="h-4 w-4 mr-2" />
                  SOFTWARE DEVELOPMENT • GRAPHICS DESIGN • DIGITAL SOLUTIONS
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
                Scalable Digital{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r font-normal"
                      style={{ backgroundImage: 'linear-gradient(135deg, #FF6200 0%, #ff8c42 100%)' }}>
                  Architecture
                </span>
              </h1>
              
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                We build robust, enterprise-grade applications and compelling visual designs with cutting-edge technology stacks and innovative creative solutions.
              </p>

              <div className="flex items-center space-x-4">
                <button 
                  onClick={scrollToProducts}
                  className="text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center group"
                  style={{ backgroundColor: '#FF6200' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#e55a00'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#FF6200'}
                  >
                  Explore Products
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button 
                  onClick={() => window.location.href = '../../onboard'}
                  className="border text-slate-300 hover:text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center gap-2"
                  style={{ borderColor: '#FF6200' }}>
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section id="products-section" className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:border-blue-500"
                style={{ '--tw-ring-color': '#27397d' }}
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-1 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeCategory === category.id
                      ? 'text-white'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  style={{
                    backgroundColor: activeCategory === category.id ? '#000000' : 'transparent',
                    borderColor: activeCategory === category.id ? '#FF6200' : 'transparent'
                  }}>
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {(!searchTerm.trim() || filteredFeaturedProducts.length > 0) && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-normal mb-4" style={{ color: '#27397d' }}>
                Featured Products
              </h2>
              <p className="text-lg" style={{ color: '#A0A0A0' }}>
                Our flagship software solutions and design services that drive digital transformation
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {filteredFeaturedProducts.map((product) => (
                <article key={product.id} className="group cursor-pointer">
                  <div className="bg-gray-100 rounded-lg aspect-video mb-6 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center"
                         style={{ background: 'linear-gradient(135deg, #a0a0a0 0%, #a0a0a0 100%)' }}>
                      <div className="text-center text-white">
                        {product.icon}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-sm space-x-4" style={{ color: '#A0A0A0' }}>
                      <span className="text-white px-2 py-1 rounded text-xs font-medium"
                            style={{ backgroundColor: '#FF6200' }}>
                        {product.category}
                      </span>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(product.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {product.readTime}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-medium group-hover:transition-colors leading-tight"
                        style={{ color: '#27397d' }}
                        onMouseEnter={(e) => e.target.style.color = '#FF6200'}
                        onMouseLeave={(e) => e.target.style.color = '#27397d'}>
                      {product.title}
                    </h3>
                    
                    <p className="leading-relaxed" style={{ color: '#A0A0A0' }}>
                      {product.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm" style={{ color: '#A0A0A0' }}>
                        <User className="h-4 w-4 mr-1" />
                        {product.author}
                      </div>
                      
                      <div className="flex items-center text-sm font-medium group-hover:opacity-80"
                           style={{ color: '#FF6200' }}>
                        View Product
                        <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-normal mb-4" style={{ color: '#27397d' }}>
              All Products
            </h2>
            <p className="text-lg" style={{ color: '#A0A0A0' }}>
              Explore our comprehensive suite of software solutions and design services
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your search terms or category filter</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <article key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                  <div className="bg-gray-100 aspect-video overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center"
                         style={{ background: 'linear-gradient(135deg, #000000 0%, #000000 100%)' }}>
                      <div className="text-center text-white">
                        {product.icon}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="flex items-center text-xs space-x-3" style={{ color: '#A0A0A0' }}>
                      <span className="text-white px-2 py-1 rounded font-medium"
                            style={{ backgroundColor: '#FF6200' }}>
                        {product.category}
                      </span>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(product.date).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-medium group-hover:transition-colors leading-tight"
                        style={{ color: '#27397d' }}
                        onMouseEnter={(e) => e.target.style.color = '#FF6200'}
                        onMouseLeave={(e) => e.target.style.color = '#27397d'}>
                      {product.title}
                    </h3>
                    
                    <p className="text-sm leading-relaxed" style={{ color: '#A0A0A0' }}>
                      {product.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div className="flex items-center text-xs" style={{ color: '#A0A0A0' }}>
                        <User className="h-3 w-3 mr-1" />
                        {product.author}
                      </div>
                      
                      <div className="flex items-center text-xs" style={{ color: '#A0A0A0' }}>
                        <Clock className="h-3 w-3 mr-1" />
                        {product.readTime}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {product.tags.map((tag) => (
                        <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Load More */}
          <div className="text-center mt-12">
            <button
              className="text-white px-8 py-3 rounded-md font-medium transition-colors flex items-center mx-auto group"
              style={{ backgroundColor: '#000000' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#27397d'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#000000'}
              onClick={() => window.open('https://wa.me/254113904796', '_blank')}
            >
            Still looking? We can assist!
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-100/30 to-green-100/30 rounded-3xl transform rotate-6"></div>
              <img
                src="https://l0kbxarjd9.ufs.sh/f/GBNtWc6jN1ySZ91OlpaEzc7GVDojg3mw5kqQLMpP0W8JyCba"
                alt="Global STEM Network"
                className="relative z-10 w-full rounded-2xl shadow-2xl"
              />
            </div>
            <div>
              <h2 className="text-5xl font-light mb-8 leading-tight" style={{ color: '#27397d' }}>
                Ready to <span className="font-semibold" style={{ color: '#FF6200' }}>transform</span> your digital vision?
              </h2>
              <p className="text-xl mb-8 leading-relaxed" style={{ color: '#A0A0A0' }}>
                Get expert software development and graphics design solutions tailored to your business needs. Through innovative technologies, creative design approaches, and strategic partnerships, we help securely connect your business to digital excellence. Let's build something amazing together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
<button
  className="text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center w-full group sm:px-8 sm:py-4"
  style={{ backgroundColor: '#27397d' }}
  onMouseEnter={(e) => e.target.style.backgroundColor = '#1e40af'}
  onMouseLeave={(e) => e.target.style.backgroundColor = '#27397d'}
  onTouchStart={(e) => e.target.style.backgroundColor = '#1e40af'}
  onTouchEnd={(e) => e.target.style.backgroundColor = '#27397d'}
  onClick={() => window.location.href = '../../onboard'}
>
  <span className="text-base sm:text-lg mr-2">Get Started</span>
  <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:translate-x-1 flex-shrink-0" />
</button>
              </div>
              <p className="text-sm" style={{ color: '#A0A0A0' }}>
                Join 200+ satisfied clients. Free consultation included.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroProductsSection;