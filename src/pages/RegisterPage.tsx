import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Page } from '../types/navigation';
import './RegisterPage.css';

interface RegisterPageProps {
  navigateToPage?: (page: Page) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ navigateToPage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { language, t, toggleLanguage } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) return setError(t('nameRequired'));
    if (!email.trim()) return setError(t('emailRequired'));
    if (password.length <= 5) return setError(t('passwordLength'));
    if (password !== confirmPassword) return setError(t('passwordMismatch'));

    setLoading(true);
try {
  const success = await register(name, email, password);

  if (success) {
    navigateToPage?.('home');
  } else {
    setError(t("emailExists"));
  }
} catch (err) {
  setError(t("registerError"));
  console.error(err);
} finally {
  setLoading(false);
}

  };

  const handleLoginClick = () => {
    navigateToPage?.('login');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-language-toggle">
              <button 
                className={`lang-btn ${language === 'ar' ? 'active' : ''}`}
                onClick={() => language !== 'ar' && toggleLanguage()}
              >
                عربي
              </button>
              <button 
                className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                onClick={() => language !== 'en' && toggleLanguage()}
              >
                English
              </button>
            </div>
            <h1 className="auth-title">{t('register')}</h1>
            <p className="auth-subtitle">{t('registerSubtitle')}</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="name" className="form-label">{t('name')}</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="form-input"
                required
                placeholder={t('namePlaceholder')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">{t('email')}</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="form-input"
                required
                placeholder={t('emailPlaceholder')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">{t('password')}</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="form-input"
                required
                placeholder={t('passwordPlaceholder')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">{t('confirmPassword')}</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="form-input"
                required
                placeholder={t('confirmPasswordPlaceholder')}
              />
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? t('common.loading') : t('register')}
            </button>
          </form>

          <div className="auth-footer">
            <p className="auth-switch-text">
              {t('haveAccount')}{' '}
              <button type="button" className="auth-switch-link" onClick={handleLoginClick}>
                {t('login')}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
