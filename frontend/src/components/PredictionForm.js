import React, { useState } from "react";

function PredictionForm({ onPredict, loading }) {
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onPredict(formData);
  };

  return (
    <form className="prediction-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="nitrogen">🌿 Nitrogen (N)</label>
        <input
          id="nitrogen"
          name="nitrogen"
          type="number"
          step="any"
          placeholder="e.g. 90"
          value={formData.nitrogen}
          onChange={handleChange}
          required
        />
        <small>Soil nitrogen level</small>
      </div>

      <div className="form-group">
        <label htmlFor="phosphorus">🧪 Phosphorus (P)</label>
        <input
          id="phosphorus"
          name="phosphorus"
          type="number"
          step="any"
          placeholder="e.g. 42"
          value={formData.phosphorus}
          onChange={handleChange}
          required
        />
        <small>Soil phosphorus level</small>
      </div>

      <div className="form-group">
        <label htmlFor="potassium">🌱 Potassium (K)</label>
        <input
          id="potassium"
          name="potassium"
          type="number"
          step="any"
          placeholder="e.g. 43"
          value={formData.potassium}
          onChange={handleChange}
          required
        />
        <small>Soil potassium level</small>
      </div>

      <div className="form-group">
        <label htmlFor="temperature">🌡️ Temperature (°C)</label>
        <input
          id="temperature"
          name="temperature"
          type="number"
          step="any"
          placeholder="e.g. 25"
          value={formData.temperature}
          onChange={handleChange}
          required
        />
        <small>Current temperature</small>
      </div>

      <div className="form-group">
        <label htmlFor="humidity">💧 Humidity (%)</label>
        <input
          id="humidity"
          name="humidity"
          type="number"
          step="any"
          placeholder="e.g. 60"
          value={formData.humidity}
          onChange={handleChange}
          required
        />
        <small>Air humidity percentage</small>
      </div>

      <div className="form-group">
        <label htmlFor="ph">⚗️ pH Value</label>
        <input
          id="ph"
          name="ph"
          type="number"
          step="any"
          placeholder="e.g. 6.5"
          value={formData.ph}
          onChange={handleChange}
          required
        />
        <small>Soil acidity level</small>
      </div>

      <div className="form-group full-width">
        <label htmlFor="rainfall">🌧️ Rainfall (mm)</label>
        <input
          id="rainfall"
          name="rainfall"
          type="number"
          step="any"
          placeholder="e.g. 200"
          value={formData.rainfall}
          onChange={handleChange}
          required
        />
        <small>Expected rainfall amount</small>
      </div>

      <button className="predict-button" type="submit" disabled={loading}>
        {loading ? "Analyzing..." : "🌱 Get Crop Recommendation →"}
      </button>

      <p className="privacy-note">🔒 Your farm data is used only for prediction.</p>
    </form>
  );
}

export default PredictionForm;