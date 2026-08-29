import React, { useState, useEffect } from 'react';
import { Toaster } from './components/ui/sonner';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminLogin } from './components/AdminLogin';
import { AdminPanel } from './components/AdminPanel';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { getBlogs, getPortfolioItems, BlogPost, PortfolioItem } from '../lib/firestore';
import { LanguageProvider } from '../lib/i18n';

export default function App() {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [contactTab, setContactTab] = useState<'general' | 'course'>('general');

  const handleNavigate = (section: string) => {
    if (section === 'register' || section === 'ai-training') {
      setContactTab('course');
      const element = document.getElementById('register') || document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoginSuccess = () => {
    setShowAdminLogin(false);
    setShowAdminPanel(true);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowAdminPanel(false);
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleAdminClick = () => {
    if (isLoggedIn) {
      setShowAdminPanel(true);
    } else {
      setShowAdminLogin(true);
    }
  };

  const fetchAllData = async () => {
    try {
      const blogs = await getBlogs();
      const items = await getPortfolioItems();
      setBlogPosts(blogs);
      setPortfolioItems(items);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setLoading(false);
    });

    fetchAllData();

    // Check URL Hash or Search Params for direct registration link or admin link
    const checkRegistrationRoute = () => {
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (hash === '#admin' || search.includes('admin=true')) {
        setShowAdminLogin(true);
      } else if (hash === '#register' || hash === '#ai-training' || hash === '#course' || search.includes('register')) {
        setContactTab('course');
        setTimeout(() => {
          const element = document.getElementById('register') || document.getElementById('contact');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      }
    };

    checkRegistrationRoute();
    window.addEventListener('hashchange', checkRegistrationRoute);

    return () => {
      unsubscribe();
      window.removeEventListener('hashchange', checkRegistrationRoute);
    };
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        <Toaster position="top-center" />

        <Header onNavigate={handleNavigate} />

        <main>
          <Hero onNavigate={handleNavigate} />
          <About onAdminClick={handleAdminClick} />
          <Services />
          <Portfolio />
          <Blog />
          <Contact 
            onAdminClick={handleAdminClick} 
            activeTab={contactTab}
            onTabChange={(tab) => setContactTab(tab)}
          />
        </main>

        <Footer onAdminClick={handleAdminClick} />

        {showAdminLogin && (
          <AdminLogin
            onLogin={handleLoginSuccess}
            onClose={() => setShowAdminLogin(false)}
          />
        )}

        {showAdminPanel && (
          <AdminPanel
            onClose={() => setShowAdminPanel(false)}
            onLogout={handleLogout}
            blogPosts={blogPosts}
            portfolioItems={portfolioItems}
            onRefresh={fetchAllData}
          />
        )}
      </div>
    </LanguageProvider>
  );
}
