import React from 'react';
import Header from '../components/Header';
import Home from '../components/Home';
import Footer from '../components/Footer';
import { Page } from '../types/navigation';

interface HomePageProps {
  navigateToPage?: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigateToPage }) => {
  return (
    <div className="page home-page" dir="ltr">
      <Header navigateToPage={navigateToPage} isHomePage={true} />
      <Home navigateToPage={navigateToPage} />
      <Footer />
    </div>
  );
};

export default HomePage;