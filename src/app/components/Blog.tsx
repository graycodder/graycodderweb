import React, { useEffect, useState } from 'react';
import { Calendar, User, ArrowRight, Share2, Link, Facebook, Twitter, Linkedin } from 'lucide-react';
import { getBlogs, BlogPost } from '../../lib/firestore';
import { useTranslation } from '../../lib/i18n';
import { toast } from 'sonner';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.63 2.052 14.185.8 11.994.8c-5.437 0-9.863 4.373-9.867 9.801 0 1.993.521 3.94 1.508 5.662l-.999 3.65 3.79-.994zm11.366-5.64c-.312-.156-1.848-.91-2.137-1.014-.29-.104-.5-.156-.71.156-.21.312-.813 1.014-.995 1.22-.18.21-.363.234-.675.078-2.585-1.295-4.225-3.37-4.805-4.371-.3-.518-.032-.8.228-1.06.234-.234.312-.312.416-.468.104-.156.052-.29-.026-.446-.079-.156-.71-1.713-.973-2.348-.255-.614-.515-.531-.71-.541-.18-.01-.39-.01-.599-.01-.21 0-.552.078-.84.39-.29.312-1.104 1.08-1.104 2.633 0 1.554 1.13 3.057 1.285 3.266.156.21 2.222 3.393 5.383 4.76.752.324 1.34.518 1.797.663.755.24 1.443.207 1.986.126.607-.09 1.848-.754 2.11-1.48.26-.727.26-1.35.18-1.48-.08-.13-.29-.21-.6-.366z"/>
  </svg>
);

export function Blog() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getBlogs();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section id="blog" className="py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
          <p className="text-sm text-slate-400">Loading articles…</p>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-24 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <span
            className="mb-3 inline-block rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-teal-700"
            style={{ backgroundColor: '#d4eaea' }}
          >
            Insights
          </span>
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
            {t('blog.title')}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-slate-500">
            {t('blog.subtitle')}
          </p>
        </div>

        {!selectedPost ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-teal-600 px-3 py-0.5 text-xs font-semibold text-white">
                    {post.category}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="mb-2 font-bold text-slate-900 line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="mb-4 text-sm text-slate-500 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedPost(post)}
                      className="flex items-center gap-1 text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors cursor-pointer"
                    >
                      Read
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

        ) : (
          <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="relative h-80 md:h-96">
              <img
                src={selectedPost.imageUrl}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-slate-700 shadow hover:bg-white transition-colors cursor-pointer"
              >
                ← {t('blog.back')}
              </button>
            </div>

            <div className="p-8">
              <div className="mb-4">
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold text-teal-700"
                  style={{ backgroundColor: '#d4eaea' }}
                >
                  {selectedPost.category}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                {selectedPost.title}
              </h1>

              <div className="flex items-center gap-5 text-slate-500 text-sm mb-8 pb-8 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  {selectedPost.author}
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {selectedPost.date}
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="text-base text-slate-700 leading-loose whitespace-pre-line">
                  {selectedPost.content}
                </p>
              </div>

              {/* Share section */}
              <div className="mt-10 pt-6 border-t border-slate-100">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
                    <Share2 className="w-4 h-4 text-teal-600" />
                    <span>{t('blog.sharePost')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(selectedPost.title + ' - ' + window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full transition-all flex items-center justify-center cursor-pointer shadow-sm hover:shadow hover:scale-105"
                      title="Share on WhatsApp"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-full transition-all flex items-center justify-center cursor-pointer shadow-sm hover:shadow hover:scale-105"
                      title="Share on Facebook"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedPost.title)}&url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-900 hover:bg-slate-700 text-white rounded-full transition-all flex items-center justify-center cursor-pointer shadow-sm hover:shadow hover:scale-105"
                      title="Share on X"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-[#0A66C2] hover:bg-[#0956a3] text-white rounded-full transition-all flex items-center justify-center cursor-pointer shadow-sm hover:shadow hover:scale-105"
                      title="Share on LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <button
                      onClick={handleCopyLink}
                      className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-all flex items-center justify-center cursor-pointer shadow-sm hover:shadow hover:scale-105"
                      title="Copy Link"
                    >
                      <Link className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {posts.length === 0 && !selectedPost && (
          <div className="text-center py-12 text-slate-400 text-sm">
            {t('blog.empty')}
          </div>
        )}
      </div>
    </section>
  );
}
