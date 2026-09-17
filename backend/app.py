from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import os

print("APP.PY IS RUNNING")

app = Flask(__name__)
CORS(app)

# Get the folder where app.py is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load model and scaler
model_path = os.path.join(BASE_DIR, "best_crop_model.pkl")
scaler_path = os.path.join(BASE_DIR, "feature_scaler.pkl")

with open(model_path, "rb") as f:
    model = pickle.load(f)

with open(scaler_path, "rb") as f:
    scaler = pickle.load(f)


@app.route("/api/")
def home():
    return jsonify({
        "message": "Crop Recommendation API is running!"
    })


@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        # Extract values
        N = float(data["nitrogen"])
        P = float(data["phosphorus"])
        K = float(data["potassium"])
        Temperature = float(data["temperature"])
        Humidity = float(data["humidity"])
        pH = float(data["ph"])
        Rainfall = float(data["rainfall"])

        # Create input array
        input_data = np.array([[
            N,
            P,
            K,
            Temperature,
            Humidity,
            pH,
            Rainfall
        ]])

        # Scale input
        input_scaled = scaler.transform(input_data)

        # Predict
        prediction = model.predict(input_scaled)[0]

        # Confidence
        try:
            proba = model.predict_proba(input_scaled)[0]
            confidence = float(max(proba) * 100)
        except Exception:
            confidence = None

        return jsonify({
            "crop": str(prediction).upper(),
            "confidence": confidence
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 400


if __name__ == "__main__":
    app.run(debug=True, port=5000)
