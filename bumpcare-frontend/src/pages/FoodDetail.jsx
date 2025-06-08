import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import SidebarLayout from '../components/SidebarLayout';

const foodDetails = {
  1: {
    name: 'Salmon Panggang',
    emoji: '🐟',
    benefit: `Mengandung protein berkualitas tinggi dan asam lemak omega-3 DHA yang penting untuk perkembangan otak janin. Menurut jurnal *Nutrients* (2015), konsumsi ikan berlemak selama kehamilan berhubungan dengan perkembangan kognitif yang lebih baik pada anak.`,
  },
  2: {
    name: 'Sayur Bayam',
    emoji: '🥬',
    benefit: `Kaya zat besi, asam folat, vitamin A, dan serat. Menurut *American Journal of Clinical Nutrition*, asam folat dari sayuran hijau membantu mencegah cacat tabung saraf pada janin.`,
  },
  3: {
    name: 'Oatmeal',
    emoji: '🥣',
    benefit: `Mengandung serat tinggi, vitamin B kompleks, dan energi dari karbohidrat kompleks. Ideal untuk mencegah sembelit dan menjaga energi. Jurnal *Nutrients* (2019) menyarankan serat untuk mendukung sistem pencernaan ibu hamil.`,
  },
  4: {
    name: 'Alpukat',
    emoji: '🥑',
    benefit: `Kaya lemak tak jenuh, folat, dan vitamin E. Alpukat membantu perkembangan otak janin dan kesehatan jantung ibu. Studi dalam *Journal of the American College of Nutrition* menekankan manfaat asam lemak oleat pada kehamilan.`,
  },
  5: {
    name: 'Telur Rebus',
    emoji: '🥚',
    benefit: `Sumber kolin dan protein. Kolin penting untuk perkembangan otak dan sumsum tulang belakang janin. Menurut *FASEB Journal*, kolin mengurangi risiko cacat lahir.`,
  },
  6: {
    name: 'Hati Sapi',
    emoji: '🥩',
    benefit: `Kaya vitamin A, B12, dan zat besi heme. Baik untuk mencegah anemia. Namun harus dikonsumsi dalam jumlah wajar. Studi dalam *The American Journal of Clinical Nutrition* menjelaskan peran zat besi heme dalam pembentukan hemoglobin.`,
  },
};

export default function FoodDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const food = foodDetails[id];

  useEffect(() => {
    if (!food) navigate('/'); // jika tidak ditemukan, redirect
  }, [food, navigate]);

  if (!food) return null;

  return (
    <SidebarLayout>
      <main className="max-w-2xl mx-auto p-6 md:p-10 bg-[#FFDCDC] mt-10 rounded-2xl shadow-md">
        <div className="text-5xl mb-4 text-center">{food.emoji}</div>
        <h1 className="text-2xl font-bold text-[#AC1754] mb-4 text-center">{food.name}</h1>
        <p className="text-gray-700 text-base leading-relaxed">{food.benefit}</p>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigate(-1)}
            className="bg-[#AC1754] text-white px-6 py-2 rounded-full hover:bg-pink-700 transition"
          >
            Kembali
          </button>
        </div>
      </main>
    </SidebarLayout>
  );
}
