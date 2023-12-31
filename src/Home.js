import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { baseURL } from "./constants";
import { Spin } from "antd";

const Home = () => {
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      // alert("Please select a file to upload.");
      NotificationManager.warning(
        "Please upload a file to continue",
        "Warning!",
        2000
      );

      return;
    }

    if (file.type !== "application/pdf") {
      NotificationManager.warning("Please upload PDFs only", "Warning!", 2000);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    fetch(`${baseURL}upload`, {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        setLoading(false);
        NotificationManager.success("PDF uploaded succesfully", "Info!", 2000);
        setUploaded(true);
      })
      .catch((error) => {
        console.error("File upload error:", error);
        NotificationManager.error("Try Uploading again", "Alert!", 2000);
      });
  };

  const handleStart = () => {
    if (uploaded === false) {
      // alert("Please upload a file before getting started !");
      NotificationManager.info(
        "Please upload a PDF File before getting started",
        "Info!",
        2000
      );
      return;
    }

    setLoading(true);
    fetch(`${baseURL}model`, {
      method: "POST",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        NotificationManager.info(data.message, "Info!", 2000);
        navigate("/chat");
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error("Try again!", "Alert!", 2000);
      });
  };

  return (
    <div className="home">
      <div className="entry-heading">
        <h3>SmartPDF - Your Questions, Our Answers</h3>
      </div>
      <div className="entry-input">
        {loading ? <Spin /> : ""}
        <div className="entry-contents">
          <input type="file" name="file" onChange={handleFileChange}></input>
          <br />
          <div className="entry-buttons">
            <button onClick={handleUpload}>Upload</button>
            <button onClick={handleStart}>Start !</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
