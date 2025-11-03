import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Services.css';

const Services: React.FC = () => {
  const [servicesRef, isServicesVisible] = useScrollAnimation(0.1);
  
  const services = [
    {
      title: "التسجيل العيني الأول",
      description: "تتيح هذه الخدمة للمستفيد تقديم طلب التسجيل العيني الأول للملكيات العقارية في المناطق العقارية المعلنة.",
      icon: "🏢",
      cost: "بدون مقابل مالي",
      time: null
    },
    {
      title: "المناطق العقارية المعلنة",
      description: "تتيح لك الخدمة التعرف على المناطق العقارية المعلن عنها، حيث يمكن لأصحاب العقارات تقديم طلب التسجيل الأول الخاص بهم والاستفادة من خدمات السجل العقاري.",
      icon: "🔄",
      cost: "بدون مقابل مالي",
      time: "فوري"
    },
    {
      title: "نقل الملكية",
      description: "تتيح هذه الخدمة للمستفيد نقل ملكية عقار مسجل عينيا إلى مالك آخر.",
      icon: "🤝",
      cost: "1600 إ.ر",
      time: "3 أيام عمل"
    },
    {
      title: "الفرز",
      description: "تتيح هذه الخدمة للمستفيد فرز عقار مسجل عينيا إلى عقارين أو أكثر وإصدار صك تسجيل ملكية لكل",
      icon: "↗️",
      cost: null,
      time: null
    },
    {
      title: "الدمج",
      description: "تتيح هذه الخدمة للمستفيد دمج عقارات مسجلة عينيا إلى عقار واحد.",
      icon: "↖️",
      cost: null,
      time: null
    },
    {
      title: "إدارة الحقوق والقيود والالتزامات",
      description: "تتح هذه الخدمة للمستفيد اضافة أو إزالة أو تعديل",
      icon: "🏴",
      cost: null,
      time: null
    }
  ];

  return (
    <section ref={servicesRef as React.RefObject<HTMLElement>} className={`services-section ${isServicesVisible ? 'visible' : ''}`}>
      <div className="container">
        <h2 className="services-title animate-fade-in-up">حلول رقمية عقارية متكاملة</h2>
        
        <div className="services-grid animate-stagger">
          {services.map((service, index) => (
            <div key={index} className="service-card animate-fade-in-up hover-lift">
              <div className="service-icon float-animation">
                <span className="icon-text">{service.icon}</span>
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-details">
                {service.time && (
                  <div className="service-detail">
                    <span className="detail-icon">⏰</span>
                    <span className="detail-text">{service.time}</span>
                  </div>
                )}
                {service.cost && (
                  <div className="service-detail">
                    <span className="detail-icon">💰</span>
                    <span className="detail-text">{service.cost}</span>
                  </div>
                )}
              </div>
              <button className="service-button hover-scale">اعرف المزيد ←</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
