import React, { useEffect } from 'react';
import coverImage from '../assets/homepagecover.jpg';
import videoSource from '../assets/video.mp4';
import VideoSection from './VideoSection';
import Services from './Services';
import Workflow from './Workflow';
import CompanySlider from './CompanySlider';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Page } from '../types/navigation';
import './Home.css';

interface HomeProps {
  navigateToPage?: (page: Page) => void;
}

const Home: React.FC<HomeProps> = ({ navigateToPage }) => {
  const [heroRef, isHeroVisible] = useScrollAnimation(0.1);
  const [userTypesRef, isUserTypesVisible] = useScrollAnimation(0.1);
  const [videoRef, isVideoVisible] = useScrollAnimation(0.1);
  const [servicesRef, isServicesVisible] = useScrollAnimation(0.1);
  const [workflowRef, isWorkflowVisible] = useScrollAnimation(0.1);
  const { language } = useLanguage();
  const [sliderRef, isSliderVisible] = useScrollAnimation(0.1);
  const { isAuthenticated, user, logout } = useAuth();


  const handleContactClick = () => {
    navigateToPage?.('contact');
  };

  const handleCalculatorClick = () => {
    navigateToPage?.('calculator');
  };

  const handleIndicatorsClick = () => {
    navigateToPage?.('indicators');
  };

  const handleCooperationClick = () => {
    navigateToPage?.('cooperation');
  };

  const handleLoginClick = () => {
    navigateToPage?.('login');
  };

  const handleRegisterClick = () => {
    navigateToPage?.('register');
  };

  const handleLogoutClick = () => {
    logout();
  };

  return (
    <>
      {/* Hero Section - Dark Blue Background with Geometric Shapes */}
      <main className="home">
        <div className="hero-background">
          <div className="geometric-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
        </div>
        <div className="container">
          <div 
            ref={heroRef}
            className={`home-content ${isHeroVisible ? 'visible' : ''}`}
          >
            <h1 className="hero-title animate-fade-in-up">
              {language === 'ar' ? 'رافك .. قرار واعي' : 'Raavc .. Conscious Decision'}
            </h1>
            <h2 className="hero-subtitle animate-fade-in-up">
              {language === 'ar' ? (
                <>
                  الشركة الأولى عالمياً في مجال التقنية العقارية،<br/>
                  حيث نعيد تشكيل مستقبل السوق العقاري<br/>
                  عبر الدمج بين الاقتصاد الرقمي والتحول التقني
                </>
                
              ) : (
                <>
                  The world's first real estate technology company<br/>
                  reshaping the future of the real estate market<br/>
                  through the integration of digital economy and technological transformation
                </>
              )}
            </h2>
            
            {/* Authentication Buttons */}
            <div className="hero-auth-buttons animate-fade-in-up">
              {isAuthenticated ? (
                <div className="auth-user-info">
                  <span className="welcome-text">
                    {language === 'ar' ? `مرحباً، ${user?.name}` : `Welcome, ${user?.name}`}
                  </span>
                  <button 
                    className="auth-button logout-button" 
                    onClick={handleLogoutClick}
                  >
                    {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
                  </button>
                </div>
              ) : (
                <div className="auth-buttons">
                  <button 
                    className="auth-button login-button" 
                    onClick={handleLoginClick}
                  >
                    {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
                  </button>
                  <button 
                    className="auth-button register-button" 
                    onClick={handleRegisterClick}
                  >
                    {language === 'ar' ? 'إنشاء حساب' : 'Register'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Services Section - White Background */}
      <section ref={servicesRef} className={`services-intro ${isServicesVisible ? 'visible' : ''}`}>
        <div className="container">
          <h2 className="services-intro-title animate-fade-in-up">
            {language === 'ar' ? 'نجسد قوة البيانات في تنظيم السوق العقاري العالمي' : 'We embody the power of data in organizing the global real estate market'}
          </h2>
          <p className="services-intro-description animate-fade-in-up">
            {language === 'ar' ? 'نمكن الأفراد والمستثمرين من اتخاذ قرارات أكثر وعياً ضمن منظومة الاقتصاد الرقمي.' : 'We enable individuals and investors to make more informed decisions within the digital economy system.'}
          </p>
          <button className="services-intro-button animate-scale-in" onClick={handleCooperationClick}>
            {language === 'ar' ? 'اطلب استشارة الآن ←' : 'Request Consultation Now ←'}
          </button>
        </div>
      </section>

      {/* Features Section - What Makes Us Different */}
      <section className="features-section">
        <div className="container">
          <h2 className="features-title animate-fade-in-up">{language === 'ar' ? 'ما الذي يميزنا؟' : 'What Sets Us Apart?'}</h2>
          <div className="features-grid">
            <div className="feature-card animate-fade-in-up">
              <div className="feature-icon">
                <div className="icon-data">📊</div>
              </div>
              <h3 className="feature-title">{language === 'ar' ? 'قوة البيانات' : 'Data Power'}</h3>
              <p className="feature-description">
                {language === 'ar' ? 'يمكنك الوصول إلى قوائم الملاك المحدثة والدقيقة مع سجل شامل للتاريخ الزمني' : 'You can access updated and accurate owner lists with a comprehensive chronological record'}
              </p>
            </div>
            <div className="feature-card animate-fade-in-up">
              <div className="feature-icon">
                <div className="icon-brain">🧠</div>
              </div>
              <h3 className="feature-title">{language === 'ar' ? 'وعي القرارات' : 'Decision Awareness'}</h3>
              <p className="feature-description">
                {language === 'ar' ? 'قرارات مبنية على تحليل البيانات العقارية التي تخدم احتياجات القطاع وتعزز قرارات أصحاب المصلحة' : 'Decisions based on real estate data analysis that serves sector needs and enhances stakeholder decisions'}
              </p>
            </div>
            <div className="feature-card animate-fade-in-up">
              <div className="feature-icon">
                <div className="icon-eye">👁️</div>
              </div>
              <h3 className="feature-title">{language === 'ar' ? 'رؤية استباقية' : 'Proactive Vision'}</h3>
              <p className="feature-description">
                {language === 'ar' ? 'نوفر كل ما يحتاجه المستفيد من خدمات رقمية سهلة وموثوقة من خلال منصة موحدة' : 'We provide everything the beneficiary needs from easy and reliable digital services through a unified platform'}
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Services Cards Section */}
      <section ref={userTypesRef} className={`user-types-section ${isUserTypesVisible ? 'visible' : ''}`}>
        <div className="container">
          <div className="user-types-grid">
            <div className="user-type-card developers animate-fade-in-up">
              <h3 className="user-type-title">
                {language === 'ar' ? 'التقييم العقاري' : 'Real Estate Appraisal'}
              </h3>
              <p className="user-type-description">
                {language === 'ar' ? 'يعتمد على معاملات حقيقية وأساليب متعددة (السوق، التكلفة، الدخل) لإصدار قيمة في دقائق.' : 'Based on real transactions and multiple methods (market, cost, income) to issue value in minutes.'}
              </p>
              <button className="user-type-button" onClick={handleCalculatorClick}>
                {language === 'ar' ? 'المزيد ←' : 'More ←'}
              </button>
            </div>
            <div className="user-type-card registrars animate-fade-in-up">
              <h3 className="user-type-title">
                {language === 'ar' ? 'المؤشرات العقارية' : 'Real Estate Indicators'}
              </h3>
              <p className="user-type-description">
                {language === 'ar' ? 'لوحات تحليلية تفاعلية توضح اتجاهات الأسعار، الأحياء الأسرع نمواً، وعوائد الإيجارات، مما يمنح المستثمر رؤية استباقية للسوق.' : 'Interactive analytical dashboards showing price trends, fastest-growing neighborhoods, and rental returns, giving investors a proactive view of the market.'}
              </p>
              <button className="user-type-button" onClick={handleIndicatorsClick}>
                {language === 'ar' ? 'المزيد ←' : 'More ←'}
              </button>
            </div>
            <div className="user-type-card businesses animate-fade-in-up">
              <h3 className="user-type-title">
                {language === 'ar' ? 'دراسات الجدوى الاستثمارية' : 'Investment Feasibility Studies'}
              </h3>
              <p className="user-type-description">
                {language === 'ar' ? 'تقدر تكاليف المشاريع والعوائد المتوقعة بشكل مباشر، مما يختصر شهور العمل إلى دقائق بأدوات تحليل متقدمة.' : 'Directly estimate project costs and expected returns, reducing months of work to minutes with advanced analytical tools.'}
              </p>
            </div>
            <div className="user-type-card individuals animate-fade-in-up">
              <h3 className="user-type-title">
                {language === 'ar' ? 'الصفقات العقارية' : 'Real Estate Deals'}
              </h3>
              <p className="user-type-description">
                {language === 'ar' ? 'ربط مباشر بين المالك والمستثمرين، مع نموذج عمولة تنافسي بنسبة 1% فقط.' : 'Direct connection between owners and investors, with a competitive commission model of only 1%.'}
              </p>
            </div>
            <div className="user-type-card portfolio animate-fade-in-up">
              <h3 className="user-type-title">
                {language === 'ar' ? 'إدارة المحافظ العقارية' : 'Real Estate Portfolio Management'}
              </h3>
              <p className="user-type-description">
                {language === 'ar' ? 'متابعة شاملة للإيرادات والمصروفات والأداء مقابل السوق، مع تعليمات واضحة لزيادة العائد وتقليل المخاطر.' : 'Comprehensive tracking of revenues, expenses, and performance against the market, with clear instructions to increase returns and reduce risks.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMMENTED OUT - Video Section for future use */}
      {/* 
      <div ref={videoRef} className={isVideoVisible ? 'visible' : ''}>
      <VideoSection />
      </div>
      */}

      {/* COMMENTED OUT - Services Grid Section for future use */}
      {/* 
      <div ref={workflowRef} className={isWorkflowVisible ? 'visible' : ''}>
      <Services />
      </div>
      */}
      
      {/* Video Section */}
      <section className="video-text-section">
        <div className="container">
          <div className="video-text-grid">
            <div className="video-container">
              <video 
                className="background-video"
                autoPlay 
                loop 
                muted 
                playsInline
                disablePictureInPicture
                controlsList="nodownload nofullscreen noremoteplayback"
                onError={(e) => console.error('Video error:', e)}
                onLoadStart={() => console.log('Video loading started')}
                onCanPlay={() => console.log('Video can play')}
              >
                <source src={videoSource} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="text-content">
              <h2 className="video-section-title">
                {language === 'ar' ? 'رافك تُجسّد قوة البيانات في تحويل الضبابية العقارية إلى قرار واعٍ' : 'Raavc embodies the power of data in transforming real estate ambiguity into informed decisions'}
              </h2>
              <p className="video-section-description">
                {language === 'ar' ? 'وتفتح أفق رؤية مستقبلية تدعم التحول الرقمي والاقتصاد الجديد' : 'And opens the horizon of a future vision that supports digital transformation and the new economy'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div ref={sliderRef} className={isSliderVisible ? 'visible' : ''}>
      <CompanySlider />
      </div>
    </>
  );
};

export default Home;
