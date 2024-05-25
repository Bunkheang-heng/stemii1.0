import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.Config";
import "../assets/css/Banner.css"; // Import the CSS file

export default function Banner() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const querySnapshot = await getDocs(collection(db, "Banner"));
      const imageUrls = querySnapshot.docs.map(doc => doc.data().imageUrl);
      setImages(imageUrls);
    };

    fetchImages();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="banner-container">
      <Slider {...settings}>
        {images.map((url, index) => (
          <div key={index}>
            <img src={url} alt={`Slide ${index}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
