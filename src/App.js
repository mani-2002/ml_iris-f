import React, { useState } from "react";
import axios from "axios";

function App() {
  const [inputs, setInputs] = useState({
    SepalLengthCm: "",
    SepalWidthCm: "",
    PetalLengthCm: "",
    PetalWidthCm: ""
  });

  const [prediction, setPrediction] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/predict", inputs);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error in prediction request", error);
    }
  };

  return (
    <div className="App">
      <h2>Iris Flower Prediction</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Sepal Length (cm):</label>
          <input
            type="number"
            name="SepalLengthCm"
            value={inputs.SepalLengthCm}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Sepal Width (cm):</label>
          <input
            type="number"
            name="SepalWidthCm"
            value={inputs.SepalWidthCm}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Petal Length (cm):</label>
          <input
            type="number"
            name="PetalLengthCm"
            value={inputs.PetalLengthCm}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Petal Width (cm):</label>
          <input
            type="number"
            name="PetalWidthCm"
            value={inputs.PetalWidthCm}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Predict</button>
      </form>

      {prediction && (
        <div>
          <h3>Prediction: {prediction}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
