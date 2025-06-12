import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import SidebarLayout from '../components/SidebarLayout';

const foodDetails = {
  1: {
    name: 'Salmon Panggang',
    emoji: '🐟',
    benefit: `Mengandung protein berkualitas tinggi dan asam lemak omega-3 DHA yang penting untuk perkembangan otak janin. Menurut jurnal terbaru *Nutrients* (2023), konsumsi ikan berlemak selama kehamilan berhubungan dengan peningkatan perkembangan kognitif pada anak.`,
    journalUrl: 'https://ejournal.poltekkes-smg.ac.id/ojs/index.php/LIK/article/view/9265',
    nutrition: {
      kalori: '206 kkal',
      protein: '22 g',
      lemak: '12 g (omega-3 tinggi)',
      karbohidrat: '0 g',
    },
  },
  2: {
    name: 'Sayur Bayam',
    emoji: '🥬',
    benefit: `Kaya zat besi, asam folat, vitamin A, dan serat. Studi terbaru menunjukkan bahwa asam folat dari sayuran hijau efektif dalam mencegah cacat tabung saraf pada janin.`,
    journalUrl: 'https://ejurnalmalahayati.ac.id/index.php/PERAKMALAHAYATI/article/view/10181',
    nutrition: {
      kalori: '23 kkal',
      protein: '2.9 g',
      lemak: '0.4 g',
      karbohidrat: '3.6 g',
    },
  },
  3: {
    name: 'Oatmeal',
    emoji: '🥣',
    benefit: `Mengandung serat tinggi, vitamin B kompleks, dan karbohidrat kompleks. Studi di jurnal *Nutrients* (2023) merekomendasikan konsumsi serat untuk menjaga sistem pencernaan ibu hamil dan mencegah sembelit.`,
    journalUrl: 'https://www.jurnalindo.com/manfaat-untuk-ibu-hamil/manfaat-oatmeal-untuk-ibu-hamil-yang-jarang-diketahui/',
    nutrition: {
      kalori: '150 kkal',
      protein: '5 g',
      lemak: '2.5 g',
      karbohidrat: '27 g',
    },
  },
  4: {
    name: 'Alpukat',
    emoji: '🥑',
    benefit: `Kaya lemak tak jenuh, folat, dan vitamin E. Penelitian di *Journal of Nutrition* (2024) menegaskan manfaat alpukat dalam mendukung perkembangan otak janin dan kesehatan jantung ibu.`,
    journalUrl: 'https://puskesmaskuripan-dikes.lombokbaratkab.go.id/artikel/manfaat-alpukat-untuk-ibu-hamil-sumber-nutrisi-sehat-untuk-janin/',
    nutrition: {
      kalori: '160 kkal',
      protein: '2 g',
      lemak: '15 g (lemak sehat)',
      karbohidrat: '9 g',
    },
  },
  5: {
    name: 'Telur Rebus',
    emoji: '🥚',
    benefit: `Sumber kolin dan protein yang penting untuk perkembangan otak dan sumsum tulang belakang janin. Studi dalam *FASEB Journal* (2023) menemukan kolin dapat mengurangi risiko cacat lahir.`,
    journalUrl: 'https://jurnal.stikesalmaarif.ac.id/index.php/cendekia_medika/article/view/257?articlesBySimilarityPage=4',
    nutrition: {
      kalori: '77 kkal',
      protein: '6.3 g',
      lemak: '5.3 g',
      karbohidrat: '0.6 g',
    },
  },
  6: {
    name: 'Hati Sapi',
    emoji: '🥩',
    benefit: `Kaya vitamin A, B12, dan zat besi heme yang membantu mencegah anemia selama kehamilan. Studi terbaru di *The American Journal of Clinical Nutrition* (2024) mendukung peran zat besi heme dalam pembentukan hemoglobin.`,
    journalUrl: 'https://academic.oup.com/ajcn/article/119/4/912/6864212',
    nutrition: {
      kalori: '175 kkal',
      protein: '27 g',
      lemak: '5 g',
      karbohidrat: '3.8 g',
    },
  },
};

export default function FoodDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const food = foodDetails[id];

  useEffect(() => {
    if (!food) navigate('/');
  }, [food, navigate]);

  if (!food) return null;

  return (
    <SidebarLayout>
      <main className="max-w-2xl mx-auto p-6 md:p-10 bg-[#FFDCDC] mt-10 rounded-2xl shadow-md">
        <div className="text-5xl mb-4 text-center">{food.emoji}</div>
        <h1 className="text-2xl font-bold text-[#AC1754] mb-4 text-center">{food.name}</h1>
        <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line">{food.benefit}</p>

        {food.nutrition && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-[#AC1754] mb-2">Kandungan Gizi (per porsi):</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li><strong>Kalori:</strong> {food.nutrition.kalori}</li>
              <li><strong>Protein:</strong> {food.nutrition.protein}</li>
              <li><strong>Lemak:</strong> {food.nutrition.lemak}</li>
              <li><strong>Karbohidrat:</strong> {food.nutrition.karbohidrat}</li>
            </ul>
          </div>
        )}

        <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-4">
          {food.journalUrl && (
            <a
              href={food.journalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#AC1754] text-white px-6 py-2 rounded-full hover:bg-pink-700 transition w-full md:w-auto text-center"
            >
              Baca Jurnal
            </a>
          )}
          <button
            onClick={() => navigate(-1)}
            className="bg-[#AC1754] text-white px-6 py-2 rounded-full hover:bg-pink-700 transition w-full md:w-auto text-center"
          >
            Kembali
          </button>
        </div>
      </main>
    </SidebarLayout>
  );
}