import React, { useEffect, useState } from 'react';
import { Calendar, User, ArrowRight, Share2, Link, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Button } from './ui/button';
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
      <section id="blog" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl text-gray-600">{t('blog.loading')}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('blog.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </div>

        {!selectedPost ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setSelectedPost(post)}
                  >
                    {t('blog.readMore')}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-96">
              <img
                src={selectedPost.imageUrl}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
              <Button
                variant="outline"
                className="absolute top-4 left-4 bg-white"
                onClick={() => setSelectedPost(null)}
              >
                {t('blog.back')}
              </Button>
            </div>

            <div className="p-8">
              <div className="mb-4">
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                  {selectedPost.category}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {selectedPost.title}
              </h1>

              <div className="flex items-center gap-6 text-gray-500 mb-8">
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  {selectedPost.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  {selectedPost.date}
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedPost.content}
                </p>
              </div>

              {/* Share section */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
                    <Share2 className="w-4.5 h-4.5 text-blue-600 animate-pulse" />
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
                      className="p-2 bg-black hover:bg-gray-800 text-white rounded-full transition-all flex items-center justify-center cursor-pointer shadow-sm hover:shadow hover:scale-105"
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
                      className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-all flex items-center justify-center cursor-pointer shadow-sm hover:shadow hover:scale-105"
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
          <div className="text-center py-12 text-gray-500">
            {t('blog.empty')}
          </div>
        )}
      </div>
    </section>
  );
}
