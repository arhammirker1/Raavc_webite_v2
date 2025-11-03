import React from 'react';
import Header from '../components/Header';
import Cooperation from '../components/Cooperation';
import Footer from '../components/Footer';
import { Page } from '../types/navigation';

interface CooperationPageProps {
  navigateToPage?: (page: Page) => void;
}

const CooperationPage: React.FC<CooperationPageProps> = ({ navigateToPage }) => {
  return (
    <div className="page" dir="ltr">
      <Header navigateToPage={navigateToPage} isHomePage={false} />
      <Cooperation navigateToPage={navigateToPage} />
      <Footer />
    </div>
  );
};

export default CooperationPage;
