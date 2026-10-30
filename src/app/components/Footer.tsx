import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react';

interface FooterProps {
  onAdminClick: () => void;
}

const navLinks = [
  { label: 'About', section: 'about' },
  { label: 'Services', section: 'services' },
  { label: 'Portfolio', section: 'portfolio' },
  { label: 'Blog', section: 'blog' },
  { label: 'Contact', section: 'contact' },
];

export function Footer({ onAdminClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const scrollTo = (section: string) => {
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 bg-white">
      {/* Get in touch banner */}
      <div className="border-b border-slate-200 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-xl border border-slate-200 bg-white p-10 shadow-sm">
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
              <div>
                <h2 className="mb-2 text-3xl font-bold text-slate-900">Get in touch</h2>
                <p className="text-sm text-slate-500">
                  Ready to build something intelligent? We'd love to hear about your project.
                </p>
              </div>
              <div className="flex flex-col items-start gap-3 md:items-end">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-slate-700" />
                  <a
                    href="mailto:graycodder@graycodder.com"
                    className="text-lg font-bold text-slate-900 hover:text-teal-600 transition-colors"
                  >
                    graycodder@graycodder.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Active Support Channels
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-4 py-6 sm:px-6 md:flex-row">
        <div>
          <p className="text-sm font-bold text-slate-900">
            Graycodder<span className="text-teal-600">.ai</span>
          </p>
          <p className="text-xs text-slate-400">
            © {currentYear} Graycodder · Reg No:{' '}
            <span
              onDoubleClick={onAdminClick}
              className="cursor-pointer font-semibold select-all hover:text-teal-600 transition-colors"
              title="Double click to open admin panel"
            >
              KL-02-0105921
            </span>{' '}
            · Enterprise AI Solutions
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-6">
          {navLinks.map(({ label, section }) => (
            <button
              key={section}
              onClick={() => scrollTo(section)}
              className="text-xs text-slate-500 transition-colors hover:text-slate-900 cursor-pointer"
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
            <Linkedin className="h-4 w-4" />
          </a>
          <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
            <Twitter className="h-4 w-4" />
          </a>
          <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
