import React from 'react';
import videoFile from '../assets/vid.mp4';
import './VideoSection.css';

const VideoSection: React.FC = () => {
  return (
    <section className="video-section">
      <div className="container">
        <div className="video-wrapper">
          <video 
            className="main-video"
            controls
            preload="metadata"
            poster=""
          >
            <source src={videoFile} type="video/mp4" />
            متصفحك لا يدعم تشغيل الفيديو
          </video>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
