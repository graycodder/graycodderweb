import React from 'react';
import { Globe, Smartphone, Lightbulb, Code, Rocket, Headphones } from 'lucide-react';
import { useTranslation } from '../../lib/i18n';

export function Services() {
  const { t } = useTranslation();

  const services = [
    {
      icon: Globe,
      title: t('services.web.title'),
      description: t('services.web.description'),
      features: [
        t('services.web.f1'),
        t('services.web.f2'),
        t('services.web.f3'),
        t('services.web.f4')
      ]
    },
    {
      icon: Smartphone,
      title: t('services.mobile.title'),
      description: t('services.mobile.description'),
      features: [
        t('services.mobile.f1'),
        t('services.mobile.f2'),
        t('services.mobile.f3'),
        t('services.mobile.f4')
      ]
    },
    {
      icon: Lightbulb,
      title: t('services.ideas.title'),
      description: t('services.ideas.description'),
      features: [
        t('services.ideas.f1'),
        t('services.ideas.f2'),
        t('services.ideas.f3'),
        t('services.ideas.f4')
      ]
    },
    {
      icon: Code,
      title: t('services.software.title'),
      description: t('services.software.description'),
      features: [
        t('services.software.f1'),
        t('services.software.f2'),
        t('services.software.f3'),
        t('services.software.f4')
      ]
    },
    {
      icon: Rocket,
      title: t('services.digital.title'),
      description: t('services.digital.description'),
      features: [
        t('services.digital.f1'),
        t('services.digital.f2'),
        t('services.digital.f3'),
        t('services.digital.f4')
      ]
    },
    {
      icon: Headphones,
      title: t('services.support.title'),
      description: t('services.support.description'),
      features: [
        t('services.support.f1'),
        t('services.support.f2'),
        t('services.support.f3'),
        t('services.support.f4')
      ]
    }
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('services.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('services.subtitle')}
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
            {t('services.readyTitle')}
          </h3>
          <p className="text-lg mb-6 opacity-90">
            {t('services.readyDesc')}
          </p>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
          >
            {t('services.contactBtn')}
          </button>
        </div>
      </div>
    </section>
  );
}
