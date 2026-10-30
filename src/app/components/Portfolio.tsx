import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Calendar } from 'lucide-react';
import { getPortfolioItems, PortfolioItem } from '../../lib/firestore';

function useScrollReveal() {
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

const categories = ['All', 'Web Development', 'Mobile App', 'E-Commerce', 'Custom Software'];

const categoryLabels: Record<string, string> = {
  'All': 'All',
  'Web Development': 'Web',
  'Mobile App': 'Mobile',
  'E-Commerce': 'E-Commerce',
  'Custom Software': 'Custom',
};

export function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const titleRef = useScrollReveal();
  const gridRef = useScrollReveal();

  useEffect(() => {
    getPortfolioItems()
      .then(setItems)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredItems =
    selectedCategory === 'All'
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <section id="portfolio" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div ref={titleRef} className="mb-12 text-center">
          <span
            className="mb-3 inline-block rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-teal-700"
            style={{ backgroundColor: '#d4eaea' }}
          >
            Our Work
          </span>
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Portfolio</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-slate-500">
            A selection of AI-powered products and platforms we've built for our clients.
          </p>
        </div>

        {/* Filter pills */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white'
                  : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-20 text-center text-sm text-slate-400">Loading projects…</div>
        ) : (
          <div ref={gridRef} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 rounded-full bg-teal-600 px-3 py-0.5 text-xs font-semibold text-white">
                    {categoryLabels[item.category] || item.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="mb-1.5 font-bold text-slate-900">{item.title}</h3>
                  <p className="mb-4 line-clamp-2 text-sm text-slate-500">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Calendar className="h-3.5 w-3.5" />
                      {item.date}
                    </div>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors"
                      >
                        View Project
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredItems.length === 0 && (
          <div className="py-16 text-center text-sm text-slate-400">
            No projects in this category yet.
          </div>
        )}
      </div>
    </section>
  );
}
