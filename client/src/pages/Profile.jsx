import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUplaodError, setFileUplaodError] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser.username || "",
    email: currentUser.email || "",
    avatar: currentUser.avatar || "",
  });

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name; // Create a unique filename
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Handle progress
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error("Error while uploading:", error);
        setFileUplaodError(true);
      },
      () => {
        // Handle successful uploads
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setFormData((prevData) => ({
              ...prevData,
              avatar: downloadURL, // Store the download URL in formData
            }));
            console.log("File available at:", downloadURL);
          })
          .catch((error) => {
            console.error("Failed to get download URL:", error);
          });
      }
    );
  };
  // console.log(filePercentage);
  // console.log(file);
  // console.log(fileUplaodError);
  return (
    <div className="max-w-lg  p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7"> Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => {
            const selectedFile = e.target.files[0];
            if (selectedFile) {
              if (selectedFile.size > 2 * 1024 * 1024) {
                alert("File size exceeds 2MB. Please choose a smaller file.");
                return;
              }
              setFile(selectedFile);
            }
          }}
        />
        <img
          src={formData.avatar || currentUser.avatar}
          onClick={() => fileRef.current.click()}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center "
        />
        <p className="self-center text-sm">
          {fileUplaodError ? (
            <span className="text-red-700">
              Error Image upload {`Image must be < 2 MB`}{" "}
            </span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span>{`Uploading ${filePercentage}% `}</span>
          ) : filePercentage === 100 ? (
            <span className="text-green-700">Image Successfully uploaded</span>
          ) : null}
        </p>
        <input
          type="text"
          placeholder="username"
          className="rounded-lg p-3 border"
          id="username"
        />
        <input
          type="text"
          placeholder="email"
          className="rounded-lg p-3 border"
          id="email"
        />
        <input
          type="text"
          placeholder="password"
          className="rounded-lg p-3 border"
          id="password"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          {" "}
          update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        {" "}
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
