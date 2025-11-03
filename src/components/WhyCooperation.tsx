import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './WhyCooperation.css';

const WhyCooperation: React.FC = () => {
  const { language } = useLanguage();
  
  const reasons = [
    {
      number: 1,
      title: language === 'ar' ? "أنظمة تقييم ذكية متوافقة مع معايير الهيئة السعودية للمقيّمين المعتمدين" : "Smart evaluation systems compatible with Saudi Authority for Accredited Valuers standards",
      description: language === 'ar' ? "اعتمد على أنظمة تقييم مطوّرة وفق أحدث المعايير الرسمية لضمان الدقة والمصداقية." : "Rely on evaluation systems developed according to the latest official standards to ensure accuracy and credibility."
    },
    {
      number: 2,
      title: language === 'ar' ? "تقارير تقييم تفاعلية قابلة للتخصيص والطباعة والتسليم الرقمي" : "Interactive evaluation reports customizable, printable, and digitally deliverable",
      description: language === 'ar' ? "أنشئ تقارير تقييم احترافية تعكس علامتك التجارية، وشاركها رقميًا أو ورقيًا بكل سهولة." : "Create professional evaluation reports that reflect your brand, and share them digitally or on paper with ease."
    },
    {
      number: 3,
      title: language === 'ar' ? "بوابة إلكترونية سهلة الاستخدام لإدارة المهام والمشاريع العقارية بكفاءة" : "Easy-to-use electronic portal for efficient management of real estate tasks and projects",
      description: language === 'ar' ? "تحكم كامل في مشاريعك من خلال منصة موحّدة مصممة لزيادة الإنتاجية وتقليل الأخطاء." : "Complete control over your projects through a unified platform designed to increase productivity and reduce errors."
    },
    {
      number: 4,
      title: language === 'ar' ? "دعم تقني وفني مستمر من فريق متخصص في العقار والتقنية" : "Continuous technical and professional support from a team specialized in real estate and technology",
      description: language === 'ar' ? "نرافقك خطوة بخطوة بدعم احترافي من خبراء يفهمون احتياجات التقييم العقاري." : "We accompany you step by step with professional support from experts who understand real estate appraisal needs."
    },
    {
      number: 5,
      title: language === 'ar' ? "أدوات تكامل API لربط أنظمتنا بمنصتكم الحالية بكل سلاسة" : "API integration tools to seamlessly connect our systems to your current platform",
      description: language === 'ar' ? "سهل عملك بربط مباشر بين أنظمتك ومنصة رافك دون تعقيدات أو تأخير." : "Simplify your work with direct integration between your systems and Raavc platform without complications or delays."
    }
  ];

  return (
    <section className="why-cooperation">
      <div className="container">
        <h2 className="section-title">{language === 'ar' ? 'لماذا تتعاون معنا؟' : 'Why Cooperate with Us?'}</h2>
        
        <div className="reasons-list">
          {reasons.map((reason, index) => (
            <div key={index} className="reason-item">
              <div className="reason-number">{reason.number}</div>
              <div className="reason-content">
                <h3 className="reason-title">{reason.title}</h3>
                <p className="reason-description">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyCooperation;
