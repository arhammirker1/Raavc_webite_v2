import React, { useState, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Stats.css';

const Stats: React.FC = () => {
  const [statsRef, isStatsVisible] = useScrollAnimation(0.1);
  const [counters, setCounters] = useState({
    experience: 0,
    projects: 0,
    employees: 0,
    current: 0
  });

  const targetValues = {
    experience: 20,
    projects: 320,
    employees: 21,
    current: 87
  };

  useEffect(() => {
    if (!isStatsVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    const intervals = Object.keys(targetValues).map((key) => {
      const target = targetValues[key as keyof typeof targetValues];
      const increment = target / steps;
      let current = 0;

      return setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(intervals[Object.keys(targetValues).indexOf(key)]);
        }

        setCounters(prev => ({
          ...prev,
          [key]: Math.floor(current)
        }));
      }, stepDuration);
    });

    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  }, [isStatsVisible]);

  return (
    <section ref={statsRef as React.RefObject<HTMLElement>} className={`stats-section ${isStatsVisible ? 'visible' : ''}`}>
      <div className="container">
        <div className="stats-grid animate-stagger">
          <div className="stat-item animate-fade-in-up hover-lift">
            <div className="stat-number">+{counters.experience}</div>
            <div className="stat-label">عام من الخبرة</div>
          </div>
          
          <div className="stat-item animate-fade-in-up hover-lift">
            <div className="stat-number">+{counters.projects}</div>
            <div className="stat-label">المشاريع المنجزة</div>
          </div>
          
          <div className="stat-item animate-fade-in-up hover-lift">
            <div className="stat-number">+{counters.employees}</div>
            <div className="stat-label">الموظفين الخبراء</div>
          </div>
          
          <div className="stat-item animate-fade-in-up hover-lift">
            <div className="stat-number">+{counters.current}</div>
            <div className="stat-label">المشاريع الحالية</div>
          </div>
        </div>
        
        <div className="stats-divider animate-fade-in"></div>
        
        <div className="stats-slogan animate-fade-in-up">
          <p>تحديد القيمة .. قيادة الاستثمارات</p>
        </div>
      </div>
    </section>
  );
};

export default Stats;
