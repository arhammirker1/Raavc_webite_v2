import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { GOOGLE_APPS_SCRIPT_URL } from '../config/googleForms';
import { useLanguage } from '../contexts/LanguageContext';
import { Page } from '../types/navigation';
import './EvaluationRequestPage.css';

interface EvaluationRequestPageProps {
  navigateToPage?: (page: Page) => void;
}

const EvaluationRequestPage: React.FC<EvaluationRequestPageProps> = ({ navigateToPage }) => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    requestType: 'evaluation',
    evaluationPurpose: '',
    otherPurpose: '',
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    propertyArea: '',
    propertyLocation: '',
    generalDescription: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Submit directly to Google Sheets using Google Apps Script
      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'evaluation_request',
          data: {
            requestType: formData.requestType,
            evaluationPurpose: formData.evaluationPurpose,
            otherPurpose: formData.otherPurpose,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            propertyType: formData.propertyType,
            propertyArea: formData.propertyArea,
            propertyLocation: formData.propertyLocation,
            generalDescription: formData.generalDescription,
            timestamp: new Date().toISOString()
          }
        }),
      });
      
      // Since we're using no-cors, we can't check response.ok
      // But the request will still be sent to Google Apps Script
      alert(language === 'ar' ? 'تم إرسال طلب التقييم العقاري بنجاح! سنتواصل معك قريباً.' : 'Real estate evaluation request sent successfully! We will contact you soon.');
    
    // Reset form
    setFormData({
      requestType: 'evaluation',
      evaluationPurpose: '',
      otherPurpose: '',
      name: '',
      email: '',
      phone: '',
      propertyType: '',
      propertyArea: '',
      propertyLocation: '',
        generalDescription: ''
    });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(language === 'ar' ? 'حدث خطأ في إرسال الطلب. يرجى المحاولة مرة أخرى.' : 'An error occurred while sending the request. Please try again.');
    }
  };

  return (
    <div className="page" dir="ltr">
      <Header navigateToPage={navigateToPage} isHomePage={false} />
      
      <section className="evaluation-request-section">
        <div className="container">
          <div className="form-hero">
            <h1 className="form-title">{language === 'ar' ? 'طلب تقييم عقاري' : 'Real Estate Evaluation Request'}</h1>
            <p className="form-subtitle">
              {language === 'ar' ? 'احصل على تقييم دقيق ومهني لعقارك من قبل خبراء معتمدين' : 'Get an accurate and professional evaluation of your property by certified experts'}
            </p>
          </div>
          
          <div className="form-card">
            <form className="modern-form" onSubmit={handleSubmit}>
            {/* Request Type */}
            <div className="form-section">
              <div className="section-header">
                <div className="section-icon">📋</div>
                <h3 className="section-title">{language === 'ar' ? 'نوع الطلب' : 'Request Type'}</h3>
              </div>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="requestType"
                    value="evaluation"
                    checked={formData.requestType === 'evaluation'}
                    onChange={(e) => {
                        setFormData(prev => ({ ...prev, requestType: 'evaluation' }));
                    }}
                  />
                  <div className="radio-content">
                    <span className="radio-title">{language === 'ar' ? 'تقييم عقاري' : 'Real Estate Evaluation'}</span>
                    <span className="radio-desc">{language === 'ar' ? 'تقييم مهني دقيق للعقار' : 'Professional and accurate property evaluation'}</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Purpose of Evaluation */}
            <div className="form-section">
              <div className="section-header">
                <div className="section-icon">🎯</div>
                <h3 className="section-title">{language === 'ar' ? 'الغرض من التقييم' : 'Purpose of Evaluation'}</h3>
              </div>
            <div className="form-group">
              <select
                name="evaluationPurpose"
                value={formData.evaluationPurpose}
                onChange={handleInputChange}
                required
                className="form-select"
              >
                <option value="">{language === 'ar' ? 'اختر الغرض من التقييم' : 'Choose Purpose of Evaluation'}</option>
                <option value="mortgage">{language === 'ar' ? 'رهن عقاري' : 'Mortgage'}</option>
                <option value="finance">{language === 'ar' ? 'تمويل' : 'Financing'}</option>
                <option value="sale">{language === 'ar' ? 'بيع' : 'Sale'}</option>
                <option value="buying">{language === 'ar' ? 'شراء' : 'Buying'}</option>
                <option value="other">{language === 'ar' ? 'أخرى' : 'Other'}</option>
              </select>
              
              {formData.evaluationPurpose === 'other' && (
                <input
                  type="text"
                  name="otherPurpose"
                  value={formData.otherPurpose}
                  onChange={handleInputChange}
                  placeholder={language === 'ar' ? 'يرجى تحديد الغرض' : 'Please specify the purpose'}
                  className="form-input"
                />
              )}
              </div>
            </div>

            {/* Personal Information */}
            <div className="form-section">
              <div className="section-header">
                <div className="section-icon">👤</div>
                <h3 className="section-title">{language === 'ar' ? 'معلومات التواصل' : 'Contact Information'}</h3>
              </div>
              <div className="form-grid">
              <div className="form-group">
                <label className="form-label">{language === 'ar' ? 'اسمك (مطلوب)' : 'Your Name (Required)'}</label>
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
                <label className="form-label">{language === 'ar' ? 'بريدك الإلكتروني (مطلوب)' : 'Your Email (Required)'}</label>
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
              <label className="form-label">{language === 'ar' ? 'رقم الهاتف (مطلوب)' : 'Phone Number (Required)'}</label>
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

            {/* Property Information */}
            <div className="form-section">
              <div className="section-header">
                <div className="section-icon">🏠</div>
                <h3 className="section-title">{language === 'ar' ? 'معلومات العقار' : 'Property Information'}</h3>
              </div>
              <div className="form-grid">
              <div className="form-group">
                <label className="form-label">{language === 'ar' ? 'نوع العقار (مطلوب)' : 'Property Type (Required)'}</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  required
                  className="form-select"
                >
                  <option value="">{language === 'ar' ? 'اختر نوع العقار' : 'Choose Property Type'}</option>
                  <option value="villa">{language === 'ar' ? 'فيلا' : 'Villa'}</option>
                  <option value="apartment">{language === 'ar' ? 'شقة' : 'Apartment'}</option>
                  <option value="land">{language === 'ar' ? 'أرض' : 'Land'}</option>
                  <option value="commercial">{language === 'ar' ? 'تجاري' : 'Commercial'}</option>
                  <option value="other">{language === 'ar' ? 'أخرى' : 'Other'}</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">{language === 'ar' ? 'مساحة العقار (مطلوب)' : 'Property Area (Required)'}</label>
                <input
                  type="text"
                  name="propertyArea"
                  value={formData.propertyArea}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder={language === 'ar' ? 'مثال: 200 متر مربع' : 'Example: 200 square meters'}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">{language === 'ar' ? 'موقع العقار (مطلوب)' : 'Property Location (Required)'}</label>
              <input
                type="text"
                name="propertyLocation"
                value={formData.propertyLocation}
                onChange={handleInputChange}
                required
                className="form-input"
                placeholder={language === 'ar' ? 'مثال: الرياض، حي النرجس' : 'Example: Riyadh, Al-Narjis District'}
              />
            </div>

            <div className="form-group">
              <label className="form-label">{language === 'ar' ? 'وصف عام' : 'General Description'}</label>
              <textarea
                name="generalDescription"
                value={formData.generalDescription}
                onChange={handleInputChange}
                className="form-textarea"
                rows={4}
                placeholder={language === 'ar' ? 'اكتب وصفاً عاماً عن العقار...' : 'Write a general description about the property...'}
              ></textarea>
            </div>
              </div>
              

            <div className="form-actions">
            <button type="submit" className="submit-button">
                <span className="button-icon">📤</span>
              {language === 'ar' ? 'إرسال الطلب' : 'Submit Request'}
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

export default EvaluationRequestPage;
