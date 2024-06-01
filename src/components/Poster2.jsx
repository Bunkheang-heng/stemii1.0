import React, { useEffect, useState } from 'react';
import { db } from '../firebase.Config'; // Assuming you have Firebase configuration
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function Poster2() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'news'));
        const newsData = [];
        querySnapshot.forEach((doc) => {
          newsData.push({ id: doc.id, ...doc.data() });
        });
        setNews(newsData);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='bg-gray-100 py-12'>
      <div className='container mx-auto'>
        <h1 className='text-4xl text-center font-extrabold text-blue-600 mb-8'>What is STEMii?</h1>
        <div className='flex justify-center mb-12'>
          <p className='text-gray-700 w-full max-w-2xl text-center text-lg'>
            STEMii is an e-learning platform that provides STEM education in a fun and engaging way.
            We want to make STEM accessible for all Cambodian students.
          </p>
        </div>
        <div className='news-cards-container mt-8'>
          <div className='flex justify-center'>
            <div className='news-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
              {news.slice(0, 8).map((article) => (
                <div key={article.id} className="news-card bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105">
                  {article.imageURL && <img src={article.imageURL} alt={article.title} className="w-full h-36 object-cover" />}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-blue-600 mb-2">{article.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{article.description}</p>
                    <p className="text-gray-400 text-xs mb-4">Date: {article.date}</p>
                    <Link to={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
