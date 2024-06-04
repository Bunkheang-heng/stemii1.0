import React, { useState } from 'react';
import { db } from '../firebase.Config'; 
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "../assets/css/NewsUpload.css"

function NewsUpload() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [url, setURL] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newsRef = collection(db, 'news');
      const newNews = await addDoc(newsRef, {
        title,
        description,
        date,
        imageURL,
        url
      });
      console.log('News added with ID: ', newNews.id);
      toast.success("News Uploaded Sucessfully");
      navigate('/news');
    } catch (error) {
      toast.error("Could not upload the news");
    }
  };

  return (
    <div className="news-upload-container">
      <h2>Upload News</h2>
      <form className="news-upload-form" onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label>Image URL:</label>
          <input type="text" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
        </div>
        <div>
          <label>URL:</label>
          <input type="text" value={url} onChange={(e) => setURL(e.target.value)} />
        </div>
        <button type="submit" >Submit</button>
      </form>
    </div>
  );
}

export default NewsUpload;
