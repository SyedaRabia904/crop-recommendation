import React, { useState } from "react";
import "./App.css";
import PredictionForm from "./components/PredictionForm";
import Result from "./components/Result";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePredict = async (formData) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setError(data.error || "Prediction failed.");
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="background-leaf leaf-one">🌿</div>
      <div className="background-leaf leaf-two">🌱</div>

      <header className="top-header">
        <div className="brand">
          <div className="brand-logo">🌱</div>

          <div>
            <h2>AgriSmart</h2>
            <p>Better Crops • Brighter Future</p>
          </div>
        </div>

        <div className="header-badge">🌾 Smart Agriculture</div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">AI-POWERED FARMING</span>

          <h1>
            Grow Smarter.
            <br />
            <span>Choose the Right Crop.</span>
          </h1>

          <p>
            Discover the most suitable crop for your farm using soil nutrients,
            temperature, humidity, pH and rainfall conditions.
          </p>
        </div>
      </section>

      <main className="dashboard">
        <section className="card input-card">
          <div className="card-title">
            <div className="title-icon">🌱</div>

            <div>
              <h2>Enter Farm Details</h2>
              <p>Provide your soil and environmental information.</p>
            </div>
          </div>

          <PredictionForm
            onPredict={handlePredict}
            loading={loading}
          />

          {error && (
            <div className="error">
              <span>⚠️</span>

              <div>
                <strong>Prediction Error</strong>
                <p>{error}</p>
              </div>
            </div>
          )}
        </section>

        <section className="card recommendation-card">
          {loading && (
            <div className="loading-state">
              <div className="loading-icon">🌱</div>

              <h2>Analyzing Your Farm...</h2>

              <p>
                Our AI model is finding the most suitable crop for your
                conditions.
              </p>

              <div className="loading-line">
                <div></div>
              </div>
            </div>
          )}

          {!loading && !result && (
            <div className="empty-state">
              <div className="empty-image">🌾</div>

              <span className="small-heading">
                AI CROP RECOMMENDATION
              </span>

              <h2>
                Your recommendation
                <br />
                will appear here
              </h2>

              <p>
                Enter your farm details and receive an intelligent crop
                recommendation.
              </p>

              <div className="benefit-list">
                <div>
                  <span>✓</span> Soil-based analysis
                </div>

                <div>
                  <span>✓</span> Weather-based prediction
                </div>

                <div>
                  <span>✓</span> AI-powered recommendation
                </div>
              </div>
            </div>
          )}

          {!loading && result && (
            <Result
              crop={result.crop}
              confidence={result.confidence}
            />
          )}
        </section>
      </main>

      <section className="features">
        <div className="feature">
          <span>🌱</span>

          <div>
            <h3>Smart Suggestions</h3>
            <p>Data-driven crop recommendations</p>
          </div>
        </div>

        <div className="feature">
          <span>📊</span>

          <div>
            <h3>Better Decisions</h3>
            <p>Make informed farming choices</p>
          </div>
        </div>

        <div className="feature">
          <span>🌍</span>

          <div>
            <h3>Sustainable Farming</h3>
            <p>Efficient use of resources</p>
          </div>
        </div>

        <div className="feature">
          <span>🚜</span>

          <div>
            <h3>Future Ready</h3>
            <p>Technology for modern agriculture</p>
          </div>
        </div>
      </section>

      <footer>
        <p>AgriSmart • AI-Powered Crop Recommendation System</p>
      </footer>
    </div>
  );
}

export default App;