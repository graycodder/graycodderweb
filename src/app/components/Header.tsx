import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation, languages } from '../../lib/i18n';

interface HeaderProps {
  onNavigate: (section: string) => void;
}

export function Header({ onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useTranslation();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const currentLangConfig = languages.find(l => l.code === language) || languages[0];

  const navItems = [
    { label: t('nav.home'), section: 'home' },
    { label: t('nav.about'), section: 'about' },
    { label: t('nav.services'), section: 'services' },
    { label: t('nav.portfolio'), section: 'portfolio' },
    { label: t('nav.blog'), section: 'blog' },
    { label: t('nav.contact'), section: 'contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="text-2xl font-bold text-blue-600">Graycodder Business Consultants</div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => onNavigate(item.section)}
                className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center space-x-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-blue-600 border rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span>{currentLangConfig.flag}</span>
                <span>{currentLangConfig.name}</span>
              </button>

              {langDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setLangDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors cursor-pointer ${
                          language === lang.code ? 'text-blue-600 font-semibold bg-blue-50/50' : 'text-gray-700'
                        }`}
                      >
                        <span className="mr-2">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => {
                  onNavigate(item.section);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                {item.label}
              </button>
            ))}

            {/* Mobile Language Selector */}
            <div className="px-4 py-2 border-t border-gray-100 mt-2">
              <div className="text-xs text-gray-400 font-semibold mb-2">Language</div>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center px-3 py-2 text-sm border rounded-md cursor-pointer ${
                      language === lang.code 
                        ? 'border-blue-600 bg-blue-50 text-blue-600 font-semibold' 
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="mr-1.5">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
