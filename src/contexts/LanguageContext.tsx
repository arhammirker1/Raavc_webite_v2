import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Professional translations
const translations = {
  ar: {
    // Navigation
    'nav.home': 'الصفحة الرئيسية',
    'nav.about': 'من نحن',
    'nav.services': 'الخدمات',
    'nav.cooperation': 'للتعاون',
    'nav.contact': 'تواصل معنا',
    'nav.job': 'طلب توظيف',
    'nav.guide': 'دليل التقييم العقاري',
    'nav.calculator': 'حاسبة التقييم العقاري',
    'nav.evaluation': 'طلب تقييم عقاري',
    'nav.deals': 'الصفقات',
    'nav.indicators': 'المؤشرات',
    
    // Home page
    'home.title': 'التمكين المستدام',
    'home.subtitle': 'لعالم أكثر اتصالا',
    'home.description': 'نتميز بتقديم حلول رقمية في مجال تقنية المعلومات مما يساهم في تلبية احتياجات السوق بفاعلية تتضمن نطاق واسع من الحلول المعلوماتية.',
    'home.login': 'تسجيل الدخول',
    'home.consultation': 'اطلب استشارة الآن',
    
    // Services
    'services.realEstate': 'التقييم العقاري',
    'services.realEstateDesc': 'يعتمد على معاملات حقيقية وأساليب متعددة (السوق، التكلفة، الدخل) لإصدار قيمة في دقائق.',
    'services.indicators': 'المؤشرات العقارية',
    'services.indicatorsDesc': 'لوحات تحليلية تفاعلية توضح اتجاهات الأسعار، الأحياء الأسرع نمواً، وعوائد الإيجارات، مما يمنح المستثمر رؤية استباقية للسوق.',
    'services.more': 'المزيد',
    
    // Deals page
    'deals.title': 'صفقاتنا العقارية',
    'deals.subtitle': 'اكتشف أفضل الفرص الاستثمارية في السوق العقاري السعودي',
    'deals.filters': 'فلترة العقارات',
    'deals.region': 'المنطقة',
    'deals.city': 'المدينة',
    'deals.neighborhood': 'الحي',
    'deals.allRegions': 'جميع المناطق',
    'deals.allCities': 'جميع المدن',
    'deals.allNeighborhoods': 'جميع الأحياء',
    'deals.searchNeighborhood': 'ابحث عن الحي...',
    'deals.clearFilters': 'مسح الفلاتر',
    'deals.results': 'عرض {count} من أصل {total} عقار',
    'deals.noResults': 'لا توجد عقارات تطابق البحث',
    'deals.noResultsDesc': 'جرب تغيير معايير البحث أو مسح الفلاتر',
    'deals.viewDetails': 'عرض التفاصيل',
    
    // Indicators page
    'indicators.title': 'مؤشرات السوق العقاري',
    'indicators.subtitle': 'تابع أحدث المؤشرات والإحصائيات في السوق العقاري السعودي',
    'indicators.priceIndex': 'مؤشر الأسعار',
    'indicators.commercial': 'العقارات التجارية',
    'indicators.residential': 'العقارات السكنية',
    'indicators.land': 'الأراضي',
    'indicators.volume': 'حجم المعاملات',
    'indicators.foreign': 'الاستثمار الأجنبي',
    'indicators.analysis': 'تحليل السوق',
    'indicators.analysisText1': 'يشهد السوق العقاري السعودي نمواً ملحوظاً خلال العام الحالي، مدفوعاً برؤية 2030 والاستثمارات الكبيرة في البنية التحتية والمشاريع التنموية. تظهر المؤشرات تحسناً في جميع قطاعات العقارات مع توقعات إيجابية للفترة القادمة.',
    'indicators.analysisText2': 'تشهد المدن الرئيسية مثل الرياض وجدة والدمام أعلى معدلات النمو، مع تركيز خاص على المشاريع السكنية والتجارية المطورة وفقاً لأحدث المعايير العالمية.',
    'indicators.chartText': 'رسم بياني للمؤشرات',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ',
    'common.success': 'تم بنجاح',
    'common.cancel': 'إلغاء',
    'common.save': 'حفظ',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.view': 'عرض',
    'common.more': 'المزيد',
    'common.back': 'رجوع',
    'common.next': 'التالي',
    'common.previous': 'السابق',
    'common.submit': 'إرسال',
    'common.search': 'بحث',
    'common.filter': 'فلترة',
    'common.clear': 'مسح',
    'common.apply': 'تطبيق',
    
    // Authentication
    'login': 'تسجيل الدخول',
    'register': 'إنشاء حساب',
    'logout': 'تسجيل الخروج',
    'name': 'الاسم',
    'email': 'البريد الإلكتروني',
    'password': 'كلمة المرور',
    'confirmPassword': 'تأكيد كلمة المرور',
    'loginSubtitle': 'مرحباً بك مرة أخرى',
    'registerSubtitle': 'أنشئ حسابك للبدء',
    'namePlaceholder': 'أدخل اسمك الكامل',
    'emailPlaceholder': 'أدخل بريدك الإلكتروني',
    'passwordPlaceholder': 'أدخل كلمة المرور',
    'confirmPasswordPlaceholder': 'أعد إدخال كلمة المرور',
    'haveAccount': 'لديك حساب بالفعل؟',
    'noAccount': 'ليس لديك حساب؟',
    'loginError': 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
    'registerError': 'حدث خطأ أثناء التسجيل',
    'emailExists': 'هذا البريد الإلكتروني مسجل بالفعل',
    'nameRequired': 'الاسم مطلوب',
    'emailRequired': 'البريد الإلكتروني مطلوب',
    'passwordLength': 'كلمة المرور يجب أن تكون أكثر من 5 أحرف',
    'passwordMismatch': 'كلمات المرور غير متطابقة',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.services': 'Services',
    'nav.cooperation': 'Cooperation',
    'nav.contact': 'Contact Us',
    'nav.job': 'Job Application',
    'nav.guide': 'Appraisal Guide',
    'nav.calculator': 'Property Calculator',
    'nav.evaluation': 'Request Evaluation',
    'nav.deals': 'Deals',
    'nav.indicators': 'Indicators',
    
    // Home page
    'home.title': 'Sustainable Empowerment',
    'home.subtitle': 'For a More Connected World',
    'home.description': 'We specialize in providing digital solutions in the field of information technology, contributing to meeting market needs effectively, including a wide range of information solutions.',
    'home.login': 'Login',
    'home.consultation': 'Request Consultation Now',
    
    // Services
    'services.realEstate': 'Real Estate Appraisal',
    'services.realEstateDesc': 'Based on real transactions and multiple methods (market, cost, income) to issue value in minutes.',
    'services.indicators': 'Real Estate Indicators',
    'services.indicatorsDesc': 'Interactive analytical dashboards showing price trends, fastest-growing neighborhoods, and rental returns, giving investors a proactive view of the market.',
    'services.more': 'More',
    
    // Deals page
    'deals.title': 'Our Real Estate Deals',
    'deals.subtitle': 'Discover the best investment opportunities in the Saudi real estate market',
    'deals.filters': 'Filter Properties',
    'deals.region': 'Region',
    'deals.city': 'City',
    'deals.neighborhood': 'Neighborhood',
    'deals.allRegions': 'All Regions',
    'deals.allCities': 'All Cities',
    'deals.allNeighborhoods': 'All Neighborhoods',
    'deals.searchNeighborhood': 'Search neighborhood...',
    'deals.clearFilters': 'Clear Filters',
    'deals.results': 'Showing {count} of {total} properties',
    'deals.noResults': 'No properties match the search',
    'deals.noResultsDesc': 'Try changing search criteria or clear filters',
    'deals.viewDetails': 'View Details',
    
    // Indicators page
    'indicators.title': 'Real Estate Market Indicators',
    'indicators.subtitle': 'Follow the latest indicators and statistics in the Saudi real estate market',
    'indicators.priceIndex': 'Price Index',
    'indicators.commercial': 'Commercial Properties',
    'indicators.residential': 'Residential Properties',
    'indicators.land': 'Land',
    'indicators.volume': 'Transaction Volume',
    'indicators.foreign': 'Foreign Investment',
    'indicators.analysis': 'Market Analysis',
    'indicators.analysisText1': 'The Saudi real estate market is witnessing remarkable growth during the current year, driven by Vision 2030 and large investments in infrastructure and development projects. Indicators show improvement in all real estate sectors with positive expectations for the coming period.',
    'indicators.analysisText2': 'Major cities such as Riyadh, Jeddah, and Dammam are witnessing the highest growth rates, with special focus on residential and commercial projects developed according to the latest international standards.',
    'indicators.chartText': 'Indicator Chart',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error occurred',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.more': 'More',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.submit': 'Submit',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.clear': 'Clear',
    'common.apply': 'Apply',
    
    // Authentication
    'login': 'Login',
    'register': 'Register',
    'logout': 'Logout',
    'name': 'Name',
    'email': 'Email',
    'password': 'Password',
    'confirmPassword': 'Confirm Password',
    'loginSubtitle': 'Welcome back',
    'registerSubtitle': 'Create your account to get started',
    'namePlaceholder': 'Enter your full name',
    'emailPlaceholder': 'Enter your email',
    'passwordPlaceholder': 'Enter your password',
    'confirmPasswordPlaceholder': 'Re-enter your password',
    'haveAccount': 'Already have an account?',
    'noAccount': "Don't have an account?",
    'loginError': 'Invalid email or password',
    'registerError': 'Registration failed',
    'emailExists': 'This email is already registered',
    'nameRequired': 'Name is required',
    'emailRequired': 'Email is required',
    'passwordLength': 'Password must be more than 5 characters',
    'passwordMismatch': 'Passwords do not match',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar'); // Default to Arabic

  useEffect(() => {
    // Load language from localStorage or default to Arabic
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'ar' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
