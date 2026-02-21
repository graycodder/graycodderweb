import React from 'react';
import { Globe, Smartphone, Lightbulb, Code, Rocket, Headphones } from 'lucide-react';

export function Services() {
  const services = [
    {
      icon: Globe,
      title: 'Website Development',
      description: 'Custom, responsive websites built with modern technologies. From simple landing pages to complex web applications.',
      features: ['Custom Design', 'Responsive Layout', 'SEO Optimized', 'Fast Performance']
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android that deliver exceptional user experiences.',
      features: ['iOS & Android', 'Cross-Platform', 'User-Friendly UI', 'Scalable Architecture']
    },
    {
      icon: Lightbulb,
      title: 'Business Ideas & Planning',
      description: 'Strategic business planning and technical consulting to transform your ideas into successful digital products.',
      features: ['Market Analysis', 'Technical Strategy', 'Project Planning', 'ROI Optimization']
    },
    {
      icon: Code,
      title: 'Custom Software Solutions',
      description: 'Tailored software solutions designed to meet your specific business requirements and workflows.',
      features: ['Custom Development', 'API Integration', 'Database Design', 'Cloud Solutions']
    },
    {
      icon: Rocket,
      title: 'Digital Transformation',
      description: 'Help businesses modernize their operations and embrace digital technologies for growth and efficiency.',
      features: ['Process Automation', 'Legacy Migration', 'Cloud Adoption', 'Digital Strategy']
    },
    {
      icon: Headphones,
      title: 'Ongoing Support & Maintenance',
      description: 'Comprehensive support and maintenance services to keep your applications running smoothly.',
      features: ['24/7 Support', 'Bug Fixes', 'Updates & Upgrades', 'Performance Monitoring']
    }
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            End-to-end technical solutions to improve and grow your business
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 text-blue-600 rounded-lg mb-4">
                <service.icon className="w-7 h-7" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Transform Your Business?
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Let's discuss how we can help you achieve your business goals with our technical expertise.
          </p>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Us Today
          </button>
        </div>
      </div>
    </section>
  );
}
