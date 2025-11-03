import React from 'react';
import Header from '../components/Header';
import About from '../components/About';
import Footer from '../components/Footer';
import { Page } from '../types/navigation';

interface AboutPageProps {
  navigateToPage?: (page: Page) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ navigateToPage }) => {
  return (
    <div className="page" dir="ltr">
      <Header navigateToPage={navigateToPage} isHomePage={false} />
      <About />
      <Footer />
    </div>
  );
};

export default AboutPage;
