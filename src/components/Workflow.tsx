import React from 'react';
import './Workflow.css';

const Workflow: React.FC = () => {
  return (
    <section className="workflow-section">
      <div className="container">
        <h2 className="workflow-title">خطوات العمل</h2>
        
        <div className="workflow-steps">
          <div className="workflow-step">
            <div className="step-icon">
              <div className="icon-magnifying-glass">
                <div className="glass-circle"></div>
                <div className="glass-handle"></div>
                <div className="location-pin"></div>
              </div>
            </div>
            <p className="step-text">جمع المعلومات وتحليل البيانات</p>
          </div>
          
          <div className="workflow-step">
            <div className="step-icon">
              <div className="icon-pie-chart">
                <div className="chart-segment segment-1"></div>
                <div className="chart-segment segment-2"></div>
                <div className="chart-segment segment-3"></div>
                <div className="chart-segment segment-4"></div>
              </div>
            </div>
            <p className="step-text">اختيار طريقة التقييم المناسبة</p>
          </div>
          
          <div className="workflow-step">
            <div className="step-icon">
              <div className="icon-document">
                <div className="document-page"></div>
                <div className="document-lines">
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
                </div>
              </div>
            </div>
            <p className="step-text">إعداد التقرير النهائي</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workflow;
