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
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1627599936744-51d288f89af4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMHRlYW0lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzcwNDE5MzA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Web Development Team"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-600 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-indigo-600 rounded-full opacity-20 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
