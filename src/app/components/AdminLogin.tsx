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
  onLogin: (email: string, password: string) => void;
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
      await signInWithEmailAndPassword(auth, email, password);
      toast.success(t('admin.loginSuccess'));
      onLogin(email, password);
    } catch (error: any) {
      console.error(error);
      toast.error(t('admin.loginError'));
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{t('admin.title')}</h2>
          <p className="text-gray-600 mt-2">
            {t('admin.subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {t('admin.emailLabel')}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                placeholder={t('admin.emailPlaceholder')}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              {t('admin.passwordLabel')}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                placeholder={t('admin.passwordPlaceholder')}
                required
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              {t('admin.cancel')}
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700" disabled={loading}>
              {loading ? t('admin.loggingIn') : t('admin.loginBtn')}
            </Button>
          </div>
        </form>

        {import.meta.env.DEV && (
          <div className="mt-6 border-t pt-4">
            <Button
              type="button"
              variant="ghost"
              className="w-full text-gray-500 hover:text-gray-700 text-xs cursor-pointer"
              onClick={handleSeed}
              disabled={seeding}
            >
              <Database className="w-3 h-3 mr-2" />
              {seeding ? t('admin.seeding') : t('admin.seedBtn')}
            </Button>
          </div>
        )}

        <p className="text-xs text-gray-500 text-center mt-2">
          {t('admin.credentialsNote')}
        </p>
      </div>
    </div>
  );
}
