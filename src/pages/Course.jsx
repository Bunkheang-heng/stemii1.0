import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase.Config';
import { collection, getDocs } from 'firebase/firestore';
import ReactPlayer from 'react-player';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../assets/css/CourseList.css';

function DisplayCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleCardClick = (course) => {
    if (user) {
      setSelectedCourse(course);
    } else {
      navigate('/login');
    }
  };

  const renderVideoPlayer = (url) => {
    if (url.includes('drive.google.com')) {
      return (
        <div className="relative w-full h-full">
          <iframe 
            src={url.replace('/view?usp=sharing', '/preview')}
            width="100%" 
            height="70%" 
            allow="autoplay; encrypted-media" 
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <div className="absolute top-1 right-1 w-[50px] h-[50px]"></div>
        </div>
      );
    } else {
      return (
        <ReactPlayer
          url={url}
          controls={true}
          width="100%"
          height="auto"
          className="react-player"
        />
      );
    }
  };

  return (
    <div className="display-courses-container">
      {selectedCourse ? (
        <div className="course-details">
          <div className="course-card">
            <h3>{selectedCourse.name}</h3>
            <p>Course Description: {selectedCourse.description}</p>
          </div>
          <div className="sections-container">
            {selectedCourse.sections.map((section, index) => (
              <div key={index} className="section-card">
                <p className="section-description-header">
                  Section {index + 1}: {section.name}
                </p>
                <p className="section-description-header">
                  {section.description}
                </p>
                {section.fileUrl && renderVideoPlayer(section.fileUrl)}
                {section.url && renderVideoPlayer(section.url)}
                {section.exerciseUrl && (
                  <div className="exercise-download-link">
                    <a href={section.exerciseUrl} download>
                      Download Exercise
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div>
            <button
              onClick={() => setSelectedCourse(null)}
              className="backcourse"
            >
              Back to Courses
            </button>
          </div>
        </div>
      ) : (
        <div className="course-cards">
          {courses.map((course) => {
            const imageUrl = course.imageUrl || 'path/to/default-image.jpg';
            const description =
              (course.description &&
                course.description.length > 200
                  ? course.description.substring(0, 200) + '...'
                  : course.description) || 'No description available';

            return (
              <div
                key={course.id}
                className="course-card"
                onClick={() => handleCardClick(course)}
              >
                <div className="course-image">
                  <img src={imageUrl} alt={course.name} />
                </div>
                <div className="course-info">
                  <h3>{course.name}</h3>
                  <p className="course-description">{description}</p>
                  <p>Number of Sections: {course.sections.length}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DisplayCoursesPage;
