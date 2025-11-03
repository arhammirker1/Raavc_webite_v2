import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Contact.css';

const Contact: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <section id="contact" className="contact-page">
      <div className="container">
        {/* Header Text */}
        <div className="contact-header">
          <h1 className="contact-title">
            {language === 'ar' ? (
              'انضم إلى المستقبل العقاري مع شركتنا التقنية المتخصصة في الحلول العقارية الذكية. دع تقنيتنا ترشدك لاتخاذ القرار الصحيح بثقة وسرعة'
            ) : (
              'Join the future of real estate with our technology company specialized in smart real estate solutions. Let our technology guide you to make the right decision with confidence and speed'
            )}
          </h1>
        </div>

        <div className="contact-content">
          {/* Google Maps Section */}
          <div className="maps-section">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.123456789!2d46.6753!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsKwNDAnMzEuMSJF!5e0!3m2!1sen!2ssa!4v1234567890123!5m2!1sen!2ssa"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={language === 'ar' ? 'موقع رافك للتقييم العقاري' : 'Raavc Real Estate Appraisal Location'}
            ></iframe>
          </div>

          {/* Contact Information Section */}
          <div className="contact-info-section">
            <h2 className="contact-section-title">{language === 'ar' ? 'تواصل معنا' : 'Contact Us'}</h2>
            
            <div className="contact-details">
              {/* Email */}
              <div className="contact-item">
                <div className="contact-icon">✉</div>
                <div className="contact-text">
                  <span className="contact-label">{language === 'ar' ? 'البريد الإلكتروني:' : 'Email:'}</span>
                  <span className="contact-value">info@raavc.com</span>
                </div>
              </div>

              {/* Location */}
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div className="contact-text">
                  <span className="contact-label">{language === 'ar' ? 'موقعنا:' : 'Our Location:'}</span>
                  <span className="contact-value">{language === 'ar' ? 'المملكة العربية السعودية' : 'Kingdom of Saudi Arabia'}</span>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="social-media-section">
              <div className="social-icons">
                <a href="#" className="social-icon twitter">
                  <div className="twitter-icon">𝕏</div>
                </a>
                <a href="#" className="social-icon linkedin">
                  <div className="linkedin-icon">in</div>
                </a>
                <a href="#" className="social-icon instagram">
                  <div className="instagram-icon">📷</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
