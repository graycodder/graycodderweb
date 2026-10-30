import React, { useEffect, useRef } from 'react';
import { Brain, Globe, Smartphone, Lightbulb, Code, Headphones, CheckCircle } from 'lucide-react';

function useScrollReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(32px)';
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            if (el) {
              el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            }
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return ref;
}

const services = [
  {
    icon: Brain,
    title: 'AI & LLM Integration',
    description:
      'Embed large language models into your business workflows — chatbots, copilots, document intelligence, and custom fine-tuned models.',
    features: [
      'Custom LLM fine-tuning',
      'RAG pipelines',
      'AI chatbots & copilots',
      'Document intelligence',
    ],
  },
  {
    icon: Globe,
    title: 'Web Application Development',
    description:
      'Full-stack web applications built for scale — from SaaS platforms to internal business tools.',
    features: [
      'React / Next.js frontends',
      'Node.js & Python backends',
      'REST & GraphQL APIs',
      'Firebase & cloud hosting',
    ],
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description:
      'Cross-platform mobile experiences with native performance, built with Flutter and React Native.',
    features: [
      'Flutter (iOS & Android)',
      'React Native',
      'Offline-first architecture',
      'Push notifications & realtime',
    ],
  },
  {
    icon: Code,
    title: 'Process Automation',
    description:
      'Eliminate repetitive tasks with intelligent RPA, workflow orchestration, and system integration.',
    features: [
      'RPA & workflow bots',
      'API integrations',
      'Data pipeline automation',
      'Scheduled intelligence tasks',
    ],
  },
  {
    icon: Lightbulb,
    title: 'AI Strategy & Consulting',
    description:
      'Navigate the AI landscape with expert guidance — from ideation to a concrete, ROI-driven roadmap.',
    features: [
      'AI readiness assessment',
      'Use case discovery',
      'Technology selection',
      'Implementation roadmap',
    ],
  },
  {
    icon: Headphones,
    title: 'Maintenance & Support',
    description:
      'Dedicated post-launch support, monitoring, and continuous improvement to keep your systems running at peak.',
    features: [
      '24/7 monitoring',
      'Performance optimisation',
      'Security patching',
      'Feature iterations',
    ],
  },
];

/* Individual service card — each in its own component so hooks are legal */
function ServiceCard({
  service,
  delay,
}: {
  service: (typeof services)[0];
  delay: number;
}) {
  const ref = useScrollReveal(delay);
  const { icon: Icon, title, description, features } = service;

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="grid grid-cols-1 items-center md:grid-cols-[2fr_3fr]">
        <div className="p-8">
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900">
            <Icon className="h-[18px] w-[18px] text-white" />
          </div>
          <h3 className="mb-2 text-lg font-bold text-slate-900">{title}</h3>
          <p className="mb-5 text-sm leading-relaxed text-slate-500">{description}</p>
          <ul className="space-y-2">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-slate-700">
                <CheckCircle className="h-4 w-4 shrink-0 text-teal-600" />
                {f}
              </li>
            ))}
          </ul>
        </div>
        {/* Decorative right panel */}
        <div
          className="hidden md:flex h-full min-h-[220px] border-l border-slate-200 items-center justify-center relative overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, #e4f0f8 0%, #f0f6fc 50%, #e8f4ef 100%)',
          }}
        >
          <Icon className="w-36 h-36 text-slate-200" />
        </div>
      </div>
    </div>
  );
}

export function Services() {
  const titleRef = useScrollReveal();

  return (
    <section
      id="services"
      className="py-24"
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f0f6fc 100%)',
      }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Title */}
        <div ref={titleRef} className="mb-14 text-center">
          <span
            className="mb-3 inline-block rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-teal-700"
            style={{ backgroundColor: '#d4eaea' }}
          >
            What We Build
          </span>
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Our Services</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-slate-500">
            End-to-end AI and software services designed for businesses that want to move
            fast and scale sustainably.
          </p>
        </div>

        {/* Service cards */}
        <div className="space-y-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} delay={i * 60} />
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-14 rounded-xl bg-slate-900 p-10 text-center text-white">
          <h3 className="mb-3 text-2xl font-bold">Ready to build something intelligent?</h3>
          <p className="mb-6 mx-auto max-w-md text-sm text-slate-400">
            Tell us about your project and we'll put together a clear, actionable plan — no sales
            pitch, just solutions.
          </p>
          <button
            onClick={() =>
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="rounded-full bg-teal-500 px-8 py-2.5 text-sm font-semibold text-white hover:bg-teal-400 transition-colors cursor-pointer"
          >
            Start a Conversation
          </button>
        </div>
      </div>
    </section>
  );
}
