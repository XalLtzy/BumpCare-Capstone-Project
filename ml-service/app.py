from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
import pickle

app = Flask(__name__)

model = tf.keras.models.load_model('model_status_gizi.h5')

with open('scaler_gizi.pkl', 'rb') as f:
    scaler = pickle.load(f)

with open('label_encoder_gizi.pkl', 'rb') as f:
    label_encoder = pickle.load(f)


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json  # ekspektasi: { "features": [value1, value2, ...] }
        features = np.array(data['features']).reshape(1, -1)

        # Preprocess input
        features_scaled = scaler.transform(features)

        # Prediksi
        preds = model.predict(features_scaled)
        class_idx = np.argmax(preds, axis=1)
        label = label_encoder.inverse_transform(class_idx)[0]

        # Probabilitas (optional)
        prob = preds[0][class_idx[0]]

        return jsonify({
            'status': 'success',
            'prediction': label,
            'probability': float(prob)
        })

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
