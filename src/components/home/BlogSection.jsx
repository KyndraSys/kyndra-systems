import React from 'react';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';
import { blogPosts } from '../../data/blog';

const BlogSection = () => {
  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <section className="py-20" style={{ backgroundColor: '#000000' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 text-sm font-medium rounded-full border mb-4"
               style={{ 
                 backgroundColor: '#FF6200/20', 
                 color: '#FF6200', 
                 borderColor: '#FF6200/30' 
               }}>
            Innovation Insights
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Latest in Enterprise Technology
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: '#A0A0A0' }}>
            Stay informed with insights on digital transformation, enterprise solutions, 
            and technology trends shaping the future of business.
          </p>
        </div>

        {/* Featured Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredPosts.map((post) => (
            <article key={post.id} className="group cursor-pointer">
              <div className="rounded-xl overflow-hidden transition-all duration-300 border hover:opacity-90"
                   style={{ 
                     backgroundColor: '#A0A0A0/10', 
                     borderColor: '#A0A0A0/20' 
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.borderColor = '#FF6200/50';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.borderColor = '#A0A0A0/20';
                   }}>
                {/* Image */}
                <div className="aspect-video bg-gradient-to-br flex items-center justify-center"
                     style={{ backgroundImage: 'linear-gradient(to bottom right, #FF6200, #000000)' }}>
                  <div className="text-center text-white">
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">📊</span>
                    </div>
                    <p className="text-sm opacity-80">Article Preview</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center text-sm mb-3 space-x-4" style={{ color: '#A0A0A0' }}>
                    <span className="text-white px-2 py-1 rounded text-xs font-medium"
                          style={{ backgroundColor: '#FF6200' }}>
                      {post.category}
                    </span>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:transition-colors leading-tight"
                      onMouseEnter={(e) => {
                        e.target.style.color = '#FF6200';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = '#ffffff';
                      }}>
                    {post.title}
                  </h3>

                  <p className="mb-4 leading-relaxed" style={{ color: '#A0A0A0' }}>
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm" style={{ color: '#A0A0A0' }}>
                      <User className="h-4 w-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center text-sm" style={{ color: '#A0A0A0' }}>
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button className="text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center mx-auto group hover:opacity-90"
                  style={{ backgroundColor: '#FF6200' }}>
            View All Articles
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;