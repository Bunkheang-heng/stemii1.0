import React, { useEffect, useState } from 'react';
import { db } from '../firebase.Config'; // Assuming you have Firebase configuration
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import "../assets/css/News.css";

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
    <div className='mb-10'>
      <h1 className='text-3xl text-center font-bold mb-8 mt-10'>What is Stemii?</h1>
      <div className='flex justify-center'>
        <p className='text-gray-500 w-full max-w-[730px] text-center'>
          STEMii is an e-learning platform that provides STEM education in a fun and engaging way.
          We want to make STEM accessible for all Cambodian students.
        </p>
      </div>
      <div className='news-cards-container mt-8'>
        <div className='flex justify-center'>
          <div className='news-cards flex flex-wrap justify-center gap-6'>
            {news.slice(0, 3).map((article) => (
              <div key={article.id} className="news-card w-80 bg-white shadow-md rounded-lg overflow-hidden">
                {article.imageURL && <img src={article.imageURL} alt={article.title} className="w-full h-40 object-cover" />}
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                  <p className="text-gray-700 text-sm mb-4">{article.description}</p>
                  <p className="text-gray-500 text-xs mb-4">Date: {article.date}</p>
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
  );
}
