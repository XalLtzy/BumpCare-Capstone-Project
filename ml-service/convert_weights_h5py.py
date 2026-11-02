"""
Ekspor bobot dari file .h5 ke weights.npz TANPA TensorFlow (hanya h5py + numpy).

Pasang dulu (sekali):   pip install h5py numpy
Jalankan di folder ml-service:   python convert_weights_h5py.py
"""
import numpy as np
import h5py

# nama_model: (berkas .h5, jumlah fitur input, jumlah kelas output)
MODEL = {
    "gizi": ("model_status_gizi.h5", 8, 4),
    "risiko": ("mental_health_risk_model_full.h5", 11, 2),
}


def _teks(x):
    return x.decode("utf-8") if isinstance(x, bytes) else str(x)


def baca_layer_dense(berkas):
    """Mengembalikan [(W, b), ...] berurutan sesuai urutan layer di model."""
    pasangan = []
    with h5py.File(berkas, "r") as f:
        grup = f["model_weights"]
        for nama_layer in grup.attrs["layer_names"]:
            nama_layer = _teks(nama_layer)
            g = grup[nama_layer]
            nama_bobot = [_teks(n) for n in g.attrs.get("weight_names", [])]
            if not nama_bobot:  # layer tanpa bobot (Dropout / InputLayer)
                continue
            kernel = bias = None
            for n in nama_bobot:
                data = np.array(g[n])
                if "kernel" in n:
                    kernel = data
                elif "bias" in n:
                    bias = data
            assert kernel is not None and bias is not None, \
                f"Layer {nama_layer} bukan Dense biasa (bobot: {nama_bobot})"
            pasangan.append((kernel.astype(np.float32), bias.astype(np.float32)))
    return pasangan


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
for nama, (berkas, n_in, n_out) in MODEL.items():
    pasangan = baca_layer_dense(berkas)
    # Pemeriksaan bentuk: rantai dimensi harus nyambung dan sesuai harapan
    assert pasangan[0][0].shape[0] == n_in, f"{nama}: input {pasangan[0][0].shape[0]}, seharusnya {n_in}"
    assert pasangan[-1][0].shape[1] == n_out, f"{nama}: output {pasangan[-1][0].shape[1]}, seharusnya {n_out}"
    for (W1, _), (W2, _) in zip(pasangan, pasangan[1:]):
        assert W1.shape[1] == W2.shape[0], f"{nama}: dimensi antar layer tidak nyambung"
    for i, (W, b) in enumerate(pasangan):
        simpan[f"{nama}_W{i}"], simpan[f"{nama}_b{i}"] = W, b
    simpan[f"{nama}_n"] = np.array(len(pasangan))

    p = numpy_forward(np.random.RandomState(0).randn(50, n_in), pasangan)
    assert np.allclose(p.sum(axis=1), 1, atol=1e-4) and np.isfinite(p).all()
    dims = [pasangan[0][0].shape[0]] + [W.shape[1] for W, _ in pasangan]
    print(f"{nama}: dimensi {' -> '.join(map(str, dims))}  OK")

np.savez("weights.npz", **simpan)
print("Selesai: weights.npz dibuat.")