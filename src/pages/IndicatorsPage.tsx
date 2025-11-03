import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { Page } from '../types/navigation';
import './IndicatorsPage.css';

interface IndicatorsPageProps {
  navigateToPage?: (page: Page) => void;
}

const IndicatorsPage: React.FC<IndicatorsPageProps> = ({ navigateToPage }) => {
  const { language } = useLanguage();
  
  return (
    <div className="indicators-page">
      <Header navigateToPage={navigateToPage} isHomePage={false} />
      
      <section className="indicators-content">
        <div className="container">
          <div className="indicators-grid">
            <div className="indicator-card">
              <div className="indicator-header">
                <div className="indicator-icon">📈</div>
                <h3 className="indicator-title">{language === 'ar' ? 'مؤشر الأسعار' : 'Price Index'}</h3>
              </div>
              <div className="indicator-value">+12.5%</div>
              <div className="indicator-description">
                {language === 'ar' ? 'ارتفاع متوسط أسعار العقارات السكنية هذا العام' : 'Rise in average residential property prices this year'}
              </div>
              <div className="indicator-trend positive">
                <span className="trend-arrow">↗</span>
                <span className="trend-text">{language === 'ar' ? 'اتجاه صاعد' : 'Upward Trend'}</span>
              </div>
            </div>

            <div className="indicator-card">
              <div className="indicator-header">
                <div className="indicator-icon">🏢</div>
                <h3 className="indicator-title">{language === 'ar' ? 'العقارات التجارية' : 'Commercial Properties'}</h3>
              </div>
              <div className="indicator-value">+8.3%</div>
              <div className="indicator-description">
                {language === 'ar' ? 'نمو في أسعار العقارات التجارية' : 'Growth in commercial property prices'}
              </div>
              <div className="indicator-trend positive">
                <span className="trend-arrow">↗</span>
                <span className="trend-text">{language === 'ar' ? 'اتجاه صاعد' : 'Upward Trend'}</span>
              </div>
            </div>

            <div className="indicator-card">
              <div className="indicator-header">
                <div className="indicator-icon">🏠</div>
                <h3 className="indicator-title">{language === 'ar' ? 'العقارات السكنية' : 'Residential Properties'}</h3>
              </div>
              <div className="indicator-value">+15.2%</div>
              <div className="indicator-description">
                {language === 'ar' ? 'زيادة في أسعار الوحدات السكنية' : 'Increase in residential unit prices'}
              </div>
              <div className="indicator-trend positive">
                <span className="trend-arrow">↗</span>
                <span className="trend-text">{language === 'ar' ? 'اتجاه صاعد' : 'Upward Trend'}</span>
              </div>
            </div>

            <div className="indicator-card">
              <div className="indicator-header">
                <div className="indicator-icon">🌾</div>
                <h3 className="indicator-title">{language === 'ar' ? 'الأراضي' : 'Land'}</h3>
              </div>
              <div className="indicator-value">+6.7%</div>
              <div className="indicator-description">
                {language === 'ar' ? 'نمو في أسعار الأراضي الاستثمارية' : 'Growth in investment land prices'}
              </div>
              <div className="indicator-trend positive">
                <span className="trend-arrow">↗</span>
                <span className="trend-text">{language === 'ar' ? 'اتجاه صاعد' : 'Upward Trend'}</span>
              </div>
            </div>

            <div className="indicator-card">
              <div className="indicator-header">
                <div className="indicator-icon">📊</div>
                <h3 className="indicator-title">{language === 'ar' ? 'حجم المعاملات' : 'Transaction Volume'}</h3>
              </div>
              <div className="indicator-value">+22.1%</div>
              <div className="indicator-description">
                {language === 'ar' ? 'زيادة في عدد المعاملات العقارية' : 'Increase in number of real estate transactions'}
              </div>
              <div className="indicator-trend positive">
                <span className="trend-arrow">↗</span>
                <span className="trend-text">{language === 'ar' ? 'اتجاه صاعد' : 'Upward Trend'}</span>
              </div>
            </div>

            <div className="indicator-card">
              <div className="indicator-header">
                <div className="indicator-icon">💰</div>
                <h3 className="indicator-title">{language === 'ar' ? 'الاستثمار الأجنبي' : 'Foreign Investment'}</h3>
              </div>
              <div className="indicator-value">+18.9%</div>
              <div className="indicator-description">
                {language === 'ar' ? 'نمو في الاستثمارات الأجنبية في القطاع العقاري' : 'Growth in foreign investments in the real estate sector'}
              </div>
              <div className="indicator-trend positive">
                <span className="trend-arrow">↗</span>
                <span className="trend-text">{language === 'ar' ? 'اتجاه صاعد' : 'Upward Trend'}</span>
              </div>
            </div>
          </div>

          <div className="market-analysis">
            <h2 className="analysis-title">{language === 'ar' ? 'تحليل السوق' : 'Market Analysis'}</h2>
            <div className="analysis-content">
              <div className="analysis-text">
                <p>
                  {language === 'ar' ? (
                    <>
                      يشهد السوق العقاري السعودي نمواً ملحوظاً خلال العام الحالي، مدفوعاً برؤية 2030 
                      والاستثمارات الكبيرة في البنية التحتية والمشاريع التنموية. تظهر المؤشرات تحسناً 
                      في جميع قطاعات العقارات مع توقعات إيجابية للفترة القادمة.
                    </>
                  ) : (
                    <>
                      The Saudi real estate market is witnessing remarkable growth during the current year, 
                      driven by Vision 2030 and large investments in infrastructure and development projects. 
                      Indicators show improvement in all real estate sectors with positive expectations for the coming period.
                    </>
                  )}
                </p>
                <p>
                  {language === 'ar' ? (
                    <>
                      تشهد المدن الرئيسية مثل الرياض وجدة والدمام أعلى معدلات النمو، مع تركيز خاص 
                      على المشاريع السكنية والتجارية المطورة وفقاً لأحدث المعايير العالمية.
                    </>
                  ) : (
                    <>
                      Major cities such as Riyadh, Jeddah, and Dammam are witnessing the highest growth rates, 
                      with special focus on residential and commercial projects developed according to the latest international standards.
                    </>
                  )}
                </p>
              </div>
              <div className="analysis-chart">
                <div className="chart-placeholder">
                  <div className="chart-icon">📊</div>
                  <p>{language === 'ar' ? 'رسم بياني للمؤشرات' : 'Indicator Chart'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default IndicatorsPage;