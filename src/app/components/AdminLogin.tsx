import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Lock, Mail, Database } from 'lucide-react';
import { toast } from 'sonner';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { seedDatabase } from '../../lib/firestore';
import { useTranslation } from '../../lib/i18n';

interface AdminLoginProps {
  onLogin: () => void;
  onClose: () => void;
}

export function AdminLogin({ onLogin, onClose }: AdminLoginProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [seeding, setSeeding] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      toast.success('Logged in successfully!');
      onLogin();
    } catch {
      // Generic error — do not reveal whether email or password was wrong
      toast.error('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSeed = async () => {
    if (confirm(t('admin.seedPrompt'))) {
      setSeeding(true);
      const success = await seedDatabase();
      setSeeding(false);
      if (success) {
        toast.success(t('admin.seedSuccess'));
      } else {
        toast.error(t('admin.seedError'));
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-xl border border-slate-200">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-slate-100 rounded-full mb-4">
            <Lock className="w-7 h-7 text-slate-700" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">{t('admin.title')}</h2>
          <p className="text-slate-500 mt-2 text-sm">
            {t('admin.subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-email" className="block text-sm font-medium text-slate-700 mb-1">
              {t('admin.emailLabel')}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                placeholder={t('admin.emailPlaceholder')}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="admin-password" className="block text-sm font-medium text-slate-700 mb-1">
              {t('admin.passwordLabel')}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                placeholder={t('admin.passwordPlaceholder')}
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 cursor-pointer">
              {t('admin.cancel')}
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-slate-900 hover:bg-slate-700 text-white cursor-pointer"
              disabled={loading}
            >
              {loading ? t('admin.loggingIn') : t('admin.loginBtn')}
            </Button>
          </div>
        </form>

        {import.meta.env.DEV && (
          <div className="mt-6 border-t pt-4">
            <Button
              type="button"
              variant="ghost"
              className="w-full text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
              onClick={handleSeed}
              disabled={seeding}
            >
              <Database className="w-3 h-3 mr-2" />
              {seeding ? t('admin.seeding') : t('admin.seedBtn')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
