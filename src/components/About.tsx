import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './About.css';

const About: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <section id="about" className="about-page">
      <div className="container">
        <div className="about-content">
          <p className="about-text">
            {language === 'ar' ? (
              'نحن شركة تقنية متخصصة في تطوير حلول ذكية ومبتكرة لقطاع العقارات. نؤمن أن التكنولوجيا قادرة على إحداث نقلة نوعية في طريقة البيع، الشراء، والاستثمار، ولهذا نوفر لعملائنا أدوات رقمية متقدمة تساعدهم على اتخاذ قرارات أسرع وأكثر دقة.'
            ) : (
              'We are a technology company specialized in developing smart and innovative solutions for the real estate sector. We believe that technology can bring about a qualitative shift in the way of selling, buying, and investing, which is why we provide our clients with advanced digital tools that help them make faster and more accurate decisions.'
            )}
          </p>
          
          <p className="about-text">
            {language === 'ar' ? (
              'نعمل على ربط السوق العقاري بالتحول الرقمي من خلال منصات مرنة، وتجارب مستخدم مصممة بعناية، وواجهات سهلة تعزز الكفاءة وتفتح آفاقًا جديدة للنمو والفرص.'
            ) : (
              'We work to connect the real estate market with digital transformation through flexible platforms, carefully designed user experiences, and easy interfaces that enhance efficiency and open new horizons for growth and opportunities.'
            )}
          </p>
          
          <p className="about-text">
            {language === 'ar' ? (
              'نحن لا نقدم مجرد خدمات عقارية، بل نبني منظومة تقنية متكاملة تعيد تشكيل مستقبل السوق العقاري.'
            ) : (
              'We do not just provide real estate services, but build an integrated technical system that reshapes the future of the real estate market.'
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
