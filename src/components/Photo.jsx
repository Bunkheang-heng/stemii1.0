import React from 'react';

export default function Photo() {
  return (
    <div className='flex flex-wrap justify-between items-center gap-2 ml-2 mr-2 mt-[100px]'>
      {['Science', 'Technology', 'Engineering', 'Math', 'Soft Skills', 'Digital Skills'].map((category, index) => {
        const images = [
          'https://images.ctfassets.net/cnu0m8re1exe/1WBHpZwfgHmerrXamgyA46/cc273f2cfbfd0578a09283717f5c2259/scientists.jpg',
          'https://cdn1.vectorstock.com/i/1000x1000/21/50/technology-and-innovation-an-depicting-a-robot-vector-46862150.jpg',
          'https://img.freepik.com/premium-vector/engineering-teamwork-flat-character-animation-cartoon-vector_40876-2691.jpg',
          'https://epe.brightspotcdn.com/dims4/default/1e49415/2147483647/strip/true/crop/2956x2006+22+0/resize/840x570!/quality/90/?url=https%3A%2F%2Fepe-brightspot.s3.us-east-1.amazonaws.com%2F02%2Fac%2Fa5498e524778b568fea054141968%2Fmath-102023-1281244731-01.jpg',
          'https://www.talentlms.com/blog/wp-content/uploads/2020/10/TLMS_20231117_1200x628-1.png',
          'https://mlouxk3aanh6.i.optimole.com/w:auto/h:auto/q:mauto/f:best/ig:avif/https://digitalskillsacademyng.com/wp-content/uploads/2021/08/digital-skills.jpg'
        ];

        const descriptions = [
          'Science is a systematic way of understanding the world around us. Through observation, experimentation, and analysis, science builds a body of knowledge that explains how things work.',
          'Technology is the application of scientific knowledge to create tools and processes. These tools and processes can solve problems, improve efficiency, and even change the way we live.',
          'Engineering is the creative use of science and math to design and build things. It involves solving problems, from building bridges to developing new medical devices, to improve our lives.',
          'Math is the language of patterns and relationships. It uses numbers, shapes, and logic to help us understand, measure, and analyze the world around us.',
          'Soft skills are personal attributes that help you interact effectively with others. These skills, like communication and teamwork, are crucial for success in many fields and complement your technical abilities.',
          'Digital skills are the abilities to use technology effectively. This includes using devices, finding information online, creating content, and communicating through digital channels. They\'re essential in today\'s world, for both work and personal life.'
        ];

        return (
          <div key={index} className='bg-white shadow-lg rounded-lg overflow-hidden w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 transform transition-transform duration-300 hover:scale-105 ml-[50px] mr-[50px] mb-[70px]'>
            <img className='w-full h-48 object-cover' src={images[index]} alt={category}/>
            <div className='p-4'>
              <h2 className='text-xl font-semibold mb-2'>{category}</h2>
              <p className='text-gray-500'>{descriptions[index]}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
