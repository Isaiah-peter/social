import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import storage from "../../base";
import "./edit.css";

const EditPage = () => {
  const [users, setusers] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);
  const [uploaded, setUpload] = useState(0);
  const { user } = useContext(AuthContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setusers({ ...users, [e.target.name]: value });
  };

  const upload = (items) => {
    const metadata = {
      contentType: "image/jpeg",
    };

    items.forEach((item) => {
      const storageRef = storage.ref(
        storage.getStorage(),
        "images/" + Date.now() + item.file.name
      );
      const uploadTask = storage.uploadBytesResumable(
        storageRef,
        item.file,
        metadata
      );
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (err) => {
          console.log(err);
        },
        () => {
          storage
            .getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              setUpload(uploaded + 1);
              setusers((prev) => {
                return { ...prev, [item.label]: downloadURL };
              });
            });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: profileImage, label: "profilepicture" },
      { file: coverPicture, label: "coverpicture" },
    ]);
  };

  const editHandler = async () => {
    const data = {
      username: users.username,
      email: users.email,
      password: users.password,
      profilepicture: users.profilepicture,
      coverpicture: users.coverpicture,
      description: users.description,
      city: users.city,
      town: users.town,
      relationship: users.relationship,
    };

    await axios.put(`http://localhost:8000/user/${user.user.ID}`, data, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  };

  console.log("image", users);
  return (
    <div className="editcontainer">
      <div className="profiledit">
        <input
          className="editinput"
          type="file"
          name="profilepicture"
          placeholder="profilepicture"
          id="profilepicture"
          onChange={(e) => setProfileImage(e.target.files[0])}
        />
        <input
          className="editinput"
          type="file"
          name="coverphoto"
          placeholder="coverphoto"
          id="coverphoto"
          onChange={(e) => setCoverPicture(e.target.files[0])}
        />
        <input
          className="editinput"
          type="text"
          name="username"
          placeholder="username"
          onChange={handleChange}
        />
        <input
          className="editinput"
          type="email"
          name="email"
          placeholder="email"
          onChange={handleChange}
        />
        <input
          className="editinput"
          type="password"
          name="password"
          placeholder="password"
          minLength="6"
          onChange={handleChange}
        />

        <input
          className="editinput"
          type="text"
          name="relationship"
          placeholder="relationship"
          onChange={handleChange}
        />
        <input
          className="editinput"
          type="text"
          name="description"
          placeholder="description"
          onChange={handleChange}
        />
        <input
          className="editinput"
          type="text"
          name="town"
          placeholder="town"
          onChange={handleChange}
        />
        <input
          className="editinput"
          type="text"
          name="city"
          placeholder="city"
          onChange={handleChange}
        />

        {uploaded === 1 ? (
          <div className="gridcontroller">
            <button className="editbutton" onClick={editHandler}>
              edit
            </button>
          </div>
        ) : (
          <div className="gridcontroller">
            <button className="editbutton u" onClick={handleUpload}>
              upload
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditPage;
