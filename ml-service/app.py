from flask import Flask, request, jsonify
import numpy as np
import pandas as pd  
import joblib
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__)

# ------------------ MODEL TANPA TENSORFLOW ------------------ #
# Kedua model adalah Sequential: Dense(relu) -> Dense(relu) -> Dense(softmax).
# Dropout hanya aktif saat pelatihan, jadi saat prediksi tidak dihitung.
# Bobot diekspor dari file .h5 ke weights.npz lewat convert_weights.py.
_weights = np.load(os.path.join(BASE_DIR, "weights.npz"))


def _muat_layer(prefix):
    n = int(_weights[prefix + "_n"])
    return [(_weights[f"{prefix}_W{i}"].astype(np.float32),
             _weights[f"{prefix}_b{i}"].astype(np.float32)) for i in range(n)]


class ModelNumpy:
    def __init__(self, layers):
        self.layers = layers

    def predict(self, x):
        x = np.asarray(x, dtype=np.float32)
        for i, (W, b) in enumerate(self.layers):
            x = x @ W + b
            if i < len(self.layers) - 1:
                x = np.maximum(x, 0.0)  # ReLU
        x = x - x.max(axis=1, keepdims=True)  # softmax yang stabil
        e = np.exp(x)
        return e / e.sum(axis=1, keepdims=True)


# Load model dan preprocessing gizi
try:
    model_gizi = ModelNumpy(_muat_layer("gizi"))
    scaler_gizi = joblib.load(os.path.join(BASE_DIR, "scaler_gizi.pkl"))
    encoder_gizi = joblib.load(os.path.join(BASE_DIR, "label_encoder_gizi.pkl"))
except Exception as e:
    raise RuntimeError(f"Error loading nutrition model or preprocessing tools: {e}")

# Load model dan preprocessing risiko kehamilan
try:
    model_risiko = ModelNumpy(_muat_layer("risiko"))
    scaler_risiko = joblib.load(os.path.join(BASE_DIR, "scaler.pkl"))
    encoder_risiko = joblib.load(os.path.join(BASE_DIR, "label_encoder.pkl"))
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

        columns = ['bb_dulu', 'bb_sekarang', 'tinggi_badan', 'lila', 'hb', 'IMT', 'sistolik', 'diastolik']
        input_df = pd.DataFrame([[bb_dulu, bb_sekarang, tinggi_badan, lila, hb, imt, sistolik, diastolik]], columns=columns)
        input_scaled = scaler_gizi.transform(input_df)

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

        bmi = float(bmi)

        columns = [
            'Age', 'Systolic BP', 'Diastolic', 'BS', 'Body Temp', 'BMI',
            'Previous Complications', 'Preexisting Diabetes',
            'Gestational Diabetes', 'Mental Health', 'Heart Rate'
        ]

        input_data = [[age, systolic, diastolic, bs, body_temp, bmi,
                       prev_comp, diabetes_pre, diabetes_gest, mental_health, heart_rate]]
        input_df = pd.DataFrame(input_data, columns=columns)

        input_scaled = scaler_risiko.transform(input_df)

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