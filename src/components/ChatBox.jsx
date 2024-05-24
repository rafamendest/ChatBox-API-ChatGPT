import React from "react";
import { useState } from "react";
import OpenAI from "openai";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ChatBox = () => {
  const [data, setData] = useState("");
  const [optionSelect, setOptionSelect] = useState("textGeneration");
  const [loading, setLoading] = useState(false);
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_CHATGPT_KEY,
    dangerouslyAllowBrowser: true,
  });
  const textGeneration = (e) => {
    return {
      model: "gpt-3.5-turbo-instruct",
      prompt: e.target.value,
      max_tokens: 1000,
    };
  };
  const imageGeneration = (e) => {
    return {
      model: "dall-e-3",
      prompt: e.target.value,
      n: 1,
      size: "1024x1024",
    };
  };

  const handleSubmitQuestion = async (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      setLoading(true);
      try {
        if (optionSelect === "textGeneration") {
          const completion = await openai.completions.create(textGeneration(e));
          setData(completion.choices[0].text);
          return;
        }
        const response = await openai.images.generate(imageGeneration(e));
        window.open(response.data[0].url, "_blank");
        setData("");
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

      <Box display="flex" width="80%" margin="auto">
        <textarea
          className="text-box"
          id="text-box"
          placeholder="Escreva alguma coisa..."
          onKeyDown={(e) => handleSubmitQuestion(e)}
        />
        <Box marginLeft="100px" width="220px">
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="textGeneration"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="textGeneration"
                control={<Radio />}
                label={
                  <Typography variant="body1" style={{ fontSize: "3rem" }}>
                    Texto
                  </Typography>
                }
                onChange={(e) => setOptionSelect(e.target.value)}
              />
              <FormControlLabel
                value="imageGeneration"
                control={<Radio />}
                label={
                  <Typography variant="body1" style={{ fontSize: "3rem" }}>
                    Imagem
                  </Typography>
                }
                onChange={(e) => setOptionSelect(e.target.value)}
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
    </>
  );
};

export default ChatBox;
