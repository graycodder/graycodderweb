import React, { useEffect, useRef } from 'react';
import { ArrowRight, Cpu, Zap, Shield } from 'lucide-react';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const badgeRef = useRef<HTMLSpanElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [badgeRef, h1Ref, pRef, ctaRef, statsRef];
    els.forEach((ref, i) => {
      if (ref.current) {
        ref.current.style.opacity = '0';
        ref.current.style.transform = 'translateY(20px)';
        setTimeout(() => {
          if (ref.current) {
            ref.current.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
            ref.current.style.opacity = '1';
            ref.current.style.transform = 'translateY(0)';
          }
        }, 100 + i * 150);
      }
    });
  }, []);

  const stats = [
    { val: '5+', label: 'Years Experience' },
    { val: '50+', label: 'Projects Delivered' },
    { val: '30+', label: 'Clients Served' },
  ];

  const pills = [
    { icon: Cpu, text: 'AI & Machine Learning' },
    { icon: Zap, text: 'Process Automation' },
    { icon: Shield, text: 'Enterprise Grade' },
  ];

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-16"
      style={{
        background:
          'linear-gradient(180deg, #c8dcea 0%, #d8e8f4 20%, #e4eff7 50%, #eef5fb 75%, #ffffff 100%)',
      }}
    >
      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 pb-24 pt-16 text-center">
        <span
          ref={badgeRef}
          className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-teal-700"
          style={{ backgroundColor: '#d4eaea' }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
          Enterprise AI Solutions
        </span>

        <h1
          ref={h1Ref}
          className="mb-6 text-5xl font-black leading-[1.1] tracking-tight text-slate-900 md:text-6xl lg:text-7xl"
        >
          Intelligent Software.{' '}
          <span className="text-teal-600">Powered by AI.</span>
        </h1>

        <p
          ref={pRef}
          className="mb-10 max-w-xl text-[15px] leading-relaxed text-slate-500"
        >
          Graycodder.ai builds bespoke AI-powered software, automation systems, and
          enterprise-grade platforms for businesses ready to operate at the next level.
        </p>

        <div ref={ctaRef} className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Explore Services
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/60 backdrop-blur-sm px-6 py-2.5 text-sm font-semibold text-slate-700 hover:bg-white hover:border-slate-400 transition-colors cursor-pointer"
          >
            Talk to Us
          </button>
        </div>

        {/* Feature pills */}
        <div className="mt-12 flex flex-wrap gap-3 justify-center">
          {pills.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/60 backdrop-blur-sm px-4 py-2 text-xs font-medium text-slate-600"
            >
              <Icon className="w-3.5 h-3.5 text-teal-600" />
              {text}
            </div>
          ))}
        </div>

        {/* Stats */}
        <div ref={statsRef} className="mt-16 flex gap-12 justify-center">
          {stats.map(({ val, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-black text-slate-900">{val}</div>
              <div className="mt-1 text-xs text-slate-500 font-medium">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
