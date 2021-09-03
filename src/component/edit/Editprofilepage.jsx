import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import storage from "../../base";

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
      storage.getStorage();
      const storageRef = storage.ref(
        storage.getStorage(),
        "images/" + Date.now() + item.file.name
      );
      const uploadtask = storage.uploadBytesResumable(
        storageRef,
        item,
        metadata
      );
      uploadtask.on(
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
          storage.getDownloadURL(uploadtask.snapshot.ref).then((url) => {
            setusers((prev) => {
              return { ...prev, [item.label]: url };
            });

            setUpload((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: profileImage, label: "profileImage" },
      { file: coverPicture, label: "coverPicture" },
    ]);
  };

  const editHandler = async () => {
    const data = {
      username: users.username,
      email: users.email,
      password: users.password,
      profilepicture: users.profileImage,
      coverpicture: users.coverPicture,
      description: users.description,
      city: users.city,
      town: users.town,
      relationship: users.relationship,
    };

    await axios.put(`http://192.168.88.156:8000/user/${user.user.ID}`, data, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  };

  console.log(users);
  return (
    <div className="profiledit">
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

      {uploaded === 2 ? (
        <button className="editbutton" onClick={editHandler}>
          edit
        </button>
      ) : (
        <button className="editbutton" onClick={handleUpload}>
          upload
        </button>
      )}
    </div>
  );
};

export default EditPage;
