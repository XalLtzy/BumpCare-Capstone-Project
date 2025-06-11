from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
import joblib

app = Flask(__name__)

# Load model dan preprocessing gizi
try:
    model_gizi = tf.keras.models.load_model("model_status_gizi.h5")
    scaler_gizi = joblib.load("scaler_gizi.pkl")
    encoder_gizi = joblib.load("label_encoder_gizi.pkl")
except Exception as e:
    raise RuntimeError(f"Error loading nutrition model or preprocessing tools: {e}")

# Load model dan preprocessing risiko kehamilan
try:
    model_risiko = tf.keras.models.load_model("mental_health_risk_model_full.h5")
    scaler_risiko = joblib.load("scaler.pkl")
    encoder_risiko = joblib.load("label_encoder.pkl")
except Exception as e:
    raise RuntimeError(f"Error loading risk model or preprocessing tools: {e}")

@app.route("/", methods=["GET"])
def home():
    return "ML Service for Nutrition and Risk Classification is Running!"

# ------------------ PREDIKSI STATUS GIZI ------------------ #
@app.route("/predict", methods=["POST"])
def predict_nutrition():
    try:
        data = request.get_json()
        bb_dulu = data.get("bb_dulu")
        bb_sekarang = data.get("bb_sekarang")
        tinggi_badan = data.get("tinggi_badan")
        lila = data.get("lila")
        hb = data.get("hb")
        sistolik = data.get("sistolik")
        diastolik = data.get("diastolik")

        if None in [bb_dulu, bb_sekarang, tinggi_badan, lila, hb, sistolik, diastolik]:
            return jsonify({"error": "Semua fitur harus diisi."}), 400

        tinggi_m = tinggi_badan / 100
        imt = bb_sekarang / (tinggi_m ** 2)

        input_data = np.array([[bb_dulu, bb_sekarang, tinggi_badan, lila, hb, imt, sistolik, diastolik]])
        input_scaled = scaler_gizi.transform(input_data)

        prediction = model_gizi.predict(input_scaled)
        pred_class = np.argmax(prediction, axis=1)
        label = encoder_gizi.inverse_transform(pred_class)[0]
        confidence = float(np.max(prediction))

        print("Gizi - Prediction:", label)
        print("Gizi - Confidence:", confidence)

        return jsonify({
            "prediction": label,
            "confidence": confidence
        })

    except Exception as e:
        print("Error gizi:", str(e))
        return jsonify({"error": str(e)}), 500

# ------------------ PREDIKSI RISIKO KEHAMILAN ------------------ #
@app.route("/predict-risk", methods=["POST"])
def predict_risk():
    try:
        data = request.get_json()
        print("Risk - Data diterima:", data)

        age = data.get("age")
        systolic = data.get("systolic_bp")
        diastolic = data.get("diastolic")
        bs = data.get("bs")
        body_temp = data.get("body_temp")
        bmi = data.get("bmi")
        prev_comp = data.get("previous_complications")
        diabetes_pre = data.get("preexisting_diabetes")
        diabetes_gest = data.get("gestational_diabetes")
        mental_health = data.get("mental_health")
        heart_rate = data.get("heart_rate")

        if None in [
            age, systolic, diastolic, bs, body_temp, bmi,
            prev_comp, diabetes_pre, diabetes_gest, mental_health, heart_rate
        ]:
            return jsonify({"error": "Semua fitur risiko kehamilan harus diisi."}), 400

        bmi = float(bmi)  # pastikan BMI berbentuk float

        input_data = np.array([[age, systolic, diastolic, bs, body_temp, bmi,
                                prev_comp, diabetes_pre, diabetes_gest, mental_health, heart_rate]])
        input_scaled = scaler_risiko.transform(input_data)

        prediction = model_risiko.predict(input_scaled)
        pred_class = np.argmax(prediction, axis=1)
        label = encoder_risiko.inverse_transform(pred_class)[0]
        confidence = float(np.max(prediction))

        print("Risk - Prediction:", label)
        print("Risk - Confidence:", confidence)

        return jsonify({
            "prediction": label,
            "confidence": confidence
        })

    except Exception as e:
        print("Error risiko:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
