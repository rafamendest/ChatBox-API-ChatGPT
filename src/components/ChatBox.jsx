import React from "react";
import { useState } from "react";
import { Client } from "../services/apis.js";

const ChatBox = () => {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSubmitQuestion = async (e) => {

    if (e.keyCode === 13 && e.shiftKey === false) {

      setLoading(true);
      
      const params = {
        model: "text-davinci-003",
        prompt: e.target.value,
        max_tokens: 56,
        temperature: 0,
      };

      try {
        await Client.post("https://api.openai.com/v1/completions", params)
        .then((result) => {
          setData(result.data.choices[0].text);
        })
        .catch((err) => console.log(err));
      } catch (err) {
        console.error(err);
      } finally {
        e.target.value = '';
        setLoading(false);
      }
      
    }
  };

  return (
    <>
      <textarea className="answer-box" id="answer-box" value={loading ? 'Carregando...' : data}/>

      <textarea
        className="text-box"
        id="text-box"
        placeholder="Escreva alguma coisa"
        onKeyDown={(e) => handleSubmitQuestion(e)}
      />
    </>
  );
};

export default ChatBox;
