import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebase.Config';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function ManageCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseImageUrl, setCourseImageUrl] = useState('');
  const [sections, setSections] = useState([]);
  const [editSectionIndex, setEditSectionIndex] = useState(null);
  const [sectionName, setSectionName] = useState('');
  const [sectionDescription, setSectionDescription] = useState('');
  const [newSectionName, setNewSectionName] = useState('');
  const [newSectionDescription, setNewSectionDescription] = useState('');
  const [newSectionFile, setNewSectionFile] = useState(null);
  const [newSectionUrl, setNewSectionUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      const querySnapshot = await getDocs(collection(db, 'courses'));
      const coursesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCourses(coursesData);
    };

    fetchCourses();
  }, []);

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setCourseName(course.name);
    setCourseDescription(course.description);
    setCourseImageUrl(course.imageUrl);
    setSections(course.sections);
    resetSectionForm();
  };

  const handleUpdateCourse = async () => {
    if (!selectedCourse) {
      alert('No course selected');
      return;
    }

    setUploading(true);

    try {
      const courseData = {
        name: courseName,
        description: courseDescription,
        imageUrl: courseImageUrl,
        sections: sections,
      };

      await updateDoc(doc(db, 'courses', selectedCourse.id), courseData);
      console.log('Course updated successfully');
      setUploadError(null);
    } catch (error) {
      setUploadError('Error updating course. Please try again.');
      console.error('Error updating course:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteCourse = async () => {
    if (!selectedCourse) {
      alert('No course selected');
      return;
    }

    setUploading(true);

    try {
      await deleteDoc(doc(db, 'courses', selectedCourse.id));
      setCourses(courses.filter(course => course.id !== selectedCourse.id));
      resetForm();
      console.log('Course deleted successfully');
      setUploadError(null);
    } catch (error) {
      setUploadError('Error deleting course. Please try again.');
      console.error('Error deleting course:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleEditSection = (index) => {
    const section = sections[index];
    setEditSectionIndex(index);
    setSectionName(section.name);
    setSectionDescription(section.description);
  };

  const handleUpdateSection = () => {
    if (editSectionIndex === null) return;

    const updatedSections = [...sections];
    updatedSections[editSectionIndex] = {
      ...updatedSections[editSectionIndex],
      name: sectionName,
      description: sectionDescription,
    };
    setSections(updatedSections);
    resetSectionForm();
  };

  const handleDeleteSection = (index) => {
    const updatedSections = sections.filter((_, idx) => idx !== index);
    setSections(updatedSections);
  };

  const handleAddSection = async () => {
    if (!newSectionName || !newSectionDescription) {
      alert('Please provide both section name and description');
      return;
    }

    let fileUrl = null;

    if (newSectionFile) {
      const storageRef = ref(storage, `sections/${newSectionFile.name}`);
      const snapshot = await uploadBytes(storageRef, newSectionFile);
      fileUrl = await getDownloadURL(snapshot.ref);
    }

    const newSection = {
      name: newSectionName,
      description: newSectionDescription,
      fileUrl: fileUrl,
      url: newSectionUrl,
    };

    setSections([...sections, newSection]);
    setNewSectionName('');
    setNewSectionDescription('');
    setNewSectionFile(null);
    setNewSectionUrl('');
  };

  const resetForm = () => {
    setSelectedCourse(null);
    setCourseName('');
    setCourseDescription('');
    setCourseImageUrl('');
    setSections([]);
    resetSectionForm();
  };

  const resetSectionForm = () => {
    setEditSectionIndex(null);
    setSectionName('');
    setSectionDescription('');
  };

  return (
    <div className="manage-course-container max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Courses</h2>
      {uploadError && <p className="error-message text-red-500">{uploadError}</p>}
      <div className="course-list mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Available Courses</h3>
        <ul>
          {courses.map(course => (
            <li key={course.id} onClick={() => handleSelectCourse(course)} className="cursor-pointer bg-gray-100 rounded-lg px-4 py-2 mb-2 hover:bg-gray-200 transition duration-300">
              {course.name}
            </li>
          ))}
        </ul>
      </div>
      {selectedCourse && (
        <div className="course-details">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Edit Course</h3>
          <div className="form-group mb-4">
            <label className="block text-sm font-semibold text-gray-600">Course Name:</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="form-group mb-4">
            <label className="block text-sm font-semibold text-gray-600">Course Description:</label>
            <textarea
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
              rows="4"
            />
          </div>
          <div className="form-group mb-4">
            <label className="block text-sm font-semibold text-gray-600">Course Image URL:</label>
            <input
              type="text"
              value={courseImageUrl}
              onChange={(e) => setCourseImageUrl(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"/>
              </div>
              <div className="form-group mb-4">
                <label className="block text-sm font-semibold text-gray-600">Sections:</label>
                <ul className="section-list">
                  {sections.map((section, index) => (
                    <li key={index} className="mb-4">
                      <p><span className="font-semibold">Name:</span> {section.name}</p>
                      <p><span className="font-semibold">Description:</span> {section.description}</p>
                      {section.fileUrl && <p><span className="font-semibold">File URL:</span> <a href={section.fileUrl} target="_blank" rel="noopener noreferrer">View File</a></p>}
                      {section.url && <p><span className="font-semibold">URL:</span> <a href={section.url} target="_blank" rel="noopener noreferrer">{section.url}</a></p>}
                      <button className="h-10 bg-blue-500 hover:bg-blue-600 w-20 text-white rounded-lg mr-2" onClick={() => handleEditSection(index)}>Edit</button>
                      <button className="h-10 bg-red-500 hover:bg-red-600 w-20 text-white rounded-lg mr-2" onClick={() => handleDeleteSection(index)}>Delete</button>
                    </li>
                  ))}
                </ul>
              </div>
              {editSectionIndex !== null && (
                <div className="form-group mb-4">
                  <label className="block text-sm font-semibold text-gray-600">Edit Section Name:</label>
                  <input
                    type="text"
                    value={sectionName}
                    onChange={(e) => setSectionName(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 w-full"
                  />
                  <label className="block text-sm font-semibold text-gray-600">Edit Section Description:</label>
                  <textarea
                    value={sectionDescription}
                    onChange={(e) => setSectionDescription(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    rows="4"
                  />
                  <button className="button mt-2" onClick={handleUpdateSection}>Update Section</button>
                </div>
              )}
              <div className="form-group mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Add New Section</h3>
                <label className="block text-sm font-semibold text-gray-600">New Section Name:</label>
                <input
                  type="text"
                  value={newSectionName}
                  onChange={(e) => setNewSectionName(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
                <label className="block text-sm font-semibold text-gray-600">New Section Description:</label>
                <textarea
                  value={newSectionDescription}
                  onChange={(e) => setNewSectionDescription(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  rows="4"
                />
                <label className="block text-sm font-semibold text-gray-600">New Section URL:</label>
                <input
                  type="text"
                  value={newSectionUrl}
                  onChange={(e) => setNewSectionUrl(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
                <label className="block text-sm font-semibold text-gray-600">New Section File:</label>
                <input
                  type="file"
                  onChange={(e) => setNewSectionFile(e.target.files[0])}
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
                <button className="button mt-2" onClick={handleAddSection}>Add Section</button>
              </div>
              <button className="h-10 w-full text-white rounded-lg bg-blue-400 hover:bg-blue-600" onClick={handleUpdateCourse} disabled={uploading}>
                {uploading ? 'Updating...' : 'Update Course'}
              </button>
              <button className="w-full h-10 rounded-lg text-white bg-red-400 hover:bg-red-500 " onClick={handleDeleteCourse} disabled={uploading}>
                {uploading ? 'Deleting...' : 'Delete Course'}
              </button>
            </div>
          )}
        </div>
      );
    }
    
    export default ManageCoursesPage;