import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Page } from '../types/navigation';
import './LoginPage.css';

interface LoginPageProps {
  navigateToPage?: (page: Page) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ navigateToPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { language, t, toggleLanguage } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password);

      if (success) {
          navigateToPage?.("home");
      } else {
        setError(t("loginError"));
      }
 
      
    } catch (err) {
      setError(t('loginError'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = () => {
    navigateToPage?.('register');
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
            <h1 className="auth-title">{t('login')}</h1>
            <p className="auth-subtitle">{t('loginSubtitle')}</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="error-message">{error}</div>}

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

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? t('common.loading') : t('login')}
            </button>
          </form>

          <div className="auth-footer">
            <p className="auth-switch-text">
              {t('noAccount')}{' '}
              <button type="button" className="auth-switch-link" onClick={handleRegisterClick}>
                {t('register')}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

