import React, { useEffect, useRef } from 'react';
import { MapPin, Globe, Target, Eye, Award } from 'lucide-react';

interface AboutProps {
  onAdminClick: () => void;
}

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(32px)';
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return ref;
}

export function About({ onAdminClick }: AboutProps) {
  const storyRef = useScrollReveal();
  const pillarsRef = useScrollReveal();

  const pillars = [
    {
      icon: Eye,
      title: 'Our Vision',
      description:
        'To be the leading AI engineering partner for businesses in South Asia and beyond — delivering software that learns, adapts, and scales.',
      color: 'bg-teal-600',
    },
    {
      icon: Target,
      title: 'Our Mission',
      description:
        'Make enterprise-grade AI accessible to every growing business — from intelligent automation to custom LLM integrations.',
      color: 'bg-slate-900',
    },
    {
      icon: Award,
      title: 'Our Commitment',
      description:
        'Transparent delivery, production-quality code, and ongoing support. We\'re long-term partners, not one-time vendors.',
      color: 'bg-teal-700',
    },
  ];

  return (
    <section id="about" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Story */}
        <div ref={storyRef} className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
          <div>
            <h2 className="mb-5 text-2xl font-bold text-slate-900">Our Story</h2>
            <p className="mb-4 text-sm leading-loose text-slate-600">
              Founded in Chellanam, Kerala, Graycodder.ai was built by engineers who saw the gap
              between AI hype and real business outcomes. We specialise in translating cutting-edge
              AI research into production systems that your operations can rely on.
            </p>
            <p className="mb-6 text-sm leading-loose text-slate-600">
              From natural language interfaces to end-to-end ML pipelines, our team brings
              deep expertise across the full AI stack — building tools that actually work in the
              real world.
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <MapPin className="h-4 w-4 shrink-0 text-teal-600" />
                <span>
                  <span
                    onDoubleClick={onAdminClick}
                    className="cursor-pointer font-semibold hover:text-teal-600 transition-colors select-all"
                    title="Double click to open admin panel"
                  >
                    KL-02-0105921
                  </span>
                  &nbsp;· Kochi, Kerala
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <Globe className="h-4 w-4 shrink-0 text-teal-600" />
                <span>Serving Clients Globally</span>
              </div>
            </div>
          </div>

          <div className="relative h-80 overflow-hidden rounded-2xl shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1741388505655-3322689ffad6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900"
              alt="Chellanam Kerala"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
          </div>
        </div>

        {/* Pillars */}
        <div ref={pillarsRef} className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, description, color }) => (
            <div
              key={title}
              className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg ${color}`}
              >
                <Icon className="h-[18px] w-[18px] text-white" />
              </div>
              <h3 className="mb-2 text-base font-bold text-slate-900">{title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
