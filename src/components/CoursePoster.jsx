import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase.Config'; 
import { collection, getDocs } from 'firebase/firestore';

export default function CoursePoster() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'courses'));
        const coursesData = [];
        querySnapshot.forEach((doc) => {
          coursesData.push({ id: doc.id, ...doc.data() });
        });
        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchData();
  }, []);

  const truncateDescription = (description, wordLimit) => {
    const words = description.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : description;
  };

  return (
    <div className='mb-10'>
      <div className='flex justify-between'>
        <h1 className='text-3xl ml-10 font-bold'>Popular Courses</h1>
        <Link to="/course" className='mr-[130px] text-blue-400 text-xl'>View All</Link>
      </div>
      <div className='mt-8'>
        <div className='flex justify-center ml-5 mr-5'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {courses.slice(0, 8).map((course) => (
              <div key={course.id} className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition duration-300">
                {course.imageUrl && <img src={course.imageUrl} alt={course.name} className="w-full h-40 object-cover" />}
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{course.name}</h3>
                  <p className="text-gray-700 text-sm mb-4">{truncateDescription(course.description, 15)}</p>
                  <p className="text-gray-500 text-xs mb-4">Sections: {course.sections.length}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
