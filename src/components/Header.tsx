import React, { useState, useEffect } from 'react';
import logoImage from '../assets/logo.png';
import secondaryLogoImage from '../assets/Logo Raavc_1@4x.png';
import './Header.css';
import { useLanguage } from '../contexts/LanguageContext';
import { Page } from '../types/navigation';



interface HeaderProps {
  navigateToPage?: (page: Page) => void;
  isHomePage?: boolean;
}

const Header: React.FC<HeaderProps> = ({ navigateToPage, isHomePage = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  const handleLanguageToggle = () => {
    toggleLanguage();
  };




  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''} ${isHomePage ? 'home-header' : 'other-header'} ${language === 'en' ? 'ltr' : 'rtl'}`} dir={language === 'en' ? 'ltr' : 'rtl'}>
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo animate-fade-in-left visible" onClick={() => navigateToPage?.('home')}>
            <img 
              src={isHomePage ? (isScrolled ? secondaryLogoImage : logoImage) : secondaryLogoImage} 
              alt="رافك للتقييم العقاري" 
              className="logo-image hover-scale" 
            />
          </div>
          
          {/* Language Toggle Button */}
          <div className="language-toggle">
            <button 
              onClick={handleLanguageToggle}
              className="language-btn"
              aria-label="Toggle language"
            >
              <span className={`lang-text ${language === 'ar' ? 'active' : ''}`}>عربي</span>
              <span className="lang-separator">|</span>
              <span className={`lang-text ${language === 'en' ? 'active' : ''}`}>ENG</span>
            </button>
          </div>
          
          {/* Navigation */}
          <nav className={`nav animate-fade-in visible ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigateToPage?.('home'); }} className="hover-scale">{language === 'ar' ? 'الصفحة الرئيسية' : 'Home'}</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigateToPage?.('about'); }} className="hover-scale">{language === 'ar' ? 'من نحن' : 'About Us'}</a></li>
              <li className="dropdown-container">
                <a href="#" onClick={(e) => { e.preventDefault(); toggleServices(); }} className="hover-scale dropdown-toggle">
                  {language === 'ar' ? 'الخدمات' : 'Services'}
                  <span className="dropdown-arrow">▼</span>
                </a>
                <ul className={`dropdown-menu ${isServicesOpen ? 'dropdown-open' : ''}`}>
                  <li><a href="#calculator" onClick={(e) => { e.preventDefault(); navigateToPage?.('calculator'); setIsServicesOpen(false); }} className="hover-scale">{language === 'ar' ? 'حاسبة التقييم العقاري' : 'Property Calculator'}</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); navigateToPage?.('evaluation-request'); setIsServicesOpen(false); }} className="hover-scale">{language === 'ar' ? 'طلب تقييم عقاري' : 'Request Evaluation'}</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); navigateToPage?.('deals'); setIsServicesOpen(false); }} className="hover-scale">{language === 'ar' ? 'الصفقات' : 'Deals'}</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); navigateToPage?.('indicators'); setIsServicesOpen(false); }} className="hover-scale">{language === 'ar' ? 'المؤشرات' : 'Indicators'}</a></li>
                </ul>
              </li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigateToPage?.('cooperation'); }} className="hover-scale">{language === 'ar' ? 'للتعاون' : 'Cooperation'}</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigateToPage?.('contact'); }} className="hover-scale">{language === 'ar' ? 'تواصل معنا' : 'Contact Us'}</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigateToPage?.('job-request'); }} className="hover-scale">{language === 'ar' ? 'طلب توظيف' : 'Job Application'}</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigateToPage?.('guide'); }} className="hover-scale">{language === 'ar' ? 'دليل التقييم العقاري' : 'Appraisal Guide'}</a></li>
            </ul>
          </nav>


          {/* Mobile Menu Toggle */}
          <button className="mobile-menu-toggle animate-fade-in-right visible" onClick={toggleMenu} aria-label="Toggle menu">
            <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
