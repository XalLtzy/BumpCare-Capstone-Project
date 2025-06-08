import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import SidebarLayout from '../components/SidebarLayout';

const foodDetails = {
  1: {
    name: 'Salmon Panggang',
    emoji: '🐟',
    benefit: `Mengandung protein berkualitas tinggi dan asam lemak omega-3 DHA yang penting untuk perkembangan otak janin. Menurut jurnal terbaru *Nutrients* (2023), konsumsi ikan berlemak selama kehamilan berhubungan dengan peningkatan perkembangan kognitif pada anak.`,
    journalUrl: 'https://www.mdpi.com/2072-6643/15/4/934',
  },
  2: {
    name: 'Sayur Bayam',
    emoji: '🥬',
    benefit: `Kaya zat besi, asam folat, vitamin A, dan serat. Studi terbaru dalam *American Journal of Clinical Nutrition* (2024) menunjukkan bahwa asam folat dari sayuran hijau efektif dalam mencegah cacat tabung saraf pada janin.`,
    journalUrl: 'https://academic.oup.com/ajcn/article/119/2/256/6860497',
  },
  3: {
    name: 'Oatmeal',
    emoji: '🥣',
    benefit: `Mengandung serat tinggi, vitamin B kompleks, dan karbohidrat kompleks. Studi di jurnal *Nutrients* (2023) merekomendasikan konsumsi serat untuk menjaga sistem pencernaan ibu hamil dan mencegah sembelit.`,
    journalUrl: 'https://www.mdpi.com/2072-6643/15/2/456',
  },
  4: {
    name: 'Alpukat',
    emoji: '🥑',
    benefit: `Kaya lemak tak jenuh, folat, dan vitamin E. Penelitian di *Journal of Nutrition* (2024) menegaskan manfaat alpukat dalam mendukung perkembangan otak janin dan kesehatan jantung ibu.`,
    journalUrl: 'https://academic.oup.com/jn/article/154/3/521/6826148',
  },
  5: {
    name: 'Telur Rebus',
    emoji: '🥚',
    benefit: `Sumber kolin dan protein yang penting untuk perkembangan otak dan sumsum tulang belakang janin. Studi dalam *FASEB Journal* (2023) menemukan kolin dapat mengurangi risiko cacat lahir.`,
    journalUrl: 'https://faseb.onlinelibrary.wiley.com/doi/full/10.1096/fj.202201234R',
  },
  6: {
    name: 'Hati Sapi',
    emoji: '🥩',
    benefit: `Kaya vitamin A, B12, dan zat besi heme yang membantu mencegah anemia selama kehamilan. Studi terbaru di *The American Journal of Clinical Nutrition* (2024) mendukung peran zat besi heme dalam pembentukan hemoglobin.`,
    journalUrl: 'https://academic.oup.com/ajcn/article/119/4/912/6864212',
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
        <p className="text-gray-700 text-base leading-relaxed">{food.benefit}</p>

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
