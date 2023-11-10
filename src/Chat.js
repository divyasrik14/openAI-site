import { SendOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React, { useState } from "react";
import { useRef, useEffect } from "react";
import { baseURL } from "./constants";

const Chat = () => {
  const messageContainerRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      text: "Hi, Welcome to SmartPDF , How can I help you ?",
      user: false,
    },
    {
      text: "I'm completely new to SmartPDF , Can you please guide me How to proceed",
      user: true,
    },
    {
      text: "Sure, SmartPDF as the name says, is a modern smart way to read PDFs, it works with AI. Come along with me and upload your pdfs, then i will provide answers for your every question. First of all make sure you have added the right PDF file. Then you will be directed to ths chat. i.e., chat page, Here just enter your questions in the bottom input field and thats it i will read the pdf and provide you the answers ",
      user: false,
    },
    {
      text: "Thank you !",
      user: true,
    },
    {
      text: "My pleasure, Shall we start now ?",
      user: false,
    },
  ]);
  const [question, setQuestion] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    // Scroll to the bottom when new messages are added
    messageContainerRef.current.scrollTop =
      messageContainerRef.current.scrollHeight;
  }, [messages]);

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSendMessage = () => {
    if (question.trim() !== "") {
      const newMessage = { text: question, user: true };

      setMessages((prevMessages) => [
        ...prevMessages,
        newMessage,
        { text: "Loading...", user: false },
      ]);

      const sendData = { question };

      fetch(`${baseURL}question`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(sendData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            updatedMessages[updatedMessages.length - 1] = {
              text: data.message,
              user: false,
            };
            return updatedMessages;
          });
        })
        .catch((err) => {
          setError(err.message);
        });

      setQuestion("");
    }
  };

  return (
    <div className="chat">
      <div className="entry-heading">
        <h3>SmartPDF - Your Questions, Our Answers</h3>
      </div>
      <div className="second-section">
        <div className="message-container" ref={messageContainerRef}>
          {messages.map((eachMessage, index) => (
            <div className={eachMessage.user ? "user" : "bot"} key={index}>
              <p>
                {eachMessage.user ? (
                  <Avatar
                    style={{ backgroundColor: "#369b5e", fontWeight: "bold" }}
                  >
                    U
                  </Avatar>
                ) : (
                  <Avatar
                    style={{ backgroundColor: "#725ba3", fontWeight: "bold" }}
                  >
                    B
                  </Avatar>
                )}
              </p>
              <p className="main-role" style={{ width: "100%" }}>
                {eachMessage.text}
              </p>
              {/* <hr /> */}
            </div>
          ))}
        </div>
      </div>

      <div className="third-section">
        <input
          type="text"
          value={question}
          onChange={handleInputChange}
          placeholder="Start Typing here..."
        />
        <button onClick={handleSendMessage}>
          <SendOutlined style={{ fontSize: "30px" }} />
        </button>
      </div>

      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Chat;
