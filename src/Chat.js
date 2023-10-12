import React, { useState } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSendMessage = () => {
    if (question.trim() !== "") {
      const newMessage = { text: question, user: true };

      setMessages((prevMessages) => [
        ...prevMessages,
        newMessage,
        { text: 'Loading...', user: false },
      ]);

      const sendData = { question };

      fetch("http://localhost:5000/question", {
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
            updatedMessages[updatedMessages.length - 1] = { text: data.message, user: false };
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
    <div>
      <h1>Welcome</h1>
      <div>
        {messages.map((eachMessage, index) => (
          <p key={index}>{eachMessage.text}</p>
        ))}
      </div>

      <input type="text" value={question} onChange={handleInputChange} />
      <button onClick={handleSendMessage}>Send Message</button>

      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Chat;
