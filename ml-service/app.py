from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
import joblib

app = Flask(__name__)

# Load model dan preprocessing
try:
    model = tf.keras.models.load_model("model_status_gizi.h5")
    scaler = joblib.load("scaler_gizi.pkl")
    encoder = joblib.load("label_encoder_gizi.pkl")
except Exception as e:
    raise RuntimeError(f"Error loading model or preprocessing tools: {e}")

@app.route("/", methods=["GET"])
def home():
    return "ML Service for Nutritional Status Prediction is Running!"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        # Ambil input dari request
        bb_dulu = data.get("bb_dulu")
        bb_sekarang = data.get("bb_sekarang")
        tinggi_badan = data.get("tinggi_badan")
        lila = data.get("lila")
        hb = data.get("hb")
        sistolik = data.get("sistolik")
        diastolik = data.get("diastolik")

        # Validasi input
        if None in [bb_dulu, bb_sekarang, tinggi_badan, lila, hb, sistolik, diastolik]:
            return jsonify({"error": "Semua fitur harus diisi."}), 400

        # Hitung IMT
        tinggi_m = tinggi_badan / 100
        imt = bb_sekarang / (tinggi_m ** 2)

        # Susun input sesuai urutan fitur model
        input_data = np.array([[bb_dulu, bb_sekarang, tinggi_badan, lila, hb, imt, sistolik, diastolik]])

        # Standarisasi
        input_scaled = scaler.transform(input_data)

        # Prediksi
        prediction = model.predict(input_scaled)
        pred_class = np.argmax(prediction, axis=1)
        label = encoder.inverse_transform(pred_class)[0]
        confidence = float(np.max(prediction))

        return jsonify({
            "prediction": label,
            "confidence": confidence
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
