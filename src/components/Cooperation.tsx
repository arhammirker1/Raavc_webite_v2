import React, { useState } from 'react';
import coverImage from '../assets/pagecover.jpg';
import WhyCooperation from './WhyCooperation';
import { GOOGLE_APPS_SCRIPT_URL } from '../config/googleForms';
import { useLanguage } from '../contexts/LanguageContext';
import './Cooperation.css';

interface CooperationProps {
  navigateToPage?: (page: 'home' | 'contact' | 'about' | 'cooperation' | 'guide' | 'evaluation-request' | 'job-request') => void;
}

const Cooperation: React.FC<CooperationProps> = ({ navigateToPage }) => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phoneNumber: '',
    topic: '',
    message: ''
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
          formType: 'cooperation',
          data: {
            companyName: formData.companyName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            topic: formData.topic,
            message: formData.message,
            timestamp: new Date().toISOString()
          }
        }),
      });
      
      // Since we're using no-cors, we can't check response.ok
      // But the request will still be sent to Google Apps Script
      alert(language === 'ar' ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.' : 'Your message has been sent successfully! We will contact you soon.');
      
      // Reset form
      setFormData({
        companyName: '',
        email: '',
        phoneNumber: '',
        topic: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(language === 'ar' ? 'حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.' : 'An error occurred while sending the message. Please try again.');
    }
  };

  const handleContactClick = () => {
    // Navigate to contact page or handle contact action
    window.location.href = '#contact';
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '966580069350';
    const message = 'حياك الله ..\n\nأريد التعاون معكم';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <section className="cooperation-hero">
        <div className="hero-background">
          <img src={coverImage} alt="شراكة استراتيجية مع شركات العقارات" className="hero-image" />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              {language === 'ar' ? (
                <>
                  شراكة استراتيجية<br/>
                  مع شركات العقارات
                </>
              ) : (
                <>
                  Strategic Partnership<br/>
                  with Real Estate Companies
                </>
              )}
            </h1>
            <p className="hero-description">
              {language === 'ar' ? (
                <>
                  في رافك، نؤمن أن مستقبل الاستثمار العقاري يكمن في التعاون الذكي المدعوم بالتقنية. 
                  لهذا السبب، نفتح أبوابنا للتعاون مع الشركات في مجال العقارات الراغبة في تطوير أعمالها، 
                  وتسريع عملياتها، والارتقاء بجودة خدماتها من خلال حلولنا الرقمية المتكاملة
                </>
              ) : (
                <>
                  At Raavc, we believe that the future of real estate investment lies in smart cooperation supported by technology. 
                  For this reason, we open our doors to cooperation with companies in the real estate field who want to develop their business, 
                  accelerate their operations, and improve the quality of their services through our integrated digital solutions
                </>
              )}
            </p>
            <button className="hero-button" onClick={handleContactClick}>
              {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </button>
          </div>
        </div>

        {/* WhatsApp Icons */}
        <button className="whatsapp-float-left" onClick={handleWhatsAppClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        </button>
        
        <button className="whatsapp-float-right" onClick={handleWhatsAppClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        </button>
      </section>
      
      <WhyCooperation />
      
      {/* Added Value Section */}
      <section className="added-value-section">
        <div className="container">
          <h2 className="added-value-title">
            {language === 'ar' ? 'قيمة مضافة لشركتك ... تعرف على مزايا التعاون مع رافك' : 'Added Value for Your Company ... Learn About the Benefits of Cooperating with Raavc'}
          </h2>
          
          <div className="benefits-grid">
            <div className="benefit-box">
              <p>{language === 'ar' ? 'تحسين جودة ودقة التقييم عبر أدوات متقدمة' : 'Improve evaluation quality and accuracy through advanced tools'}</p>
            </div>
            <div className="benefit-box">
              <p>{language === 'ar' ? 'تقليل التكاليف التشغيلية بفضل الأتمتة' : 'Reduce operational costs thanks to automation'}</p>
            </div>
            <div className="benefit-box">
              <p>{language === 'ar' ? 'تسريع عمليات التقييم بنسبة تصل حتى 50%' : 'Accelerate evaluation processes by up to 50%'}</p>
            </div>
            <div className="benefit-box">
              <p>{language === 'ar' ? 'التوافق مع الجهات الرسمية والبنوك والهيئات' : 'Compliance with official authorities, banks, and institutions'}</p>
            </div>
            <div className="benefit-box">
              <p>{language === 'ar' ? 'واجهة مرنة وسهلة الاستخدام لفرق العمل' : 'Flexible and easy-to-use interface for work teams'}</p>
            </div>
          </div>
          
          <div className="pagination-dots">
            <span className="dot active"></span>
            <span className="dot"></span>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="container">
          <div className="form-hero">
            <h2 className="form-title">{language === 'ar' ? 'تواصل معنا للتعاون' : 'Contact Us for Cooperation'}</h2>
            <p className="form-subtitle">
              {language === 'ar' ? (
                'املأ النموذج أدناه وسنتواصل معك في أقرب وقت ممكن لمناقشة فرص التعاون'
              ) : (
                'Fill out the form below and we will contact you as soon as possible to discuss cooperation opportunities'
              )}
            </p>
          </div>
          
          <div className="form-card">
            <form className="modern-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <div className="section-header">
                <div className="section-icon">🏢</div>
                <h3 className="section-title">{language === 'ar' ? 'معلومات الشركة' : 'Company Information'}</h3>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="companyName" className="form-label">{language === 'ar' ? 'اسم الشركة' : 'Company Name'}</label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder={language === 'ar' ? 'أدخل اسم شركتك' : 'Enter your company name'}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="example@company.com"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phoneNumber" className="form-label">{language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="+966 50 123 4567"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="topic" className="form-label">{language === 'ar' ? 'الموضوع' : 'Subject'}</label>
                  <select
                    id="topic"
                    name="topic"
                    value={formData.topic}
                    onChange={handleInputChange}
                    required
                    className="form-select"
                  >
                    <option value="">{language === 'ar' ? 'اختر الموضوع' : 'Choose Subject'}</option>
                    <option value="partnership">{language === 'ar' ? 'شراكة استراتيجية' : 'Strategic Partnership'}</option>
                    <option value="services">{language === 'ar' ? 'خدمات التقييم العقاري' : 'Real Estate Evaluation Services'}</option>
                    <option value="consultation">{language === 'ar' ? 'استشارة عقارية' : 'Real Estate Consultation'}</option>
                    <option value="integration">تكامل الأنظمة</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <div className="section-header">
                <div className="section-icon">💬</div>
                <h3 className="section-title">{language === 'ar' ? 'رسالتك' : 'Your Message'}</h3>
              </div>
              <div className="form-group">
                <label htmlFor="message" className="form-label">{language === 'ar' ? 'نص الرسالة' : 'Message Text'}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="form-textarea"
                  rows={5}
                  placeholder={language === 'ar' ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                ></textarea>
              </div>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="submit-button">
                <span className="button-icon">📤</span>
                {language === 'ar' ? 'إرسال الرسالة' : 'Send Message'}
              </button>
            </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cooperation;
