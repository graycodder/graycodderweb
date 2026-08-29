import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Send, Award, Sparkles, Share2, GraduationCap, CheckCircle2, Copy } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import { useTranslation } from '../../lib/i18n';
import { addRegistration } from '../../lib/firestore';

interface ContactProps {
  onAdminClick: () => void;
  activeTab?: 'general' | 'course';
  onTabChange?: (tab: 'general' | 'course') => void;
}

export function Contact({ onAdminClick, activeTab = 'general', onTabChange }: ContactProps) {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = useState<'general' | 'course'>(activeTab);

  useEffect(() => {
    if (activeTab) {
      setCurrentTab(activeTab);
    }
  }, [activeTab]);

  const handleTabSwitch = (tab: 'general' | 'course') => {
    setCurrentTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  // General contact form state
  const [generalFormData, setGeneralFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Course registration form state
  const [courseFormData, setCourseFormData] = useState({
    name: '',
    email: '',
    phone: '',
    stream: '',
    graduationStatus: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setGeneralFormData({
      ...generalFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setCourseFormData({
      ...courseFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleGeneralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      if (!accessKey) {
        toast.error(t('contact.toastErrorKey'));
        setIsSubmitting(false);
        return;
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: 'Website Inquiry - Graycodder AI',
          ...generalFormData
        })
      });

      const result = await response.json();

      if (response.status === 200) {
        toast.success(t('contact.toastSuccess'));
        setGeneralFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        toast.error(result.message || t('contact.toastError'));
      }
    } catch (error) {
      toast.error(t('contact.toastErrorGeneric'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Save registration into Firestore
      await addRegistration({
        name: courseFormData.name,
        email: courseFormData.email,
        phone: courseFormData.phone,
        stream: courseFormData.stream,
        graduationStatus: courseFormData.graduationStatus,
        message: courseFormData.message,
        courseName: 'Graycodder AI Consultants Certified "A Stack" Certificate',
        createdAt: new Date().toISOString()
      });

      // 2. Also send via Web3Forms if key exists
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      if (accessKey) {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: accessKey,
            subject: 'AI Training Registration: Graycodder AI Consultants Certified "A Stack"',
            ...courseFormData,
            course: 'Graycodder AI Consultants Certified "A Stack" Certificate'
          })
        }).catch(() => {});
      }

      toast.success(t('course.toastSuccess') || 'Registration submitted successfully! Our team will contact you.');
      setCourseFormData({
        name: '',
        email: '',
        phone: '',
        stream: '',
        graduationStatus: '',
        message: ''
      });
    } catch (error) {
      console.error("Course registration error:", error);
      toast.error(t('contact.toastErrorGeneric') || 'Failed to submit registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyShareLink = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#register`;
    navigator.clipboard.writeText(shareUrl);
    toast.success(t('course.linkCopied') || 'Direct registration link copied to clipboard!');
  };

  const renderAddressWithClick = (addressText: string) => {
    const parts = addressText.split('KL-02-0105921');
    if (parts.length === 2) {
      return (
        <>
          {parts[0]}
          <span 
            onDoubleClick={onAdminClick} 
            className="cursor-pointer select-all font-semibold hover:text-blue-600 transition-colors"
            title="Double click to open admin panel"
          >
            KL-02-0105921
          </span>
          {parts[1]}
        </>
      );
    }
    return addressText;
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="register" className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Graycodder AI Academy</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
            {currentTab === 'course' ? 'AI Training Registration' : t('contact.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {currentTab === 'course' 
              ? 'Enroll in the Graycodder AI Consultants Certified "A Stack" Certificate Program. Open to graduates of any stream.' 
              : t('contact.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information & Course Announcement */}
          <div className="space-y-8">
            {/* Featured AI Training Announcement Card */}
            <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-gray-950 font-bold text-xs rounded-full uppercase shadow">
                  <Award className="w-3.5 h-3.5" />
                  <span>Certified Program</span>
                </span>
                <button
                  onClick={handleCopyShareLink}
                  className="flex items-center space-x-1 text-xs text-blue-200 hover:text-white bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-md transition-colors"
                  title="Share registration link on social media"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Link</span>
                </button>
              </div>

              <h3 className="text-xl md:text-2xl font-bold mb-2 text-amber-300">
                Graycodder AI Consultants Certified "A Stack" Certificate
              </h3>
              <p className="text-sm text-blue-100 mb-4 leading-relaxed">
                Empowering talented graduates from <strong>any stream</strong> with foundational AI knowledge, prompt engineering, and modern full-stack AI skills. Top performers earn our official company certification!
              </p>

              <div className="space-y-2 mb-6 text-xs text-blue-200">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Open for Graduates of ANY Stream (B.Tech, B.Sc, B.Com, B.A, BCA, MBA, etc.)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Hands-on Practical AI Workflows & Foundational Technical Training</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Graycodder AI Consultants "A Stack" Certification for Top Talents</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  onClick={() => handleTabSwitch('course')}
                  className={`${currentTab === 'course' ? 'bg-amber-400 text-gray-950 font-bold hover:bg-amber-300' : 'bg-white text-blue-900 font-semibold hover:bg-blue-50'} shadow-md`}
                >
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Register for AI Course
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCopyShareLink}
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <Copy className="w-4 h-4 mr-1.5" />
                  Copy Direct Link
                </Button>
              </div>
            </div>

            {/* Standard Contact Info */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xl font-bold text-gray-900">
                {t('contact.infoTitle')}
              </h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{t('contact.address')}</h4>
                    <p className="text-gray-600 text-sm whitespace-pre-line">
                      {renderAddressWithClick(t('about.locationAddress'))}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{t('contact.email')}</h4>
                    <a href="mailto:graycodder@graycodder.com" className="text-blue-600 hover:text-blue-700 text-sm">
                      graycodder@graycodder.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{t('contact.phone')}</h4>
                    <a href="tel:+918075050701" className="text-blue-600 hover:text-blue-700 text-sm">
                      +91 8075050701
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map iframe */}
            <div className="rounded-xl overflow-hidden shadow-md h-48 border border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125451.01019823008!2d76.2245!3d9.9312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0874e99c9f0a77%3A0x4f7c4f7e6b4a4f7e!2sChellanam%2C%20Kerala!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Graycodder Location"
              ></iframe>
            </div>
          </div>

          {/* Form Container with Tabs */}
          <div className="bg-gradient-to-br from-blue-50/70 to-indigo-50/70 p-6 md:p-8 rounded-2xl border border-blue-100/80 shadow-sm">
            {/* Tab Navigation */}
            <div className="flex rounded-xl bg-white/80 p-1 border border-blue-200/60 mb-6">
              <button
                type="button"
                onClick={() => handleTabSwitch('general')}
                className={`flex-1 py-2.5 px-3 rounded-lg text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                  currentTab === 'general'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                }`}
              >
                {t('course.tabGeneral') || 'General Message'}
              </button>
              <button
                type="button"
                onClick={() => handleTabSwitch('course')}
                className={`flex-1 py-2.5 px-3 rounded-lg text-xs md:text-sm font-semibold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                  currentTab === 'course'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow'
                    : 'text-blue-700 hover:text-blue-900 hover:bg-blue-50/50'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>{t('course.tabRegister') || 'AI Training Registration'}</span>
              </button>
            </div>

            {currentTab === 'general' ? (
              /* General Contact Form */
              <form onSubmit={handleGeneralSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {t('contact.messageTitle')}
                </h3>

                <div>
                  <label htmlFor="gen-name" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.label.name')}
                  </label>
                  <Input
                    id="gen-name"
                    name="name"
                    type="text"
                    required
                    value={generalFormData.name}
                    onChange={handleGeneralChange}
                    placeholder={t('contact.placeholder.name')}
                  />
                </div>

                <div>
                  <label htmlFor="gen-email" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.label.email')}
                  </label>
                  <Input
                    id="gen-email"
                    name="email"
                    type="email"
                    required
                    value={generalFormData.email}
                    onChange={handleGeneralChange}
                    placeholder={t('contact.placeholder.email')}
                  />
                </div>

                <div>
                  <label htmlFor="gen-phone" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.label.phone')}
                  </label>
                  <Input
                    id="gen-phone"
                    name="phone"
                    type="tel"
                    value={generalFormData.phone}
                    onChange={handleGeneralChange}
                    placeholder={t('contact.placeholder.phone')}
                  />
                </div>

                <div>
                  <label htmlFor="gen-message" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.label.message')}
                  </label>
                  <Textarea
                    id="gen-message"
                    name="message"
                    required
                    value={generalFormData.message}
                    onChange={handleGeneralChange}
                    placeholder={t('contact.placeholder.message')}
                    rows={5}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t('contact.btn.sending') : t('contact.btn.send')}
                  <Send className="ml-2 w-4 h-4" />
                </Button>
              </form>
            ) : (
              /* Course Registration Form */
              <form onSubmit={handleCourseSubmit} className="space-y-4">
                <div className="border-b border-blue-200/60 pb-3 mb-4">
                  <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>Graycodder AI Consultants Certified "A Stack"</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Course Registration
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Open for Graduates of ANY Stream (B.Tech, B.Sc, B.Com, B.A, BCA, MBA, etc.)
                  </p>
                </div>

                <div>
                  <label htmlFor="course-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <Input
                    id="course-name"
                    name="name"
                    type="text"
                    required
                    value={courseFormData.name}
                    onChange={handleCourseChange}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="course-email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <Input
                      id="course-email"
                      name="email"
                      type="email"
                      required
                      value={courseFormData.email}
                      onChange={handleCourseChange}
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="course-phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone / WhatsApp *
                    </label>
                    <Input
                      id="course-phone"
                      name="phone"
                      type="tel"
                      required
                      value={courseFormData.phone}
                      onChange={handleCourseChange}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="course-stream" className="block text-sm font-medium text-gray-700 mb-1">
                      Graduation Stream / Degree *
                    </label>
                    <Input
                      id="course-stream"
                      name="stream"
                      type="text"
                      required
                      value={courseFormData.stream}
                      onChange={handleCourseChange}
                      placeholder="e.g. B.Com, B.Tech, B.Sc, BCA, B.A"
                    />
                  </div>

                  <div>
                    <label htmlFor="course-status" className="block text-sm font-medium text-gray-700 mb-1">
                      Status / Graduation Year *
                    </label>
                    <Input
                      id="course-status"
                      name="graduationStatus"
                      type="text"
                      required
                      value={courseFormData.graduationStatus}
                      onChange={handleCourseChange}
                      placeholder="e.g. 2024 Graduate, Final Year"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="course-message" className="block text-sm font-medium text-gray-700 mb-1">
                    Motivation / Background *
                  </label>
                  <Textarea
                    id="course-message"
                    name="message"
                    required
                    value={courseFormData.message}
                    onChange={handleCourseChange}
                    placeholder="Tell us about your background and why you want to become a Graycodder Certified AI Consultant..."
                    rows={4}
                  />
                </div>

                <div className="pt-2 space-y-2">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 shadow-md"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span>Submitting Registration...</span>
                    ) : (
                      <>
                        <GraduationCap className="mr-2 w-5 h-5" />
                        <span>Submit Registration</span>
                      </>
                    )}
                  </Button>

                  <button
                    type="button"
                    onClick={handleCopyShareLink}
                    className="w-full text-center text-xs text-blue-600 hover:text-blue-800 font-semibold py-1.5 flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Social Media Registration Link</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

