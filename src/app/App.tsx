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

export default function App() {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  const handleNavigate = (section: string) => {
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

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-center" />

      <Header onNavigate={handleNavigate} onAdminClick={handleAdminClick} />

      <main>
        <Hero onNavigate={handleNavigate} />
        <About />
        <Services />
        <Portfolio />
        <Blog />
        <Contact />
      </main>

      <Footer />

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
  );
}
