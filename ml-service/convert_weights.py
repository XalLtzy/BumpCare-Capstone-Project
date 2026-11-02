"""
Jalankan SEKALI di komputer Anda (yang sudah ada TensorFlow), di dalam folder ml-service:

    python convert_weights.py

Hasilnya: weights.npz (bobot kedua model). Skrip juga membandingkan hasil
TensorFlow vs numpy pada data acak sebagai pemeriksaan.
"""
import numpy as np
import tensorflow as tf

MODEL = {
    "gizi": "model_status_gizi.h5",
    "risiko": "mental_health_risk_model_full.h5",
}


def numpy_forward(x, pasangan):
    x = x.astype(np.float32)
    for i, (W, b) in enumerate(pasangan):
        x = x @ W + b
        if i < len(pasangan) - 1:
            x = np.maximum(x, 0.0)
    x = x - x.max(axis=1, keepdims=True)
    e = np.exp(x)
    return e / e.sum(axis=1, keepdims=True)


simpan = {}
for nama, berkas in MODEL.items():
    m = tf.keras.models.load_model(berkas)
    layers = [l for l in m.layers if l.get_weights()]
    assert all(l.__class__.__name__ == "Dense" for l in layers), "Ada layer selain Dense!"
    pasangan = []
    for i, l in enumerate(layers):
        W, b = l.get_weights()
        simpan[f"{nama}_W{i}"], simpan[f"{nama}_b{i}"] = W, b
        pasangan.append((W, b))
    simpan[f"{nama}_n"] = np.array(len(layers))

    x = np.random.RandomState(0).randn(200, m.input_shape[1]).astype(np.float32)
    selisih = np.abs(m.predict(x, verbose=0) - numpy_forward(x, pasangan)).max()
    print(f"{nama}: {len(layers)} layer Dense | selisih maksimum TF vs numpy = {selisih:.2e}")
    assert selisih < 1e-4, "Hasil tidak sama, jangan dipakai!"

np.savez("weights.npz", **simpan)
print("Selesai: weights.npz dibuat.")