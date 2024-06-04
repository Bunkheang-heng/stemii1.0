import React, { useState } from 'react';
import Team from '../components/Team';

const content = {
  en: {
    aboutUs: "About Us",
    spark: "Igniting a Spark for Innovation in Cambodia",
    empower: "Empowering Through Real-World Applications",
    para1: "STEMii is not just a repository of information; it’s a dynamic ecosystem designed to empower the next generation of Cambodian leaders and problem-solvers. We connect STEM concepts to real-world challenges like women's rights, environmental protection, and political participation.",
    para2: "By encouraging students to explore these issues through the lens of STEM, we foster a sense of purpose and social responsibility. Imagine a young girl in a rural village learning about solar power and then using that knowledge to design a system for clean water purification in her community.",
    para3: "This is the transformative power of STEMii – empowering students to become agents of change in their own lives and the lives of others.",
    bridging: "Bridging the Gap Between Education and Opportunity",
    para4: "At STEMii, accessibility is key to achieving inclusivity. We offer all our content in Khmer and allow users to download materials for offline access. This commitment ensures that the spark of innovation can ignite anywhere in Cambodia.",
    para5: "Our interactive modules, gamified lessons, and online forums promote creativity, collaboration, and problem-solving skills. This environment nurtures a culture of innovation, essential for success in the 21st century.",
    celebrating: "Celebrating Cambodian STEM Heroes",
    para6: "We believe in the power of inspiration. By featuring profiles of accomplished Cambodian professionals in STEM fields, we show students the diverse career possibilities and inspire them to make a difference on the global stage.",
    para7: "STEMii is more than just an educational platform; it’s a community. A network of passionate educators, students, mentors, and changemakers who believe in the power of STEM to transform Cambodia's future.",
    joinUs: "Join us in building a brighter, more sustainable future for our nation.",
  },
  kh: {
    aboutUs: "អំពីពួក យើង",
    spark: "ការច្នៃប្រឌិត កម្មវិធីថ្មីនៅកម្ពុជា",
    empower: "បង្កើនភាពងារ ស្រួលទៅកានពិភពលោក",
    para1: "STEMii មិនគ្រាន់តែជាឃ្លាំងនៃព័ត៌មានប៉ុណ្ណោះទេ។ វា​ជា​ប្រព័ន្ធ​អេកូឡូស៊ី​ថាមវន្ត​ដែល​ត្រូវ​បាន​រចនា​ឡើង​ដើម្បី​ផ្តល់​អំណាច​ដល់​អ្នកដឹកនាំ​ជំនាន់​ក្រោយ​របស់​កម្ពុជា និង​អ្នក​ដោះស្រាយ​បញ្ហា។ យើងភ្ជាប់គំនិត STEM ទៅនឹងបញ្ហាប្រឈមក្នុងពិភពពិត ដូចជាសិទ្ធិស្ត្រី ការការពារបរិស្ថាន និងការចូលរួមផ្នែកនយោបាយ។",
    para2: "ដោយលើកទឹកចិត្តឱ្យនិស្សិតស្វែងយល់ពីបញ្ហាទាំងនេះតាមរយៈការមើលឃើញរបស់ STEM យើងនឹងលើកទឹកចិត្តអារម្មណ៍នៃគោលបំណងនិងការទទួលខុសត្រូវសង្គម។ សូមគិតពីក្មេងស្រីម្នាក់នៅក្នុងភូមិជនបទបានរៀនអំពីថាមពលព្រះអាទិត្យ ហើយបន្ទាប់មកប្រើចំណេះដឹងនោះដើម្បីរចនាប្រព័ន្ធសម្រាប់ការរម៉ត់ទឹកស្អាតនៅក្នុងសហគមន៍របស់នាង។",
    para3: "នេះជាអំណាចកែលម្អនៃ STEMii ដែលផ្តល់អំណាចឱ្យនិស្សិតក្លាយជាតំណាងនៃការផ្លាស់ប្តូរនៅក្នុងជីវិតរបស់ពួកគេ និងជីវិតរបស់អ្នកដទៃ។",
    bridging: "ការទំនាក់ទំនងនៃការអប់រំ និងឱកាស",
    para4: "នៅ STEMii ការចូលដំណើរការគឺជាគន្លឹះដើម្បីសម្រេចបាននូវភាពសមរម្យ។ យើងផ្តល់មាតិការរបស់យើងទាំងអស់ជាភាសាខ្មែរ ហើយអនុញ្ញាតឱ្យអ្នកប្រើប្រាស់ទាញយកសម្ភារៈសម្រាប់ការប្រើប្រាស់ក្រៅបណ្តាញ។ ការប្តេជ្ញារបស់យើងធានាថាអំណាចនៃការច្នៃប្រឌិតអាចបញ្ឆេះបានគ្រប់ទីកន្លែងនៅកម្ពុជា។",
    para5: "ម៉ូឌុលអន្តរកម្មមេរៀនជាកីឡា និងវេទិកាអនឡាញរបស់យើងលើកទឹកចិត្តនូវការច្នៃប្រឌិត ការសហការនិងជំនាញដោះស្រាយបញ្ហា។ បរិយាកាសនេះដឹងថាត្រូវបាននិងលើកទឹកចិត្តវប្បធម៌នៃការច្នៃប្រឌិតដែលជាកន្លែងសម្រាប់ភាពជោគជ័យនៅសតវត្សទី២១។",
    celebrating: "ការប្រារព្ធយុទ្ធនាការនៃកម្ពុជានៅ STEM",
    para6: "យើងជឿជាក់នៅក្នុងអំណាចនៃការបំផុស។ ដោយរៀបរាប់អំពីប្រវត្តិនៃអ្នកជំនាញកម្ពុជាដែលសម្រេចបាននៅក្នុងវិស័យ STEM យើងបង្ហាញនិស្សិតនូវឱកាសអាជីពផ្សេងៗ ហើយបំផុសពួកគេឱ្យធ្វើការផ្លាស់ប្តូរនៅលើឆាកពិភពលោក។",
    para7: "STEMii មិនត្រឹមតែជាវេទិកាអប់រំទេ តែវាជាសហគមន៍។ បណ្តាញនៃគ្រូសាស្ត្រ ការអប់រំអ្នកណែនាំនិងអ្នកច្នៃប្រឌិតដែលមានក្ដីសង្ឃឹមជឿជាក់ក្នុងអំណាចនៃ STEM ដើម្បីផ្លាស់ប្តូរកម្ពុជារបស់យើង។",
    joinUs: "ចូលរួមជាមួយយើងក្នុងការបង្កើតអនាគតភ្លឺស្វាងនិងមានចីរភាពចំពោះជាតិរបស់យើង។",
  }
};

const AboutUs = () => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'kh' : 'en'));
  };

  return (
    <div className="bg-white text-gray-800 py-16 mb-10">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="text-center mb-16">
          <button 
            onClick={toggleLanguage} 
            className="bg-blue-600 text-white py-2 px-4 rounded mb-4"
          >
            {language === 'en' ? 'ភាសាខ្មែរ' : 'English'}
          </button>
          <h1 className="text-5xl font-extrabold text-blue-600 mb-4 animate-fadeIn">{content[language].aboutUs}</h1>
          <p className="text-xl text-gray-500">{content[language].spark}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-blue-600 mb-6 animate-fadeIn">{content[language].empower}</h2>
            <p className="text-lg mb-6">
              {content[language].para1}
            </p>
            <p className="text-lg mb-6">
              {content[language].para2}
            </p>
            <p className="text-lg font-semibold text-blue-600 mb-6">
              {content[language].para3}
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://source.unsplash.com/800x600/?education,technology" 
              alt="STEMii Education" 
              className="rounded-lg shadow-lg animate-fadeIn"
            />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="relative">
            <img 
              src="https://source.unsplash.com/800x600/?students,learning" 
              alt="STEMii Collaboration" 
              className="rounded-lg shadow-lg animate-fadeIn"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-blue-600 mb-6 animate-fadeIn">{content[language].bridging}</h2>
            <p className="text-lg mb-6">
              {content[language].para4}
            </p>
            <p className="text-lg mb-6">
              {content[language].para5}
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-4xl font-bold text-blue-600 mb-6 animate-fadeIn">{content[language].celebrating}</h2>
          <p className="text-lg mb-6">
            {content[language].para6}
          </p>
          <p className="text-lg mb-6">
            {content[language].para7}
          </p>
          <p className="text-xl font-semibold text-blue-600 animate-fadeIn">
            {content[language].joinUs}
          </p>
        </div>
      </div>
      <Team />
    </div>
  );
};

export default AboutUs;
