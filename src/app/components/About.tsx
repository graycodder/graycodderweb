import React from 'react';
import { Target, Eye, Award } from 'lucide-react';
import { useTranslation } from '../../lib/i18n';

interface AboutProps {
  onAdminClick: () => void;
}

export function About({ onAdminClick }: AboutProps) {
  const { t } = useTranslation();

  const renderAddressWithClick = (addressText: string) => {
    const parts = addressText.split('KL-02-0105921');
    if (parts.length === 2) {
      return (
        <>
          {parts[0]}
          <span 
            onDoubleClick={onAdminClick} 
            className="cursor-pointer select-all font-semibold hover:text-blue-600 transition-colors"
            title="Double click to open admin panel"
          >
            KL-02-0105921
          </span>
          {parts[1]}
        </>
      );
    }
    return addressText;
  };

  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('about.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src="https://images.unsplash.com/photo-1741388505655-3322689ffad6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBpbmRpYSUyMGNvYXN0YWwlMjB2aWxsYWdlfGVufDF8fHx8MTc3MDUyMTMyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Chellanam Kerala"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              {t('about.desc1')}
            </p>

            <p className="text-gray-700 leading-relaxed">
              {t('about.desc2')}
            </p>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2">{t('about.locationTitle')}</h3>
              <p className="text-gray-700 whitespace-pre-line">
                {renderAddressWithClick(t('about.locationAddress'))}
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-4">
              <Eye className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{t('about.visionTitle')}</h3>
            <p className="text-gray-700">
              {t('about.visionDesc')}
            </p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-full mb-4">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{t('about.missionTitle')}</h3>
            <p className="text-gray-700">
              {t('about.missionDesc')}
            </p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 text-white rounded-full mb-4">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{t('about.commitmentTitle')}</h3>
            <p className="text-gray-700">
              {t('about.commitmentDesc')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
