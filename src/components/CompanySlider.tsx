import React from 'react';
import company1 from '../assets/company1.PNG';
import company2 from '../assets/company2.PNG';
import { useLanguage } from '../contexts/LanguageContext';
import './CompanySlider.css';

const CompanySlider: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <section className="company-slider-section">
      <div className="container">
        <h2 className="slider-title">{language === 'ar' ? 'شركاؤنا في النجاح' : 'Our Success Partners'}</h2>
        <div className="slider-container">
          <div className="slider-track">
            <div className="slider-item">
              <img src={company1} alt={language === 'ar' ? 'شركة شريك 1' : 'Partner Company 1'} className="company-logo" />
            </div>
            <div className="slider-item">
              <img src={company2} alt={language === 'ar' ? 'شركة شريك 2' : 'Partner Company 2'} className="company-logo" />
            </div>
            {/* Duplicate items for seamless loop */}
            <div className="slider-item">
              <img src={company1} alt={language === 'ar' ? 'شركة شريك 1' : 'Partner Company 1'} className="company-logo" />
            </div>
            <div className="slider-item">
              <img src={company2} alt={language === 'ar' ? 'شركة شريك 2' : 'Partner Company 2'} className="company-logo" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanySlider;
