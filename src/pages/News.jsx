import React, { useEffect, useState } from 'react';
import { db } from '../firebase.Config'; 
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import "../assets/css/News.css"

function News() {
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
    <div className="news-page-container">
      <h2>News</h2>
      <div className="news-cards">
        {news.map((article) => (
          <div key={article.id} className="news-card">
            {article.imageURL && <img src={article.imageURL} alt={article.title} />}
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <p>Date: {article.date}</p>
            <Link to={article.url} target="_blank" rel="noopener noreferrer">Read More</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;
