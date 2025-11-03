import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { GOOGLE_APPS_SCRIPT_URL } from '../config/googleForms';
import { useLanguage } from '../contexts/LanguageContext';
import { Page } from '../types/navigation';
import './JobRequestPage.css';

interface JobRequestPageProps {
  navigateToPage?: (page: Page) => void;
}

const JobRequestPage: React.FC<JobRequestPageProps> = ({ navigateToPage }) => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    cvDriveLink: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Submit form data with CV Drive Link
      const dataToSubmit = {
        formType: 'job_application',
        data: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          cvDriveLink: formData.cvDriveLink,
          timestamp: new Date().toISOString()
        }
      };
      
      // Debug: Log what we're sending
      console.log('=== FORM SUBMISSION DEBUG ===');
      console.log('Data being sent:', dataToSubmit);
      console.log('Google Apps Script URL:', GOOGLE_APPS_SCRIPT_URL);
      
      // Submit to Google Apps Script
      console.log('Sending request to:', GOOGLE_APPS_SCRIPT_URL);
      
      // Use no-cors mode for reliable submission
      await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });
      
      console.log('Request sent successfully');
      alert(language === 'ar' ? 'تم إرسال طلب التوظيف بنجاح! سنتواصل معك قريباً.' : 'Job application sent successfully! We will contact you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        cvDriveLink: ''
      });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(language === 'ar' ? 'حدث خطأ في إرسال الطلب. يرجى المحاولة مرة أخرى.' : 'An error occurred while sending the application. Please try again.');
    }
  };


  return (
    <div className="page" dir="ltr">
      <Header navigateToPage={navigateToPage} isHomePage={false} />
      
      <section className="job-request-section">
        <div className="container">
          <div className="form-hero">
            <h1 className="form-title">{language === 'ar' ? 'طلب توظيف' : 'Job Application'}</h1>
            <p className="form-subtitle">
              {language === 'ar' ? 'انضم إلى فريقنا المتميز في مجال التقييم العقاري' : 'Join our distinguished team in the field of real estate appraisal'}
            </p>
          </div>
          
          <div className="form-card">
            <form className="modern-form" onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="form-section">
              <div className="section-header">
                <div className="section-icon">👤</div>
                <h3 className="section-title">{language === 'ar' ? 'معلومات التواصل' : 'Contact Information'}</h3>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">{language === 'ar' ? 'اسمك' : 'Your Name'}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">{language === 'ar' ? 'بريدك الإلكتروني' : 'Your Email'}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="example@email.com"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">{language === 'ar' ? 'رقم الجوال' : 'Phone Number'}</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="+966 50 123 4567"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="section-header">
                <div className="section-icon">💬</div>
                <h3 className="section-title">{language === 'ar' ? 'رسالتك' : 'Your Message'}</h3>
              </div>
              <div className="form-group">
                <label className="form-label">{language === 'ar' ? 'رسالتك (اختياري)' : 'Your Message (Optional)'}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-textarea"
                  rows={4}
                  placeholder={language === 'ar' ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                ></textarea>
              </div>
            </div>

            {/* CV Drive Link */}
            <div className="form-section">
              <div className="section-header">
                <div className="section-icon">🔗</div>
                <h3 className="section-title">{language === 'ar' ? 'رابط السيرة الذاتية' : 'CV Link'}</h3>
              </div>
              <div className="form-group">
                <label className="form-label">{language === 'ar' ? 'رابط Google Drive للسيرة الذاتية' : 'Google Drive Link for CV'}</label>
                <input
                  type="url"
                  name="cvDriveLink"
                  value={formData.cvDriveLink}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="https://drive.google.com/file/d/..."
                />
                <small className="form-hint">
                  {language === 'ar' ? '📝 قم برفع ملف السيرة الذاتية على Google Drive وانسخ الرابط هنا' : '📝 Upload your CV file to Google Drive and copy the link here'}
                </small>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-button">
                <span className="button-icon">📤</span>
                {language === 'ar' ? 'إرسال الطلب' : 'Submit Application'}
              </button>
            </div>
            </form>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default JobRequestPage;
