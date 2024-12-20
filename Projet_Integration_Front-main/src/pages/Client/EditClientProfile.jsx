import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./EditClientProfile.css";
import { Button } from "primereact/button";
import { getUserProfile, updateUserProfile } from "../../services/ProfileUser";

const EditClientProfile = () => {
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const userData = await getUserProfile();
        setId(userData.id);
       
        setFirstName(userData.prenom || "");
        setLastName(userData.nom || "");
        setAge(userData.age || "");
        setPhone(userData.phone || "");
        setLocation(userData.location || "");
        setBio(userData.bio || "");
       
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    }

    fetchUserProfile();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {};
    formData['id'] = parseInt( id);
    formData['prenom'] = firstName;     
    formData['nom'] = lastName;
    formData['age'] = parseInt(age);
    formData['phone'] = phone;
    formData['location'] = location;
    formData['bio'] = bio;

    if (image) {
        formData['img'] = image;
    }
console.log(formData);
    try {
      await updateUserProfile(formData);
      navigate('/client-profile'); // Redirect to ClientProfile page
    } catch (error) {
      console.error('Failed to update user profile:', error);
    }
  };



  return (
    <div>
      <Navbar />
      <div className="profile-content">
        <div className="profile-form-section">
          <h1 className="profile-title">Personalize Your Profile</h1>
          <form className="profile-form" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-group">
              <label>Profile Image</label>
              <input type="file" accept="image/*" onChange={(e)=>setImage(e.target.files[0])} />
            </div>
            <div className="form-group-inline">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group-inline">
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Bio</label>
              <textarea
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <div className="form-actions">
              <Button label="Save" severity="warning" className="p-button-warning" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditClientProfile;