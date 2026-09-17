import React from "react";

function Result({ crop, confidence }) {
  return (
    <div className="result-content">
      <span className="small-heading">🌿 RECOMMENDED CROP</span>

      <div className="crop-visual">
        <span>🌾</span>
      </div>

      <h2 className="recommended-crop">{crop}</h2>

      {confidence !== null && confidence !== undefined && (
        <div className="confidence-badge">
          🎯 Confidence: {Number(confidence).toFixed(2)}%
        </div>
      )}

      <p className="result-description">
        Based on the provided soil and environmental conditions, this crop
        appears to be a suitable recommendation for your farm.
      </p>

      <div className="why-card">
        <h3>🌱 Why this recommendation?</h3>

        <p>✓ Matches the provided soil nutrient values</p>
        <p>✓ Considers temperature and humidity</p>
        <p>✓ Considers soil pH and rainfall</p>
        <p>✓ Generated using a trained machine-learning model</p>
      </div>

      <div className="result-footer">
        <span>🌍</span>
        <p>Smart farming starts with informed decisions.</p>
      </div>
    </div>
  );
}

export default Result;