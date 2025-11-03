export const translations = {
  ar: {
    // Navigation
    home: 'الصفحة الرئيسية',
    about: 'من نحن',
    calculator: 'حاسبة التقييم العقاري',
    cooperation: 'للتعاون',
    contact: 'تواصل معنا',
    evaluationRequest: 'طلب تقييم عقاري',
    jobRequest: 'طلب توظيف',
    guide: 'دليل التقييم العقاري',
    
    // Home page
    companySubtitle: 'شركة تقنية عقارية',
    mainTitle: 'نربط بين التقنية والعقار... لتقييم ذكي، أسرع، وأدق',
    contactUs: 'تواصل معنا',
    
    // Services
    servicesTitle: 'حلول رقمية عقارية متكاملة',
    firstRegistration: 'التسجيل العيني الأول',
    firstRegistrationDesc: 'تتيح هذه الخدمة للمستفيد تقديم طلب التسجيل العيني الأول للملكيات العقارية في المناطق العقارية المعلنة.',
    declaredAreas: 'المناطق العقارية المعلنة',
    declaredAreasDesc: 'تتيح لك الخدمة التعرف على المناطق العقارية المعلن عنها، حيث يمكن لأصحاب العقارات تقديم طلب التسجيل الأول الخاص بهم والاستفادة من خدمات السجل العقاري.',
    ownershipTransfer: 'نقل الملكية',
    ownershipTransferDesc: 'تتيح هذه الخدمة للمستفيد نقل ملكية عقار مسجل عينيا إلى مالك آخر.',
    segregation: 'الفرز',
    segregationDesc: 'تتيح هذه الخدمة للمستفيد فرز عقار مسجل عينيا إلى عقارين أو أكثر وإصدار صك تسجيل ملكية لكل',
    merger: 'الدمج',
    mergerDesc: 'تتيح هذه الخدمة للمستفيد دمج عقارات مسجلة عينيا إلى عقار واحد.',
    rightsManagement: 'إدارة الحقوق والقيود والالتزامات',
    rightsManagementDesc: 'تتح هذه الخدمة للمستفيد اضافة أو إزالة أو تعديل',
    learnMore: 'اعرف المزيد ←',
    noCost: 'بدون مقابل مالي',
    instant: 'فوري',
    threeDays: '3 أيام عمل',
    cost1600: '1600 إ.ر',
    
    // Footer
    footerDescription: 'شركة تقنية سعودية موجهة للقطاع العقاري، نعمل على تمكين شركات العقارات من تحسين الكفاءة، وتسريع العمليات، وضمان أعلى مستويات الدقة في التقارير العقارية، نقدم خدمات استشارية وحلول مبتكرة تدعم القرارات الاستثمارية وتعزز العوائد المالية.',
    email: 'info@raavc.com',
    phone: '966580069350',
  },
  en: {
    // Navigation
    home: 'Home',
    about: 'About Us',
    calculator: 'Real Estate Calculator',
    cooperation: 'Cooperation',
    contact: 'Contact Us',
    evaluationRequest: 'Evaluation Request',
    jobRequest: 'Job Request',
    guide: 'Real Estate Guide',
    
    // Home page
    companySubtitle: 'Real Estate Technology Company',
    mainTitle: 'Connecting Technology and Real Estate... for Smarter, Faster, and More Accurate Evaluation',
    contactUs: 'Contact Us',
    
    // Services
    servicesTitle: 'Integrated Digital Real Estate Solutions',
    firstRegistration: 'First Eye Registration',
    firstRegistrationDesc: 'This service allows the beneficiary to submit the first eye registration application for real estate properties in declared real estate areas.',
    declaredAreas: 'Declared Real Estate Areas',
    declaredAreasDesc: 'This service allows you to identify the declared real estate areas, where property owners can submit their first registration application and benefit from real estate registry services.',
    ownershipTransfer: 'Ownership Transfer',
    ownershipTransferDesc: 'This service allows the beneficiary to transfer the ownership of a registered property to another owner.',
    segregation: 'Segregation',
    segregationDesc: 'This service allows the beneficiary to segregate a registered property into two or more properties and issue a title deed for each',
    merger: 'Merger',
    mergerDesc: 'This service allows the beneficiary to merge registered properties into a single property.',
    rightsManagement: 'Rights, Restrictions and Obligations Management',
    rightsManagementDesc: 'This service allows the beneficiary to add, remove or modify',
    learnMore: 'Learn More ←',
    noCost: 'No financial cost',
    instant: 'Instant',
    threeDays: '3 working days',
    cost1600: '1600 SAR',
    
    // Footer
    footerDescription: 'A Saudi technology company focused on the real estate sector, we work to enable real estate companies to improve efficiency, accelerate operations, and ensure the highest levels of accuracy in real estate reports, we provide consulting services and innovative solutions that support investment decisions and enhance financial returns.',
    email: 'info@raavc.com',
    phone: '966580069350',
  }
};

export type Language = 'ar' | 'en';
export type TranslationKey = keyof typeof translations.ar;
