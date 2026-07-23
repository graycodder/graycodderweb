import React from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from '../../lib/i18n';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const { t } = useTranslation();

  return (
    <section id="home" className="relative pt-20 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm">
              {t('hero.excellence')}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              {t('hero.title')}
            </h1>
            
            <p className="text-xl text-gray-600">
              {t('hero.description')}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                onClick={() => onNavigate('services')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {t('hero.servicesBtn')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => onNavigate('contact')}
              >
                {t('hero.contactBtn')}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div>
                <div className="text-3xl font-bold text-blue-600">{t('hero.experienceVal')}</div>
                <div className="text-sm text-gray-600">{t('hero.experienceLabel')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">{t('hero.projectsVal')}</div>
                <div className="text-sm text-gray-600">{t('hero.projectsLabel')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">{t('hero.clientsVal')}</div>
                <div className="text-sm text-gray-600">{t('hero.clientsLabel')}</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl border border-blue-500/20">
              <img
                src="/ai_enterprise_hero.png"
                alt="Enterprise AI Operations & Business Automation"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Floating AI Badge Overlay */}
            <div className="absolute -bottom-5 -left-5 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-100/80 flex items-center space-x-3 hidden.sm:flex">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-blue-500/30">
                AI
              </div>
              <div>
                <div className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">Enterprise Partner</div>
                <div className="text-sm font-extrabold text-gray-900">100% Business Automation</div>
              </div>
            </div>
            {/* Decorative Glow elements */}
            <div className="absolute -top-6 -right-6 w-28 h-28 bg-blue-600 rounded-full opacity-25 blur-2xl pointer-events-none"></div>
            <div className="absolute -bottom-6 -left-6 w-36 h-36 bg-indigo-600 rounded-full opacity-25 blur-2xl pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
