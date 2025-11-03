import React from 'react';
import Header from '../components/Header';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { Page } from '../types/navigation';

interface ContactPageProps {
  navigateToPage?: (page: Page) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ navigateToPage }) => {
  return (
    <div className="page" dir="ltr">
      <Header navigateToPage={navigateToPage} isHomePage={false} />
      <Contact />
      <Footer />
    </div>
  );
};

export default ContactPage;
