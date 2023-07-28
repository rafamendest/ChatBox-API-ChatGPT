import axios from "axios";
import React from "react";
import { useState } from "react";

const ChatBox = () => {
  const [data, setData] = useState("");

  const handleSubmitQuestion = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      const client = axios.create({
        headers: { Authorization: `Bearer ${process.env.REACT_APP_CHATGPT_KEY}` },
      });
    
      const params = {
        model: "text-davinci-003",
        prompt: e.target.value,
        max_tokens: 56,
        temperature: 0,
      };
  
      client
      .post("https://api.openai.com/v1/completions", params)
      .then((result) => {
        setData(result.data.choices[0].text);
      })
      .catch((err) => console.log(err));  

    }
  }
  
  return (
    <>
      <textarea className="answer-box" id="answer-box" value={data}/>

      <textarea
        className="text-box"
        id="text-box"
        placeholder="pergunte algo..."
        onKeyDown={(e) => handleSubmitQuestion(e)}
      ></textarea>
    </>
  );
};

export default ChatBox;
