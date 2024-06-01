import React, { useState } from 'react';
import UploadCoursePage from './CourseCreate';
import NewsUpload from './NewsUpload';
import ManageCoursesPage from './Update';
import NewsUpdate from './UpdateNews';
import { UserAuthStatus } from '../hooks/userAuthStatus'; // Import the UserAuthStatus hook
import '../assets/css/Admin.css'; 

export default function Admin() {
  const { loggedIn, isAdmin, checkingStatus } = UserAuthStatus();
  const [selectedMenu, setSelectedMenu] = useState('courses');

  const renderSelectedMenu = () => {
    switch (selectedMenu) {
      case 'courses':
        return <UploadCoursePage />;
      case 'news':
        return <NewsUpload />;
      case 'manage':
        return <ManageCoursesPage />;
      case 'UpdateNews':
        return <NewsUpdate />;
      default:
        return null;
    }
  };

  if (checkingStatus) {
    return <div>Loading...</div>; // Show a loading indicator while checking the status
  }

  if (!loggedIn || !isAdmin) {
    return <div>You do not have access to this page.</div>; // Show an access denied message if the user is not an admin
  }

  return (
    <div>
      <nav>
        <ul>
          <li onClick={() => setSelectedMenu('courses')}>Upload Course</li>
          <li onClick={() => setSelectedMenu('news')}>Upload News</li>
          <li onClick={() => setSelectedMenu('manage')}>Update Course</li>
          <li onClick={() => setSelectedMenu('UpdateNews')}>Update News</li>
        </ul>
      </nav>
      <div className="admin-panel">
        {renderSelectedMenu()}
      </div>
    </div>
  );
}
