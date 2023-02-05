import React, { useEffect } from "react";
import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";


function App() {
  const [image, setImage] = useState('');
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState();

  const configuration = new Configuration({
    organization: "org-hre4iCZiO6UulCx0qBMoFZeh",
    apiKey: process.env.REACT_APP_OPENAI_KEY,
  });

  const openai = new OpenAIApi(configuration);


  const generateImage = async () => {
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    setImage(res.data.data[0].url);
    setPrompt('');
  };



  return (
    <div className="app-main">
      <h1>Generate a Personalised Design</h1>
      <input 
        type="text" 
        className="app-input" 
        placeholder="Type something to Generate an Image..."
        onChange={(e)=>setPrompt(e.target.value)} 
        required />
      <br />
      <button onClick={generateImage}>Generate an Image</button>

      {image.length > 0 ? <img className="image" src={image || ""} alt="Generated image" /> : " "}
    </div>
  );
}

export default App;
