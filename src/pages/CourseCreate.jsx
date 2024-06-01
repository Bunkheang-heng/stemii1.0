import React, { useState } from 'react';
import { db, storage } from '../firebase.Config';
import { collection, addDoc } from 'firebase/firestore';
import '../assets/css/CourseCreate.css';

function UploadCoursePage() {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseImage, setCourseImage] = useState(null);
  const [courseImageUrl, setCourseImageUrl] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [sections, setSections] = useState([]);
  const [sectionName, setSectionName] = useState('');
  const [sectionFile, setSectionFile] = useState(null);
  const [sectionUrl, setSectionUrl] = useState('');
  const [sectionDescription, setSectionDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadType, setUploadType] = useState('file'); // 'file' or 'url'

  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleAddSection = async () => {
    if (sectionName.trim() === '') {
      alert('Section name is required');
      return;
    }

    setUploading(true);
    let sectionData = { name: sectionName, description: sectionDescription };

    try {
      if (uploadType === 'file' && sectionFile) {
        const fileRef = storage.ref().child(sectionFile.name);
        await fileRef.put(sectionFile);
        sectionData.fileUrl = await fileRef.getDownloadURL();
      } else if (uploadType === 'url' && sectionUrl.trim() !== '') {
        sectionData.url = sectionUrl;
      }

      setSections([...sections, sectionData]);
      resetSectionForm();
    } catch (error) {
      setUploadError('Error uploading section. Please try again.');
      console.error('Error uploading section:', error);
    } finally {
      setUploading(false);
    }
  };

  const resetSectionForm = () => {
    setSectionName('');
    setSectionFile(null);
    setSectionUrl('');
    setSectionDescription('');
  };

  const handleUploadCourse = async () => {
    if (courseName.trim() === '' || sections.length === 0) {
      alert('Please provide a course name and at least one section');
      return;
    }

    setUploading(true);

    try {
      let courseData = {
        name: courseName,
        description: courseDescription,
        tags: tags,
        sections: sections,
      };

      if (courseImage) {
        const imageFileRef = storage.ref().child(courseImage.name);
        await imageFileRef.put(courseImage);
        courseData.imageUrl = await imageFileRef.getDownloadURL();
      } else if (courseImageUrl.trim() !== '') {
        courseData.imageUrl = courseImageUrl;
      }

      await addDoc(collection(db, 'courses'), courseData);
      console.log('Course uploaded successfully');
      resetForm();
    } catch (error) {
      setUploadError('Error uploading course. Please try again.');
      console.error('Error uploading course:', error);
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setCourseName('');
    setCourseDescription('');
    setCourseImage(null);
    setCourseImageUrl('');
    setTags([]);
    setSections([]);
    resetSectionForm();
  };

  return (
    <div className="upload-course-container">
      <h2>Upload Course</h2>
      {uploadError && <p className="error-message">{uploadError}</p>}
      <div className="form-group">
        <label>Course Name:</label>
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Course Description:</label>
        <textarea
          value={courseDescription}
          onChange={(e) => setCourseDescription(e.target.value)}
          placeholder="Course Description"
        />
      </div>
      <div className="form-group">
        <label>Course Image:</label>
        <input
          type="text"
          placeholder="Image URL"
          value={courseImageUrl}
          onChange={(e) => setCourseImageUrl(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setCourseImage(e.target.files[0])}
        />
      </div>
      <div className="form-group">
        <label>Tags:</label>
        <div className="tags-input">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Add a tag"
          />
          <button onClick={handleAddTag}>Add Tag</button>
        </div>
        <ul className="tag-list">
          {tags.map((tag, index) => (
            <li key={index}>
              {tag}
              <button onClick={() => handleRemoveTag(index)}>x</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="form-group">
        <label>Sections:</label>
        <ul className="section-list">
          {sections.map((section, index) => (
            <li key={index}>
              <p>Name: {section.name}</p>
              <p>Description: {section.description}</p>
              {section.fileUrl && <p>File URL: <a href={section.fileUrl} target="_blank" rel="noopener noreferrer">View File</a></p>}
              {section.url && <p>URL: <a href={section.url} target="_blank" rel="noopener noreferrer">{section.url}</a></p>}
            </li>
          ))}
        </ul>
        <div className="input-group">
          <input
            type="text"
            value={sectionName}
            onChange={(e) => setSectionName(e.target.value)}
            placeholder="Section Name"
          />
          {uploadType === 'file' && (
            <input
              type="file"
              onChange={(e) => setSectionFile(e.target.files[0])}
            />
          )}
          {uploadType === 'url' && (
            <input
              type="text"
              placeholder="URL"
              value={sectionUrl}
              onChange={(e) => setSectionUrl(e.target.value)}
            />
          )}
          <textarea
            placeholder="Description"
            value={sectionDescription}
            onChange={(e) => setSectionDescription(e.target.value)}
          />
          <div>
            <label>
              <input
                type="radio"
                value="file"
                checked={uploadType === 'file'}
                onChange={() => setUploadType('file')}
              />
              Upload File
            </label>
            <label>
              <input
                type="radio"
                value="url"
                checked={uploadType === 'url'}
                onChange={() => setUploadType('url')}
              />
              Upload URL
            </label>
          </div>
          <button className="button" onClick={handleAddSection} disabled={uploading}>
            {uploading ? 'Adding...' : 'Add Section'}
          </button>
        </div>
      </div>
      <button className="button" onClick={handleUploadCourse} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload Course'}
      </button>
    </div>
  );
}

export default UploadCoursePage;
