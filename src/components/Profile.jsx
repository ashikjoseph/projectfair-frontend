import React, { useEffect, useState } from 'react';
import { addProfileApi, editUserProfile, userProfileApi } from '../services/allAPI';
import { BASE_URL } from '../services/baseurl';

const dummyProfileImage = 'https://t4.ftcdn.net/jpg/04/83/90/95/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg';

function Profile({ userName, email, onProfileAdded }) {
  const [userProfile, setUserProfile] = useState({
    githubLink: '',
    linkedinLink: '',
    profileImage: dummyProfileImage,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(dummyProfileImage);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setError("User is not authenticated.");
      setLoading(false);
      return;
    }

    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };

    try {
      const result = await userProfileApi(reqHeader);
      // Adjust this based on your backend response structure:
      // If your backend returns a single profile object instead of array, adjust here:
      const profileData = Array.isArray(result.data) ? result.data[0] : result.data;

      if (profileData) {
        setUserProfile({
          ...profileData,
          profileImage: profileData.profileImage || dummyProfileImage,
        });

        setPreview(profileData.profileImage
          ? `${BASE_URL}/uploads/${profileData.profileImage}`
          : dummyProfileImage
        );

        setIsEdit(true);
      } else {
        setUserProfile({
          githubLink: '',
          linkedinLink: '',
          profileImage: dummyProfileImage
        });
        setPreview(dummyProfileImage);
        setIsEdit(false);
      }
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch user profile.");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserProfile(prev => ({ ...prev, profileImage: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("User is not authenticated.");
      return;
    }

    const reqHeader = {
      "Authorization": `Bearer ${token}`
    };

    const formData = new FormData();
    formData.append("githubLink", userProfile.githubLink);
    formData.append("linkedinLink", userProfile.linkedinLink);
    if (userProfile.profileImage instanceof File) {
      formData.append("profileImage", userProfile.profileImage);
    }

    try {
      let response;
      if (isEdit) {
        response = await editUserProfile(userProfile._id, formData, reqHeader);
      } else {
        response = await addProfileApi(formData, reqHeader);
      }

      if (response.status === 200) {
        alert("Profile saved successfully");
        if (onProfileAdded) onProfileAdded();
        // Refresh profile after save
        getUserProfile();
      } else {
        alert("Failed to save profile");
      }
    } catch (error) {
      console.error("Failed to save profile:", error);
      alert("Failed to save profile");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="card profile-card" style={{ width: '300px', margin: 'auto' }}>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <label htmlFor="profileImage" style={{ cursor: 'pointer' }}>
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            onChange={handleImageChange}
            style={{ display: "none" }}
            accept="image/*"
          />
          <img
            src={preview}
            alt="Profile Preview"
            className="card-img-top rounded-circle"
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
        </label>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
              type="text"
              className="form-control"
              value={userName}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="githubLink" className="form-label">GitHub Link:</label>
            <input
              type="url"
              id="githubLink"
              name="githubLink"
              className="form-control"
              value={userProfile.githubLink}
              onChange={handleChange}
              placeholder="Enter your GitHub link"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="linkedinLink" className="form-label">LinkedIn Link:</label>
            <input
              type="url"
              id="linkedinLink"
              name="linkedinLink"
              className="form-control"
              value={userProfile.linkedinLink}
              onChange={handleChange}
              placeholder="Enter your LinkedIn link"
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            {isEdit ? "Update" : "Add"} Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
