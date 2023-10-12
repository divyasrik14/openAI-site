import React, { useState } from "react";

const Home = () => {
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    fetch("http://localhost:5000/upload", {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUploaded(true);
      })
      .catch((error) => {
        console.error("File upload error:", error);
      });
  };

  const handleStart = () => {
    if (uploaded === false) {
      alert("Please upload a file before getting started !");
    }

    fetch("http://localhost:5000/model", {
      method: "POST",
      credentials: "include"
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="entry-input">
        <input type="file" name="file" onChange={handleFileChange}></input>

        <div className="entry-buttons">
          <button onClick={handleUpload}>Upload</button>
          <button onClick={handleStart}>Start !</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
