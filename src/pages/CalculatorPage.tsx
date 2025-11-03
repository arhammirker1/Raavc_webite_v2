import React from 'react';
import Header from '../components/Header';
import Calculator from '../components/Calculator';
import Footer from '../components/Footer';
import { Page } from '../types/navigation';

interface CalculatorPageProps {
  navigateToPage?: (page: Page) => void;
}

const CalculatorPage: React.FC<CalculatorPageProps> = ({ navigateToPage }) => {
  return (
    <div className="page" dir="ltr">
      <Header navigateToPage={navigateToPage} isHomePage={false} />
      <Calculator />
      <Footer />
    </div>
  );
};

export default CalculatorPage;
