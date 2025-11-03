import React, { useState } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import CooperationPage from './pages/CooperationPage';
import GuidePage from './pages/GuidePage';
import EvaluationRequestPage from './pages/EvaluationRequestPage';
import JobRequestPage from './pages/JobRequestPage';
import CalculatorPage from './pages/CalculatorPage';
import DealsPage from './pages/DealsPage';
import IndicatorsPage from './pages/IndicatorsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Page } from './types/navigation';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const { language } = useLanguage();
  const { isAuthenticated, loading } = useAuth();

  const navigateToPage = (page: Page) => {
    setCurrentPage(page);
    // Update URL hash
    if (page === 'home') {
      window.location.hash = '';
    } else {
      window.location.hash = `#${page}`;
    }
  };


  // Handle browser back/forward
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      console.log('Current hash:', hash); // Debug log
      
      if (hash === 'contact') {
        setCurrentPage('contact');
      } else if (hash === 'about') {
        setCurrentPage('about');
      } else if (hash === 'cooperation') {
        setCurrentPage('cooperation');
      } else if (hash === 'guide') {
        setCurrentPage('guide');
      } else if (hash === 'evaluation-request') {
        setCurrentPage('evaluation-request');
      } else if (hash === 'job-request') {
        setCurrentPage('job-request');
      } else if (hash === 'calculator') {
        setCurrentPage('calculator');
      } else if (hash === 'deals') {
        setCurrentPage('deals');
      } else if (hash === 'indicators') {
        setCurrentPage('indicators');
      } else if (hash === 'login') {
        setCurrentPage('login');
      } else if (hash === 'register') {
        setCurrentPage('register');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Check initial hash
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Pass navigation function to components
  const navigationProps = { navigateToPage };

  // Protected pages that require authentication
  const protectedPages: Page[] = ['contact', 'about', 'cooperation', 'guide', 'evaluation-request', 'job-request', 'calculator', 'deals', 'indicators'];
  
  // Redirect to login if trying to access protected page without authentication
  if (protectedPages.includes(currentPage) && !isAuthenticated) {
    setCurrentPage('login');
  }

  // Debug logging
  console.log('Current page:', currentPage);
  console.log('Is authenticated:', isAuthenticated);
  console.log('Auth loading:', loading);

  // Show loading state while auth is initializing
  if (loading) {
    return (
      <div className="App" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className={`App ${language === 'en' ? 'ltr' : 'rtl'}`} dir={language === 'en' ? 'ltr' : 'rtl'}>
      {currentPage === 'home' && <HomePage {...navigationProps} />}
      {currentPage === 'login' && <LoginPage {...navigationProps} />}
      {currentPage === 'register' && <RegisterPage {...navigationProps} />}
      {currentPage === 'contact' && <ContactPage {...navigationProps} />}
      {currentPage === 'about' && <AboutPage {...navigationProps} />}
      {currentPage === 'cooperation' && <CooperationPage {...navigationProps} />}
      {currentPage === 'guide' && <GuidePage {...navigationProps} />}
      {currentPage === 'evaluation-request' && <EvaluationRequestPage {...navigationProps} />}
      {currentPage === 'job-request' && <JobRequestPage {...navigationProps} />}
      {currentPage === 'calculator' && <CalculatorPage {...navigationProps} />}
      {currentPage === 'deals' && <DealsPage {...navigationProps} />}
      {currentPage === 'indicators' && <IndicatorsPage {...navigationProps} />}
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;