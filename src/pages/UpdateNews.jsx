import React, { useState, useEffect } from 'react';
import { db } from '../firebase.Config'; 
import { collection, doc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';

function NewsUpdate() {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    async function fetchNewsList() {
      try {
        const newsCollection = collection(db, 'news');
        const snapshot = await getDocs(newsCollection);
        const newsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), editable: false }));
        setNewsList(newsData);
      } catch (error) {
        console.error('Error fetching news list: ', error);
      }
    }

    fetchNewsList();
  }, []);

  const handleEditToggle = (id) => {
    setNewsList(newsList.map(news => {
      if (news.id === id) {
        return { ...news, editable: !news.editable };
      }
      return news;
    }));
  };

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setNewsList(newsList.map(news => {
      if (news.id === id) {
        return { ...news, [name]: value };
      }
      return news;
    }));
  };

  const handleUpdate = async (id) => {
    try {
      const newsRef = doc(db, 'news', id);
      const newsToUpdate = newsList.find(news => news.id === id);
      await updateDoc(newsRef, {
        title: newsToUpdate.title,
        description: newsToUpdate.description,
        date: newsToUpdate.date,
        imageURL: newsToUpdate.imageURL,
        url: newsToUpdate.url
      });
      handleEditToggle(id);
      console.log('News updated successfully');
    } catch (error) {
      console.error('Error updating news: ', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const newsRef = doc(db, 'news', id);
      await deleteDoc(newsRef);
      setNewsList(newsList.filter(item => item.id !== id));
      console.log('News deleted successfully');
    } catch (error) {
      console.error('Error deleting news: ', error);
    }
  };

  return (
    <div className="news-update-container max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">Update or Delete News</h2>
      <ul className="news-list">
        {newsList.map(news => (
          <li key={news.id} className="news-item bg-white rounded-lg shadow-md p-6 mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{news.editable ? <input type="text" name="title" value={news.title} onChange={(e) => handleInputChange(e, news.id)} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" /> : news.title}</h3>
              <p className="text-gray-700 mb-2">{news.editable ? <textarea name="description" value={news.description} onChange={(e) => handleInputChange(e, news.id)} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 resize-none" /> : news.description}</p>
              <p className="text-gray-700 mb-2">Date: {news.editable ? <input type="date" name="date" value={news.date} onChange={(e) => handleInputChange(e, news.id)} className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" /> : news.date}</p>
              <p className="text-gray-700 mb-2">URL: {news.editable ? <input type="text" name="url" value={news.url} onChange={(e) => handleInputChange(e, news.id)} className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" /> : news.url}</p>
              {news.editable ? 
                <button onClick={() => handleUpdate(news.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mr-2">Save</button> :
                <>
                  <button onClick={() => handleEditToggle(news.id)} className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded mr-2">Edit</button>
                  <button onClick={() => handleDelete(news.id)} className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded">Delete</button>
                </>
              }
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NewsUpdate;
