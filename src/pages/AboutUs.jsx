import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-16">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-blue-400 mb-4 animate-fadeIn">About Us</h1>
          <p className="text-xl text-gray-400">Igniting a Spark for Innovation in Cambodia</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-blue-400 mb-6 animate-fadeIn">Empowering Through Real-World Applications</h2>
            <p className="text-lg mb-6">
              STEMii is not just a repository of information; it’s a dynamic ecosystem designed to empower the next generation of Cambodian leaders and problem-solvers. We connect STEM concepts to real-world challenges like women's rights, environmental protection, and political participation.
            </p>
            <p className="text-lg mb-6">
              By encouraging students to explore these issues through the lens of STEM, we foster a sense of purpose and social responsibility. Imagine a young girl in a rural village learning about solar power and then using that knowledge to design a system for clean water purification in her community.
            </p>
            <p className="text-lg font-semibold text-blue-400 mb-6">
              This is the transformative power of STEMii – empowering students to become agents of change in their own lives and the lives of others.
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://source.unsplash.com/800x600/?education,technology" 
              alt="STEMii Education" 
              className="rounded-lg shadow-lg animate-fadeIn"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-blue-600 opacity-30 rounded-lg hover:opacity-0 transition-opacity duration-300"></div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="relative">
            <img 
              src="https://source.unsplash.com/800x600/?students,learning" 
              alt="STEMii Collaboration" 
              className="rounded-lg shadow-lg animate-fadeIn"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-blue-600 opacity-30 rounded-lg hover:opacity-0 transition-opacity duration-300"></div>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-blue-400 mb-6 animate-fadeIn">Bridging the Gap Between Education and Opportunity</h2>
            <p className="text-lg mb-6">
              At STEMii, accessibility is key to achieving inclusivity. We offer all our content in Khmer and allow users to download materials for offline access. This commitment ensures that the spark of innovation can ignite anywhere in Cambodia.
            </p>
            <p className="text-lg mb-6">
              Our interactive modules, gamified lessons, and online forums promote creativity, collaboration, and problem-solving skills. This environment nurtures a culture of innovation, essential for success in the 21st century.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-4xl font-bold text-blue-400 mb-6 animate-fadeIn">Celebrating Cambodian STEM Heroes</h2>
          <p className="text-lg mb-6">
            We believe in the power of inspiration. By featuring profiles of accomplished Cambodian professionals in STEM fields, we show students the diverse career possibilities and inspire them to make a difference on the global stage.
          </p>
          <p className="text-lg mb-6">
            STEMii is more than just an educational platform; it’s a community. A network of passionate educators, students, mentors, and changemakers who believe in the power of STEM to transform Cambodia's future.
          </p>
          <p className="text-xl font-semibold text-blue-400 animate-fadeIn">
            Join us in building a brighter, more sustainable future for our nation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
