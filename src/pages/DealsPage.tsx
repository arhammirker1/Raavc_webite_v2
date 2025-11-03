import React, { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { Page } from '../types/navigation';
import './DealsPage.css';

interface DealsPageProps {
  navigateToPage?: (page: Page) => void;
}

interface Property {
  id: number;
  title: string;
  location: string;
  type: string;
  area: string;
  price: string;
  pricePerSqm: string;
  bedrooms?: string;
  bathrooms?: string;
  floors?: string;
  frontage?: string;
  height?: string;
  discount?: string;
  region: string;
  city: string;
  neighborhood: string;
}

const DealsPage: React.FC<DealsPageProps> = ({ navigateToPage }) => {
  const [filters, setFilters] = useState({
    region: '',
    city: '',
    neighborhood: ''
  });
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [cities, setCities] = useState<{[key: string]: number}>({});
  const [neighborhoodSuggestions, setNeighborhoodSuggestions] = useState<string[]>([]);
  const [showNeighborhoodSuggestions, setShowNeighborhoodSuggestions] = useState(false);
  const { language } = useLanguage();

  const handlePropertyClick = (id: number) => {
    // Navigate to individual property page
    window.location.href = `/deals/${id}`;
  };

  // Regions data from calculator
  const regionsData = {
    "الرياض": { "الرياض": 6000, "الخرج": 2500, "الدرعية": 5500, "الدلم": 2000, "الدوادمي": 1800, "الحريق": 1500, "الزلفي": 2200, "السليل": 1200, "الغاط": 1600, "القويعية": 1800, "المجمعة": 2000, "المزاحمية": 2500, "الهياتم": 1800, "حوطة بني تميم": 2000, "رماح": 1500, "شقراء": 1700, "عفيف": 1600, "نادق": 1300, "ضفاء": 1200, "وادي الدواسر": 1500, "الأفلاج": 1300, "ضرما": 2000, "ثادق": 1800 },
    "مكة المكرمة": { "جدة": 6500, "مكة المكرمة": 5000, "الطائف": 3000, "الجموم": 2200, "الخرمة": 1600, "القنفذة": 2000, "الكامل": 1800, "الليث": 1700, "العرضيات": 1500, "بحرة": 2500, "تربة": 1600, "رابغ": 2200, "رنية": 1500, "ميسان": 1400, "نول": 1300, "أضم": 1500, "مدينة الملك عبد الله": 3500, "خليص": 2000 },
    "المدينة المنورة": { "المدينة المنورة": 4000, "العلا": 2000, "الحناكية": 1600, "بدر": 1700, "خيبر": 1500, "مهد الذهب": 1400, "وادي الفرع": 1300, "ينبع": 2500, "العيص": 1500 },
    "القصيم": { "بريدة": 3000, "البدائع": 1800, "البكيرية": 1900, "الرس": 2000, "الشماسية": 1700, "المذنب": 1800, "النبهانية": 1600, "رياض الخبراء": 1900, "عنيزة": 2500, "عظم الصفور": 1500, "عيون الجواء": 1600, "ضرية": 1500 },
    "الشرقية": { "الدمام": 5500, "الجبيل": 3500, "الخبر": 5000, "الخفجي": 2500, "الظهران": 4000, "النعيرية": 2000, "العيون": 1900, "المبرز": 3000, "الهفوف": 3000, "الأحساء": 2500, "القطيف": 3500, "رأس تنورة": 2700, "بقيق": 2200, "ثقبة": 3000, "حفر الباطن": 2500, "سيهات": 2700, "صفوي": 2500, "عنك": 2200, "ناروت": 2000 },
    "عسير": { "أبها": 3000, "أحد رفيدة": 2500, "الحرجة": 1500, "البرك": 1600, "البلقرن": 1700, "البيشة": 2000, "النماص": 1800, "بارق": 1600, "تتليت": 1500, "خميس مشيط": 2700, "رجل المع": 1700, "سراة عبيدة": 1600, "طريب": 1500, "ظهران الجنوب": 1700, "محايل عسير": 1800, "المجاردة": 1600 },
    "تبوك": { "أملج": 2000, "تبوك": 2500, "تيماء": 1700, "حقل": 1800, "ضباء": 1900, "الوجه": 1800 },
    "حائل": { "بقعاء": 1700, "تربة حائل": 1600, "حائل": 2200, "الحائط": 1500, "السنان": 1500, "السليمي": 1400, "الشملي": 1400, "الغزالة": 1500, "سميراء": 1600 },
    "الحدود الشمالية": { "العويقيلة": 1300, "رفحاء": 1700, "طريف": 1600, "عرعر": 2000 },
    "جازان": { "أبو عريش": 2000, "أحد المسارحة": 1800, "الحرث": 1500, "العارضة": 1600, "بدمة": 1500, "بيش": 1700, "جازان": 2200, "جزر فرسان": 1300, "ضمد": 1600, "صامطة": 1800, "صبيا": 1900, "غامد الزناد": 1500, "الدرب": 1600, "الريت": 1500, "هروب": 1500, "الداير": 1600, "الريث": 1500 },
    "نجران": { "بدر الجنوب": 1500, "حبونا": 1600, "شرورة": 1800, "نجران": 2000, "الخرخير": 1300, "الوديعة": 1500, "بني حسن": 1600, "نار": 1300 },
    "الباحة": { "الباحة": 2000, "الحجرة": 1600, "الحقيق": 1500, "القرى": 1500, "المخواة": 1700, "المندق": 1600, "بلجرشي": 1800, "قلوة": 1600, "العقيق": 1500 },
    "الجوف": { "الغربات": 1300, "دومة الجندل": 1700, "سكاكا": 2000, "طبرجل": 1600, "القريات": 1800 }
  };

  const properties: Property[] = useMemo(() => [
    {
      id: 1,
      title: language === 'ar' ? "فيلا فاخرة في حي النرجس" : "Luxury Villa in Al-Narjis District",
      location: language === 'ar' ? "الرياض - حي النرجس" : "Riyadh - Al-Narjis District",
      type: language === 'ar' ? "فيلا سكنية" : "Residential Villa",
      area: language === 'ar' ? "450 متر مربع" : "450 sqm",
      price: language === 'ar' ? "2,500,000 ريال" : "2,500,000 SAR",
      pricePerSqm: language === 'ar' ? "5,556 ريال/م²" : "5,556 SAR/sqm",
      bedrooms: language === 'ar' ? "4 غرف" : "4 Bedrooms",
      bathrooms: language === 'ar' ? "3 حمامات" : "3 Bathrooms",
      region: "الرياض",
      city: "الرياض",
      neighborhood: "النرجس"
    },
    {
      id: 2,
      title: language === 'ar' ? "شقة بمنطقة الأعمال" : "Apartment in Business District",
      location: language === 'ar' ? "جدة - منطقة الأعمال" : "Jeddah - Business District",
      type: language === 'ar' ? "شقة سكنية" : "Residential Apartment",
      area: language === 'ar' ? "120 متر مربع" : "120 sqm",
      price: language === 'ar' ? "800,000 ريال" : "800,000 SAR",
      pricePerSqm: language === 'ar' ? "6,667 ريال/م²" : "6,667 SAR/sqm",
      bedrooms: language === 'ar' ? "2 غرف" : "2 Bedrooms",
      bathrooms: language === 'ar' ? "2 حمامات" : "2 Bathrooms",
      discount: language === 'ar' ? "10% أقل من السوق" : "10% Below Market",
      region: "مكة المكرمة",
      city: "جدة",
      neighborhood: "منطقة الأعمال"
    },
    {
      id: 3,
      title: language === 'ar' ? "مكتب تجاري في مركز المدينة" : "Commercial Office in City Center",
      location: language === 'ar' ? "الدمام - مركز المدينة" : "Dammam - City Center",
      type: language === 'ar' ? "مكتب تجاري" : "Commercial Office",
      area: language === 'ar' ? "200 متر مربع" : "200 sqm",
      price: language === 'ar' ? "1,200,000 ريال" : "1,200,000 SAR",
      pricePerSqm: language === 'ar' ? "6,000 ريال/م²" : "6,000 SAR/sqm",
      floors: language === 'ar' ? "طابقين" : "2 Floors",
      region: "الشرقية",
      city: "الدمام",
      neighborhood: "مركز المدينة"
    },
    {
      id: 4,
      title: language === 'ar' ? "أرض سكنية في مخطط جديد" : "Residential Land in New Development",
      location: language === 'ar' ? "الرياض - مخطط الشفاء" : "Riyadh - Al-Shifa Plan",
      type: language === 'ar' ? "أرض سكنية" : "Residential Land",
      area: language === 'ar' ? "800 متر مربع" : "800 sqm",
      price: language === 'ar' ? "1,600,000 ريال" : "1,600,000 SAR",
      pricePerSqm: language === 'ar' ? "2,000 ريال/م²" : "2,000 SAR/sqm",
      frontage: language === 'ar' ? "20 متر" : "20m",
      region: "الرياض",
      city: "الرياض",
      neighborhood: "مخطط الشفاء"
    },
    {
      id: 5,
      title: language === 'ar' ? "مستودع في المنطقة الصناعية" : "Warehouse in Industrial Zone",
      location: language === 'ar' ? "جدة - المنطقة الصناعية الثانية" : "Jeddah - Second Industrial Zone",
      type: language === 'ar' ? "مستودع" : "Warehouse",
      area: language === 'ar' ? "1000 متر مربع" : "1000 sqm",
      price: language === 'ar' ? "3,500,000 ريال" : "3,500,000 SAR",
      pricePerSqm: language === 'ar' ? "3,500 ريال/م²" : "3,500 SAR/sqm",
      height: language === 'ar' ? "6 أمتار" : "6m Height",
      region: "مكة المكرمة",
      city: "جدة",
      neighborhood: "المنطقة الصناعية الثانية"
    }
  ], [language]);

  // Initialize filtered properties
  useEffect(() => {
    setFilteredProperties(properties);
  }, [properties]);

  // Handle filter changes
  const handleRegionChange = (region: string) => {
    setFilters({ region, city: '', neighborhood: '' });
    if (region && regionsData[region as keyof typeof regionsData]) {
      setCities(regionsData[region as keyof typeof regionsData]);
    } else {
      setCities({});
    }
    filterProperties({ region, city: '', neighborhood: '' });
  };

  const handleCityChange = (city: string) => {
    setFilters({ ...filters, city, neighborhood: '' });
    filterProperties({ ...filters, city, neighborhood: '' });
  };

  const handleNeighborhoodChange = (neighborhood: string) => {
    const newFilters = { ...filters, neighborhood };
    setFilters(newFilters);
    filterProperties(newFilters);
    setShowNeighborhoodSuggestions(false);
  };

  const handleNeighborhoodInputChange = (value: string) => {
    setFilters({ ...filters, neighborhood: value });
    
    if (value.length > 0 && filters.city) {
      // Filter neighborhoods based on input
      const availableNeighborhoods = getNeighborhoodsForCity();
      const filtered = availableNeighborhoods.filter(neighborhood =>
        neighborhood.toLowerCase().includes(value.toLowerCase())
      );
      setNeighborhoodSuggestions(filtered);
      setShowNeighborhoodSuggestions(true);
    } else {
      setNeighborhoodSuggestions([]);
      setShowNeighborhoodSuggestions(false);
    }
    
    filterProperties({ ...filters, neighborhood: value });
  };

  // Filter properties based on selected filters
  const filterProperties = (currentFilters: typeof filters) => {
    let filtered = properties;

    if (currentFilters.region) {
      filtered = filtered.filter(property => property.region === currentFilters.region);
    }

    if (currentFilters.city) {
      filtered = filtered.filter(property => property.city === currentFilters.city);
    }

    if (currentFilters.neighborhood) {
      filtered = filtered.filter(property => property.neighborhood === currentFilters.neighborhood);
    }

    setFilteredProperties(filtered);
  };

  // Get unique neighborhoods for the selected city
  const getNeighborhoodsForCity = () => {
    if (!filters.city) return [];
    return Array.from(new Set(
      properties
        .filter(property => property.city === filters.city)
        .map(property => property.neighborhood)
    )).sort();
  };

  return (
    <div className="deals-page">
      <Header navigateToPage={navigateToPage} isHomePage={false} />

      <section className="deals-content">
        <div className="container">
          {/* Filters Section */}
          <div className="filters-section">
            <h3>{language === 'ar' ? 'فلترة العقارات' : 'Filter Properties'}</h3>
            <div className="filters-grid">
              <div className="filter-group">
                <label htmlFor="regionFilter">{language === 'ar' ? 'المنطقة:' : 'Region:'}</label>
                <select 
                  id="regionFilter"
                  value={filters.region}
                  onChange={(e) => handleRegionChange(e.target.value)}
                >
                  <option value="">{language === 'ar' ? 'جميع المناطق' : 'All Regions'}</option>
                  <option value="الرياض">{language === 'ar' ? 'منطقة الرياض' : 'Riyadh Region'}</option>
                  <option value="مكة المكرمة">{language === 'ar' ? 'منطقة مكة المكرمة' : 'Makkah Region'}</option>
                  <option value="المدينة المنورة">{language === 'ar' ? 'منطقة المدينة المنورة' : 'Madinah Region'}</option>
                  <option value="القصيم">{language === 'ar' ? 'منطقة القصيم' : 'Qassim Region'}</option>
                  <option value="الشرقية">{language === 'ar' ? 'المنطقة الشرقية' : 'Eastern Region'}</option>
                  <option value="عسير">{language === 'ar' ? 'منطقة عسير' : 'Asir Region'}</option>
                  <option value="تبوك">{language === 'ar' ? 'منطقة تبوك' : 'Tabuk Region'}</option>
                  <option value="حائل">{language === 'ar' ? 'منطقة حائل' : 'Hail Region'}</option>
                  <option value="الحدود الشمالية">{language === 'ar' ? 'منطقة الحدود الشمالية' : 'Northern Borders Region'}</option>
                  <option value="جازان">{language === 'ar' ? 'منطقة جازان' : 'Jazan Region'}</option>
                  <option value="نجران">{language === 'ar' ? 'منطقة نجران' : 'Najran Region'}</option>
                  <option value="الباحة">{language === 'ar' ? 'منطقة الباحة' : 'Al Baha Region'}</option>
                  <option value="الجوف">{language === 'ar' ? 'منطقة الجوف' : 'Al Jouf Region'}</option>
                </select>
                </div>

              <div className="filter-group">
                <label htmlFor="cityFilter">{language === 'ar' ? 'المدينة:' : 'City:'}</label>
                <select 
                  id="cityFilter"
                  value={filters.city}
                  onChange={(e) => handleCityChange(e.target.value)}
                  disabled={!filters.region}
                >
                  <option value="">{language === 'ar' ? 'جميع المدن' : 'All Cities'}</option>
                  {Object.keys(cities).sort().map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
            </div>

              <div className="filter-group">
                <label htmlFor="neighborhoodFilter">{language === 'ar' ? 'الحي:' : 'Neighborhood:'}</label>
                <div className="neighborhood-search-container">
                  <input 
                    type="text" 
                    id="neighborhoodFilter"
                    value={filters.neighborhood}
                    onChange={(e) => handleNeighborhoodInputChange(e.target.value)}
                    placeholder={language === 'ar' ? 'ابحث عن الحي...' : 'Search neighborhood...'}
                    disabled={!filters.city}
                    onFocus={() => {
                      if (filters.neighborhood && filters.city) {
                        setShowNeighborhoodSuggestions(true);
                      }
                    }}
                    onBlur={() => {
                      // Delay hiding suggestions to allow clicking on them
                      setTimeout(() => setShowNeighborhoodSuggestions(false), 200);
                    }}
                  />
                  {showNeighborhoodSuggestions && neighborhoodSuggestions.length > 0 && (
                    <div className="neighborhood-suggestions">
                      {neighborhoodSuggestions.map((neighborhood, index) => (
                        <div 
                          key={index}
                          className="suggestion-item"
                          onClick={() => handleNeighborhoodChange(neighborhood)}
                        >
                          {neighborhood}
                </div>
                      ))}
              </div>
                  )}
              </div>
            </div>

              <div className="filter-actions">
                <button 
                  type="button" 
                  className="clear-filters-btn"
                  onClick={() => {
                    setFilters({ region: '', city: '', neighborhood: '' });
                    setCities({});
                    setFilteredProperties(properties);
                    setNeighborhoodSuggestions([]);
                    setShowNeighborhoodSuggestions(false);
                  }}
                >
                  {language === 'ar' ? 'مسح الفلاتر' : 'Clear Filters'}
                </button>
                </div>
              </div>
              </div>

          {/* Results Count */}
          <div className="results-info">
            <p>{language === 'ar' ? `عرض ${filteredProperties.length} من أصل ${properties.length} عقار` : `Showing ${filteredProperties.length} of ${properties.length} properties`}</p>
          </div>

          {/* Properties List */}
          <div className="deals-list">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <div key={property.id} className="property-card" onClick={() => handlePropertyClick(property.id)}>
                  {property.discount && (
                    <div className="discount-tag">
                      {property.discount}
                    </div>
                  )}
                  <div className="property-header">
                    <h3 className="property-title">{property.title}</h3>
                    <div className="property-location">{property.location}</div>
                    <div className="property-location-details">
                      <span className="location-badge">{property.region}</span>
                      <span className="location-badge">{property.city}</span>
                      <span className="location-badge">{property.neighborhood}</span>
                </div>
              </div>
                  <div className="property-details">
                    <div className="property-type">{property.type}</div>
                    <div className="property-area">{property.area}</div>
                    {property.bedrooms && <div className="property-bedrooms">{property.bedrooms}</div>}
                    {property.bathrooms && <div className="property-bathrooms">{property.bathrooms}</div>}
                    {property.floors && <div className="property-floors">{property.floors}</div>}
                    {property.frontage && <div className="property-frontage">{property.frontage}</div>}
                    {property.height && <div className="property-height">{property.height}</div>}
                  </div>
                  <div className="property-pricing">
                    <div className="property-price">{property.price}</div>
                    <div className="property-price-per-sqm">{property.pricePerSqm}</div>
                  </div>
                  <button className="property-button" onClick={(e) => {
                    e.stopPropagation();
                    handlePropertyClick(property.id);
                  }}>
                    {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                  </button>
              </div>
              ))
            ) : (
              <div className="no-results">
                <h3>{language === 'ar' ? 'لا توجد عقارات تطابق البحث' : 'No properties match your search'}</h3>
                <p>{language === 'ar' ? 'جرب تغيير معايير البحث أو مسح الفلاتر' : 'Try changing your search criteria or clearing the filters'}</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default DealsPage;
