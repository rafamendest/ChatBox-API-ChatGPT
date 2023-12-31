import React from "react";
import { useState } from "react";
import { ChatGPT } from "../services/apis.js";

const ChatBox = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmitQuestion = async (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      setLoading(true);

      // const params = {
      //   model: "text-davinci-003",
      //   prompt: e.target.value,
      //   max_tokens: 56,
      //   temperature: 0,
      // };

      const params = {
        prompt: e.target.value,
        n: 2,
        size: "1024x1024",
      };

      try {
        // const response = await ChatGPT.post("https://api.openai.com/v1/completions", params);
        const response = await ChatGPT.post(
          "https://api.openai.com/v1/images/generations",
          params
        );

        window.open(response.data.data[0].url, '_blank');
        
        setData(response.data.choices[0].text);
      } catch (err) {
        console.error(err);
      } finally {
        e.target.value = "";
        setLoading(false);
      }
    }
  };

  return (
    <>
      <textarea
        className="answer-box"
        id="answer-box"
        value={loading ? "Carregando..." : data}
      />
      
      <textarea
        className="text-box"
        id="text-box"
        placeholder="Escreva alguma coisa..."
        onKeyDown={(e) => handleSubmitQuestion(e)}
      />
    </>
  );
};

export default ChatBox;
