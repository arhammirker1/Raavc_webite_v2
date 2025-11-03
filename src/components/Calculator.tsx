import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Calculator.css';

// Extend Window interface for Leaflet
declare global {
  interface Window {
    L: any;
  }
}

// Type definitions for the data structures
interface RegionsData {
  [region: string]: { [city: string]: number };
}

interface CityCoordinates {
  [city: string]: [number, number];
}

interface DistrictPrices {
  [region: string]: {
    [city: string]: {
      [district: string]: number;
      default: number;
    };
  };
}

const Calculator: React.FC = () => {
  const { language } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [showContactModal, setShowContactModal] = useState(false);
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const [cities, setCities] = useState<{[key: string]: number}>({});
  const [map, setMap] = useState<any>(null);

  const regionsData: RegionsData = {
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

  const cityCoordinates: CityCoordinates = {
    "الرياض": [24.7136, 46.6753],
    "جدة": [21.4858, 39.1925],
    "مكة المكرمة": [21.3891, 39.8579],
    "المدينة المنورة": [24.5247, 39.5692],
    "الدمام": [26.4344, 50.1033],
    "الخبر": [26.2794, 50.2083],
    "بريدة": [26.3260, 43.9750],
    "أبها": [18.2164, 42.5053],
    "تبوك": [28.3835, 36.5662],
    "حائل": [27.5114, 41.7208],
    "عرعر": [30.9753, 41.0197],
    "جازان": [16.8894, 42.5611],
    "نجران": [17.4924, 44.1277],
    "الباحة": [20.0129, 41.4677],
    "سكاكا": [29.9697, 40.2000]
  };

  // Load EmailJS
  useEffect(() => {
    const loadEmailJS = () => {
      if (!(window as any).emailjs) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
        script.onload = () => {
          (window as any).emailjs.init({
            publicKey: "cu3f2r_FWETkuj23y",
          });
        };
        document.head.appendChild(script);
      }
    };
    loadEmailJS();
  }, []);

  // Load Leaflet CSS and JS
  useEffect(() => {
    let isMapInitialized = false;

    const loadLeaflet = () => {
      // Load CSS
      if (!document.querySelector('link[href*="leaflet"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        link.crossOrigin = '';
        document.head.appendChild(link);
      }

      // Load JS
      if (!(window as any).L) {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
        script.crossOrigin = '';
        script.onload = () => {
          if (!isMapInitialized) {
            initializeMap();
            isMapInitialized = true;
          }
        };
        document.head.appendChild(script);
      } else {
        if (!isMapInitialized) {
          initializeMap();
          isMapInitialized = true;
        }
      }
    };

    loadLeaflet();

    // Cleanup function to prevent memory leaks
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        setMap(null);
      }
    };
  }, []);

  const initializeMap = () => {
    if (!mapRef.current || !(window as any).L || mapInstanceRef.current) return;

    try {
      // Clear any existing content in the map container
      mapRef.current.innerHTML = '';

      const leafletMap = (window as any).L.map(mapRef.current, {
        center: [24.7136, 46.6753],
        zoom: 6
      });

      (window as any).L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(leafletMap);

      mapInstanceRef.current = leafletMap;
      setMap(leafletMap);

      setTimeout(() => {
        leafletMap.invalidateSize();
      }, 100);

    } catch (error) {
      console.error('Map initialization failed:', error);
    }
  };

  const handleRegionChange = (region: string) => {
    setFormData({ ...formData, region, city: '', district: '', districtType: '' });
    if (region && regionsData[region as keyof RegionsData]) {
      setCities(regionsData[region as keyof RegionsData]);
    } else {
      setCities({});
    }
  };

  const handleCityChange = (city: string) => {
    setFormData({ ...formData, city, district: '', districtType: '' });
    updateMap(city, formData.district);
  };

  const handleDistrictChange = (district: string) => {
    setFormData({ ...formData, district });
    updateMap(formData.city, district);
  };

  const updateMap = (city: string, district: string) => {
    if (!mapInstanceRef.current) return;

    let coords: [number, number] = [24.7136, 46.6753];
    let zoom = 6;

    if (city && cityCoordinates[city as keyof CityCoordinates]) {
      coords = cityCoordinates[city as keyof CityCoordinates];
      zoom = 12;
    } else if (formData.region) {
      zoom = 8;
    }

    mapInstanceRef.current.setView(coords, zoom);

    if (city || district) {
      const marker = (window as any).L.marker(coords).addTo(mapInstanceRef.current);
      const popupText = district ? `${district}, ${city}` : city;
      marker.bindPopup(popupText).openPopup();
    }
  };

  const handlePropertyTypeChange = (propertyType: string) => {
    setFormData({ ...formData, propertyType });
  };

  const handleConstructionStatusChange = (constructionStatus: string) => {
    setFormData({ ...formData, constructionStatus });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowContactModal(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowContactModal(false);
    setShowProcessingModal(true);
    
    const email = (e.target as HTMLFormElement).email.value;
    const phone = (e.target as HTMLFormElement).phone.value;
    
    calculateAndSubmit(email, phone);
  };

  const isLandProperty = formData.propertyType?.includes('أرض');

  // API endpoint
  const API_ENDPOINT = 'https://api.raavc.com/calculate';

  // District prices for specific areas
  const districtPrices: DistrictPrices = {
    "مكة المكرمة": {
      "جدة": {
        "البلد": 1500,
        "الرويس": 1800,
        "البغدادية": 2000,
        "الشاطئ": 7500,
        "النخيل": 7000,
        "الحمراء": 5000,
        "default": 6500
      }
    }
  };

  // Property types with multipliers and building prices
  const propertyTypes = {
    "فيلا": { landMultiplier: 1.5, buildingPrice: 4500 },
    "عمارة سكنية": { landMultiplier: 1.4, buildingPrice: 4000 },
    "شقة": { landMultiplier: 1.3, buildingPrice: 3500 },
    "دور": { landMultiplier: 1.3, buildingPrice: 3500 },
    "بيت شعبي": { landMultiplier: 0.8, buildingPrice: 1500 },
    "استراحة": { landMultiplier: 1.2, buildingPrice: 3000 },
    "مبنى تجاري": { landMultiplier: 2.5, buildingPrice: 6500 },
    "عمارة تجارية": { landMultiplier: 2.3, buildingPrice: 6000 },
    "برج": { landMultiplier: 2.5, buildingPrice: 7000 },
    "محل تجاري": { landMultiplier: 2.2, buildingPrice: 5500 },
    "فندق": { landMultiplier: 2.7, buildingPrice: 8000 },
    "ورشة تجاري": { landMultiplier: 1.8, buildingPrice: 4500 },
    "أرض سكنية": { landMultiplier: 1.0, buildingPrice: 0 },
    "أرض تجارية": { landMultiplier: 2.0, buildingPrice: 0 },
    "أرض صناعية": { landMultiplier: 1.2, buildingPrice: 0 },
    "أرض زراعية": { landMultiplier: 0.5, buildingPrice: 0 }
  };

  // Estimate price per meter function
  const estimatePricePerMeter = (region: string, city: string, propertyType: string, streetWidth: string, streetCount: string, evaluationPurpose: string, servicesProximity: string, buildingAge: string, districtType: string, district: string) => {
    let baseLandPrice = regionsData[region as keyof RegionsData]?.[city] || 1500;
    
    // Use district price if available
    if (districtPrices[region]?.[city]?.[district]) {
      baseLandPrice = districtPrices[region][city][district];
    } else if (districtType === "قديم") {
      baseLandPrice *= 0.3;
    } else if (districtType === "راقي") {
      baseLandPrice *= 1.2;
    }

    let buildingPrice = 0;
    const { landMultiplier, buildingPrice: typeBuildingPrice } = propertyTypes[propertyType as keyof typeof propertyTypes] || { landMultiplier: 1.0, buildingPrice: 3500 };

    baseLandPrice *= landMultiplier;
    buildingPrice = typeBuildingPrice;

    if (districtType === "قديم") {
      // No additional effect for street width or count
    } else {
      baseLandPrice += (+streetWidth) * 100;
      if (streetCount.includes("ثلاث")) baseLandPrice *= 1.3;
      else if (streetCount.includes("متظاهرة")) baseLandPrice *= 1.2;
      else if (streetCount.includes("زاوية")) baseLandPrice *= 1.15;
    }

    if (servicesProximity === "عالي" && districtType !== "قديم") {
      baseLandPrice *= 1.2;
    } else if (servicesProximity === "متوسط" && districtType !== "قديم") {
      baseLandPrice *= 1.1;
    }

    if (evaluationPurpose === "التمويل" || evaluationPurpose === "الرهن العقاري") {
      baseLandPrice *= 1.1;
      buildingPrice *= 1.1;
    } else if (evaluationPurpose === "البيع" || evaluationPurpose === "التطوير والاستثمار") {
      baseLandPrice *= 1.05;
      buildingPrice *= 1.05;
    }

    const depreciationRate = propertyType === "بيت شعبي" ? 0.02 : 0.02;
    const buildingAgeValue = buildingAge ? parseInt(buildingAge) : 0;
    const depreciationFactor = buildingAgeValue > 30 && propertyType === "بيت شعبي" ? 0.2 : Math.max(0.5, 1 - (depreciationRate * buildingAgeValue));
    buildingPrice *= depreciationFactor;

    return { landPrice: Math.round(baseLandPrice), buildingPrice: Math.round(buildingPrice) };
  };

  // Calculate and submit function
  const calculateAndSubmit = (email: string, phone: string) => {
    // Show loading state
    const submitButton = document.querySelector('button[type="submit"]') as HTMLButtonElement;
    const originalText = submitButton ? submitButton.textContent : '';
    if (submitButton) {
      submitButton.textContent = 'جاري المعالجة...';
      submitButton.disabled = true;
    }

    // Map Arabic form fields to English API fields
    const apiData = {
      area: formData.region,
      city: formData.city,
      neighborhood: formData.district,
      neighborhood_class: formData.districtType,
      land_area: parseFloat(formData.landArea),
      building_area: parseFloat(formData.buildingArea) || 0,
      building_age: parseInt(formData.buildingAge) || 0,
      street_view: `Street ${formData.streetWidth} m`,
      num_streets: formData.streetCount,
      interface: formData.facade,
      proximity_services: formData.servicesProximity,
      property_type: formData.propertyType,
      evaluation_purpose: formData.evaluationPurpose,
      total_built_up_area: formData.totalBuiltUpArea ? parseFloat(formData.totalBuiltUpArea) : null,
      construction_status: formData.constructionStatus,
      finishing_level: formData.finishingLevel,
      structural_condition: formData.structuralCondition,
      name: 'عميل RAAVC',
      email: email,
      phone: phone
    };

    console.log('🚀 Sending to API:', apiData);

    // Send to FastAPI backend
    fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiData)
    })
    .then(response => {
      console.log('📡 API Response status:', response.status);
      if (response.redirected) {
        // Backend returns redirect to result page
        window.location.href = response.url;
        return;
      }
      return response.json();
    })
    .then(data => {
      if (data && data.error) {
        alert('حدث خطأ: ' + data.error);
        calculateLocally(email, phone);
      } else if (data) {
        console.log('✅ API Success:', data);
        // Handle JSON response if backend doesn't redirect
      }
    })
    .catch(error => {
      console.error('❌ API Error:', error);
      alert('حدث خطأ في الاتصال بالخادم. جاري التحويل للحساب المحلي...');
      // Fallback to local calculation
      calculateLocally(email, phone);
    })
    .finally(() => {
      if (submitButton) {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }
    });
  };

  // Local calculation fallback
  const calculateLocally = (email: string, phone: string) => {
    const { landPrice, buildingPrice } = estimatePricePerMeter(
      formData.region,
      formData.city,
      formData.propertyType,
      formData.streetWidth,
      formData.streetCount,
      formData.evaluationPurpose,
      formData.servicesProximity,
      formData.buildingAge,
      formData.districtType,
      formData.district
    );

    const landArea = parseFloat(formData.landArea);
    const buildingArea = parseFloat(formData.buildingArea) || 0;
    
    const totalLandValue = landPrice * landArea;
    const totalBuildingValue = buildingPrice * buildingArea;
    const totalValue = totalLandValue + totalBuildingValue;

    // Show results
    setShowProcessingModal(false);
    
    // Display results (you can customize this part)
    const resultText = `
      <h3>نتيجة التقييم المحلي</h3>
      <p><strong>سعر الأرض للمتر المربع:</strong> ${landPrice.toLocaleString()} ريال</p>
      <p><strong>سعر البناء للمتر المربع:</strong> ${buildingPrice.toLocaleString()} ريال</p>
      <p><strong>إجمالي قيمة الأرض:</strong> ${totalLandValue.toLocaleString()} ريال</p>
      <p><strong>إجمالي قيمة البناء:</strong> ${totalBuildingValue.toLocaleString()} ريال</p>
      <p><strong>القيمة الإجمالية للعقار:</strong> ${totalValue.toLocaleString()} ريال</p>
      <div class="valuation-method">تم الحساب باستخدام الطريقة المحلية</div>
    `;

    // You can add a result display component here
    alert(language === 'ar' ? `تم حساب التقييم بنجاح!\nالقيمة الإجمالية: ${totalValue.toLocaleString()} ريال` : `Valuation calculated successfully!\nTotal Value: ${totalValue.toLocaleString()} SAR`);
  };

  return (
    <div className="calculator-page">
      <div className="container">
        <div className="form-container">
          <h2>{language === 'ar' ? 'حاسبة التقييم العقاري' : 'Real Estate Valuation Calculator'}</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="region" className="required">{language === 'ar' ? 'المنطقة:' : 'Region:'}</label>
              <select 
                id="region" 
                value={formData.region || ''} 
                onChange={(e) => handleRegionChange(e.target.value)}
                required
              >
                <option value="">{language === 'ar' ? 'اختر المنطقة' : 'Choose Region'}</option>
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
              <div className="error" id="regionError">{language === 'ar' ? 'يرجى اختيار المنطقة' : 'Please choose a region'}</div>
            </div>

            <div className="form-group">
              <label htmlFor="city" className="required">{language === 'ar' ? 'المدينة:' : 'City:'}</label>
              <select 
                id="city" 
                value={formData.city || ''} 
                onChange={(e) => handleCityChange(e.target.value)}
                required
                disabled={!formData.region}
              >
                <option value="">{language === 'ar' ? 'اختر المدينة' : 'Choose City'}</option>
                {Object.keys(cities).sort().map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <div className="error" id="cityError">{language === 'ar' ? 'يرجى اختيار المدينة' : 'Please choose a city'}</div>
            </div>

            <div className="form-group">
              <label htmlFor="district" className="required">{language === 'ar' ? 'الحي:' : 'District:'}</label>
              <input 
                type="text" 
                id="district" 
                value={formData.district || ''} 
                onChange={(e) => handleDistrictChange(e.target.value)}
                required 
                placeholder={language === 'ar' ? 'اكتب اسم الحي هنا' : 'Enter district name here'}
              />
              <div className="error" id="districtError">{language === 'ar' ? 'يرجى إدخال اسم الحي' : 'Please enter district name'}</div>
            </div>

            <div className="form-group">
              <label htmlFor="districtType" className="required">{language === 'ar' ? 'تصنيف الحي:' : 'District Classification:'}</label>
              <select 
                id="districtType" 
                value={formData.districtType || ''} 
                onChange={(e) => setFormData({ ...formData, districtType: e.target.value })}
                required
              >
                <option value="">{language === 'ar' ? 'اختر تصنيف الحي' : 'Choose District Classification'}</option>
                <option value="قديم">{language === 'ar' ? 'حي قديم' : 'Old District'}</option>
                <option value="متوسط">{language === 'ar' ? 'حي متوسط' : 'Average District'}</option>
                <option value="راقي">{language === 'ar' ? 'حي راقي' : 'Upscale District'}</option>
              </select>
              <div className="error" id="districtTypeError">{language === 'ar' ? 'يرجى اختيار تصنيف الحي' : 'Please choose district classification'}</div>
            </div>

            <div className="form-group">
              <label htmlFor="propertyType" className="required">{language === 'ar' ? 'نوع العقار:' : 'Property Type:'}</label>
              <select 
                id="propertyType" 
                value={formData.propertyType || ''} 
                onChange={(e) => handlePropertyTypeChange(e.target.value)}
                required
              >
                <option value="">{language === 'ar' ? 'اختر نوع العقار' : 'Choose Property Type'}</option>
                <optgroup label={language === 'ar' ? 'العقارات السكنية' : 'Residential Properties'}>
                  <option value="فيلا">{language === 'ar' ? 'الفلل' : 'Villas'}</option>
                  <option value="عمارة سكنية">{language === 'ar' ? 'العمائر السكنية' : 'Residential Buildings'}</option>
                  <option value="شقة">{language === 'ar' ? 'الشقق السكنية' : 'Apartments'}</option>
                  <option value="دور">{language === 'ar' ? 'الأدوار المنفصلة' : 'Separate Floors'}</option>
                  <option value="بيت شعبي">{language === 'ar' ? 'البيوت الشعبية' : 'Traditional Houses'}</option>
                  <option value="استراحة">{language === 'ar' ? 'الاستراحات السكنية' : 'Recreational Residences'}</option>
                </optgroup>
                <optgroup label={language === 'ar' ? 'العقارات التجارية' : 'Commercial Properties'}>
                  <option value="مبنى تجاري">{language === 'ar' ? 'المباني التجارية' : 'Commercial Buildings'}</option>
                  <option value="عمارة تجارية">{language === 'ar' ? 'العمائر التجارية' : 'Commercial Buildings'}</option>
                  <option value="برج">{language === 'ar' ? 'الأبراج الإدارية' : 'Administrative Towers'}</option>
                  <option value="محل تجاري">{language === 'ar' ? 'المحلات التجارية' : 'Commercial Shops'}</option>
                  <option value="فندق">{language === 'ar' ? 'الفنادق' : 'Hotels'}</option>
                  <option value="ورشة تجاري">{language === 'ar' ? 'الورش التجارية' : 'Commercial Workshops'}</option>
                </optgroup>
                <optgroup label={language === 'ar' ? 'الأراضي' : 'Land'}>
                  <option value="أرض سكنية">{language === 'ar' ? 'أراضي سكنية' : 'Residential Land'}</option>
                  <option value="أرض تجارية">{language === 'ar' ? 'أراضي تجارية' : 'Commercial Land'}</option>
                  <option value="أرض صناعية">{language === 'ar' ? 'أراضي صناعية' : 'Industrial Land'}</option>
                  <option value="أرض زراعية">{language === 'ar' ? 'أراضي زراعية' : 'Agricultural Land'}</option>
                </optgroup>
              </select>
              <div className="error" id="propertyTypeError">{language === 'ar' ? 'يرجى اختيار نوع العقار' : 'Please choose property type'}</div>
            </div>

            <div className="form-group">
              <label htmlFor="evaluationPurpose" className="required">{language === 'ar' ? 'الغرض من التقييم:' : 'Evaluation Purpose:'}</label>
              <select 
                id="evaluationPurpose" 
                value={formData.evaluationPurpose || ''} 
                onChange={(e) => setFormData({ ...formData, evaluationPurpose: e.target.value })}
                required
              >
                <option value="">{language === 'ar' ? 'اختر الغرض من التقييم' : 'Choose Evaluation Purpose'}</option>
                <option value="البيع">{language === 'ar' ? 'البيع' : 'Sale'}</option>
                <option value="الشراء">{language === 'ar' ? 'الشراء' : 'Purchase'}</option>
                <option value="التمويل">{language === 'ar' ? 'التمويل' : 'Financing'}</option>
                <option value="الرهن العقاري">{language === 'ar' ? 'الرهن العقاري' : 'Mortgage'}</option>
                <option value="التأمين">{language === 'ar' ? 'التأمين' : 'Insurance'}</option>
                <option value="المحاسبة">{language === 'ar' ? 'المحاسبة' : 'Accounting'}</option>
                <option value="المنازعات القضائية">{language === 'ar' ? 'المنازعات القضائية' : 'Legal Disputes'}</option>
                <option value="التركات والميراث">{language === 'ar' ? 'التركات والميراث' : 'Inheritance'}</option>
                <option value="الزكاة والضريبة">{language === 'ar' ? 'الزكاة والضريبة' : 'Zakat and Tax'}</option>
                <option value="التصفية">{language === 'ar' ? 'التصفية' : 'Liquidation'}</option>
                <option value="الإفلاس">{language === 'ar' ? 'الإفلاس' : 'Bankruptcy'}</option>
                <option value="إثبات الملكية">{language === 'ar' ? 'إثبات الملكية' : 'Property Ownership Proof'}</option>
                <option value="التسعير الحكومي">{language === 'ar' ? 'التسعير الحكومي' : 'Government Pricing'}</option>
                <option value="التطوير والاستثمار">{language === 'ar' ? 'التطوير والاستثمار' : 'Development and Investment'}</option>
                <option value="تحديد الإيجارات العادل">{language === 'ar' ? 'تحديد الإيجارات العادل' : 'Fair Rent Determination'}</option>
              </select>
              <div className="error" id="evaluationPurposeError">{language === 'ar' ? 'يرجى اختيار الغرض من التقييم' : 'Please choose evaluation purpose'}</div>
            </div>

            <div className="form-group">
              <label htmlFor="landArea" className="required">{language === 'ar' ? 'مساحة الأرض (م²):' : 'Land Area (m²):'}</label>
              <input 
                type="number" 
                id="landArea" 
                value={formData.landArea || ''} 
                onChange={(e) => setFormData({ ...formData, landArea: e.target.value })}
                step="any" 
                min="1" 
                required
              />
              <div className="error" id="landAreaError">يرجى إدخال مساحة موجبة</div>
            </div>

            {!isLandProperty && (
              <>
                <div className="form-group">
                  <label htmlFor="totalBuiltUpArea" className="required">{language === 'ar' ? 'إجمالي المسطح المبني (م²):' : 'Total Built-up Area (m²):'}</label>
                  <input 
                    type="number" 
                    id="totalBuiltUpArea" 
                    value={formData.totalBuiltUpArea || ''} 
                    onChange={(e) => setFormData({ ...formData, totalBuiltUpArea: e.target.value })}
                    step="any" 
                    min="1" 
                    placeholder={language === 'ar' ? 'أدخل المسطح المبني الكلي' : 'Enter total built-up area'}
                    required
                  />
                  <div className="error" id="totalBuiltUpAreaError">{language === 'ar' ? 'يرجى إدخال المسطح المبني بشكل صحيح' : 'Please enter built-up area correctly'}</div>
                </div>

                <div className="form-group">
                  <label htmlFor="constructionStatus" className="required">{language === 'ar' ? 'الحالة الحالية للبناء:' : 'Current Construction Status:'}</label>
                  <select 
                    id="constructionStatus" 
                    value={formData.constructionStatus || ''} 
                    onChange={(e) => handleConstructionStatusChange(e.target.value)}
                    required
                  >
                    <option value="">{language === 'ar' ? 'اختر الحالة' : 'Choose Status'}</option>
                    <option value="skeleton">{language === 'ar' ? 'هيكل فقط' : 'Skeleton Only'}</option>
                    <option value="partial">{language === 'ar' ? 'نصف تشطيب' : 'Half Finished'}</option>
                    <option value="finished">{language === 'ar' ? 'مكتمل (جاهز للاستخدام)' : 'Complete (Ready for Use)'}</option>
                  </select>
                  <div className="error" id="constructionStatusError">{language === 'ar' ? 'يرجى اختيار حالة البناء' : 'Please choose construction status'}</div>
                </div>

                {(formData.constructionStatus === 'partial' || formData.constructionStatus === 'finished') && (
                  <div className="form-group">
                    <label htmlFor="finishingLevel" className="required">{language === 'ar' ? 'مستوى التشطيب:' : 'Finishing Level:'}</label>
                    <select 
                      id="finishingLevel" 
                      value={formData.finishingLevel || ''} 
                      onChange={(e) => setFormData({ ...formData, finishingLevel: e.target.value })}
                      required
                    >
                      <option value="">{language === 'ar' ? 'اختر مستوى التشطيب' : 'Choose Finishing Level'}</option>
                      <option value="good">{language === 'ar' ? 'جيد' : 'Good'}</option>
                      <option value="excellent">{language === 'ar' ? 'ممتاز' : 'Excellent'}</option>
                      <option value="luxury">{language === 'ar' ? 'فاخر' : 'Luxury'}</option>
                    </select>
                    <div className="error" id="finishingLevelError">{language === 'ar' ? 'يرجى اختيار مستوى التشطيب' : 'Please choose finishing level'}</div>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="buildingAge" className="required">{language === 'ar' ? 'العمر الفعلي للمبنى (سنوات):' : 'Actual Building Age (Years):'}</label>
                  <input 
                    type="number" 
                    id="buildingAge" 
                    value={formData.buildingAge || ''} 
                    onChange={(e) => setFormData({ ...formData, buildingAge: e.target.value })}
                    step="1" 
                    min="0" 
                    placeholder={language === 'ar' ? 'أدخل العمر الفعلي' : 'Enter actual age'}
                    required
                  />
                  <div className="error" id="buildingAgeError">{language === 'ar' ? 'يرجى إدخال العمر الفعلي' : 'Please enter actual age'}</div>
                </div>

                <div className="form-group">
                  <label htmlFor="structuralCondition" className="required">{language === 'ar' ? 'الحالة الإنشائية الحالية:' : 'Current Structural Condition:'}</label>
                  <select 
                    id="structuralCondition" 
                    value={formData.structuralCondition || ''} 
                    onChange={(e) => setFormData({ ...formData, structuralCondition: e.target.value })}
                    required
                  >
                    <option value="">{language === 'ar' ? 'اختر الحالة الإنشائية' : 'Choose Structural Condition'}</option>
                    <option value="excellent">{language === 'ar' ? 'ممتاز' : 'Excellent'}</option>
                    <option value="good">{language === 'ar' ? 'جيد' : 'Good'}</option>
                    <option value="fair">{language === 'ar' ? 'متوسط' : 'Fair'}</option>
                    <option value="poor">{language === 'ar' ? 'ضعيف' : 'Poor'}</option>
                  </select>
                  <div className="error" id="structuralConditionError">{language === 'ar' ? 'يرجى اختيار الحالة الإنشائية' : 'Please choose structural condition'}</div>
                </div>
              </>
            )}

            <div className="form-group">
              <label htmlFor="streetWidth" className="required">{language === 'ar' ? 'عرض الشارع:' : 'Street Width:'}</label>
              <select 
                id="streetWidth" 
                value={formData.streetWidth || ''} 
                onChange={(e) => setFormData({ ...formData, streetWidth: e.target.value })}
                required
              >
                <option value="">{language === 'ar' ? 'اختر عرض الشارع' : 'Choose Street Width'}</option>
                <option value="10">{language === 'ar' ? 'شارع 10 م' : '10m Street'}</option>
                <option value="15">{language === 'ar' ? 'شارع 15 م' : '15m Street'}</option>
                <option value="20">{language === 'ar' ? 'شارع 20 م' : '20m Street'}</option>
                <option value="30">{language === 'ar' ? 'شارع 30 م' : '30m Street'}</option>
              </select>
              <div className="error" id="streetWidthError">{language === 'ar' ? 'يرجى اختيار عرض الشارع' : 'Please choose street width'}</div>
            </div>

            <div className="form-group">
              <label htmlFor="streetCount" className="required">{language === 'ar' ? 'عدد الشوارع:' : 'Number of Streets:'}</label>
              <select 
                id="streetCount" 
                value={formData.streetCount || ''} 
                onChange={(e) => setFormData({ ...formData, streetCount: e.target.value })}
                required
              >
                <option value="">{language === 'ar' ? 'اختر عدد الشوارع' : 'Choose Number of Streets'}</option>
                <option value="شارع واحد">{language === 'ar' ? 'شارع واحد' : 'One Street'}</option>
                <option value="شارعين - زاوية">{language === 'ar' ? 'شارعين - زاوية' : 'Two Streets - Corner'}</option>
                <option value="شارعين - متظاهرة">{language === 'ar' ? 'شارعين - متظاهرة' : 'Two Streets - Opposite'}</option>
                <option value="ثلاث واجهات أو أكثر">{language === 'ar' ? 'ثلاث واجهات أو أكثر' : 'Three Facades or More'}</option>
              </select>
              <div className="error" id="streetCountError">{language === 'ar' ? 'يرجى اختيار عدد الشوارع' : 'Please choose number of streets'}</div>
            </div>

            <div className="form-group">
              <label htmlFor="facade" className="required">{language === 'ar' ? 'الواجهة:' : 'Facade:'}</label>
              <select 
                id="facade" 
                value={formData.facade || ''} 
                onChange={(e) => setFormData({ ...formData, facade: e.target.value })}
                required
              >
                <option value="">{language === 'ar' ? 'اختر الواجهة' : 'Choose Facade'}</option>
                <option value="north">{language === 'ar' ? 'شمالية' : 'North'}</option>
                <option value="south">{language === 'ar' ? 'جنوبية' : 'South'}</option>
                <option value="east">{language === 'ar' ? 'شرقية' : 'East'}</option>
                <option value="west">{language === 'ar' ? 'غربية' : 'West'}</option>
              </select>
              <div className="error" id="facadeError">{language === 'ar' ? 'يرجى اختيار الواجهة' : 'Please choose facade'}</div>
            </div>

            <div className="form-group">
              <label htmlFor="servicesProximity" className="required">{language === 'ar' ? 'قرب الخدمات:' : 'Services Proximity:'}</label>
              <select 
                id="servicesProximity" 
                value={formData.servicesProximity || ''} 
                onChange={(e) => setFormData({ ...formData, servicesProximity: e.target.value })}
                required
              >
                <option value="">{language === 'ar' ? 'اختر مستوى قرب الخدمات' : 'Choose Services Proximity Level'}</option>
                <option value="عالي">{language === 'ar' ? 'عالي' : 'High'}</option>
                <option value="متوسط">{language === 'ar' ? 'متوسط' : 'Medium'}</option>
                <option value="منخفض">{language === 'ar' ? 'منخفض' : 'Low'}</option>
              </select>
              <div className="error" id="servicesProximityError">{language === 'ar' ? 'يرجى اختيار مستوى قرب الخدمات' : 'Please choose services proximity level'}</div>
            </div>

            <div className="button-group">
              <button type="submit">{language === 'ar' ? 'حساب التقييم' : 'Calculate Valuation'}</button>
              <a 
                id="whatsappLink" 
                className="button" 
                href="#" 
                style={{ pointerEvents: 'none', opacity: 0.6 }} 
                target="_blank"
              >
                {language === 'ar' ? 'احصل على تقييم عقاري معتمد' : 'Get Certified Real Estate Evaluation'}
              </a>
            </div>
          </form>
        </div>

        <div className="map-container">
          <div ref={mapRef} id="map"></div>
          <div className="map-fallback">فشل تحميل الخريطة. يرجى التحقق من الاتصال بالإنترنت أو تجربة متصفح آخر.</div>
        </div>
      </div>

      {showContactModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>إدخال بيانات التواصل</h3>
            <p>أدخل بياناتك لعرض النتيجة</p>
            <form onSubmit={handleContactSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="required">البريد الإلكتروني:</label>
                <input 
                  type="email" 
                  id="email" 
                  required 
                  placeholder="أدخل بريدك الإلكتروني"
                />
                <div className="error" id="emailError">يرجى إدخال بريد إلكتروني صحيح</div>
              </div>
              <div className="form-group">
                <label htmlFor="phone" className="required">رقم الهاتف:</label>
                <input 
                  type="tel" 
                  id="phone" 
                  required 
                  placeholder="أدخل رقم هاتفك (مثال: 05xxxxxxxx)"
                />
                <div className="error" id="phoneError">يرجى إدخال رقم هاتف صحيح</div>
              </div>
              <div className="button-group">
                <button type="submit">إرسال</button>
                <button type="button" className="cancel-btn" onClick={() => setShowContactModal(false)}>
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showProcessingModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="loading-spinner"></div>
            <h3>{language === 'ar' ? 'جاري المعالجة...' : 'Processing...'}</h3>
            <p>{language === 'ar' ? 'يرجى الانتظار بينما نقوم بحساب التقييم العقاري' : 'Please wait while we calculate the real estate valuation'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;
