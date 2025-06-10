from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
import joblib  
app = Flask(__name__)

# Load model dan preprocessing tools
scaler = joblib.load("scaler_gizi.pkl")
label_encoder = joblib.load("label_encoder_gizi.pkl")
model = tf.keras.models.load_model("model_status_gizi.h5")


@app.route('/predict', methods=['POST'])
def predict():
    try:
        print("Received JSON:", request.json)
        data = request.json  # Ekspektasi input: { "features": [val1, val2, ...] }
        features = np.array(data['features']).reshape(1, -1)

        # Preprocessing
        features_scaled = scaler.transform(features)

        # Prediksi
        preds = model.predict(features_scaled)
        class_idx = np.argmax(preds, axis=1)
        label = label_encoder.inverse_transform(class_idx)[0]

        # Ambil probabilitas prediksi (opsional)
        prob = float(preds[0][class_idx[0]])

        return jsonify({
            'status': 'success',
            'prediction': label,
            'probability': prob
        })

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
