import ReactMarkdown from 'react-markdown';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const statusStyle = {
  'Risiko Tinggi': {
    icon: <FaExclamationTriangle className="text-red-600 w-6 h-6" />,
    color: 'bg-red-50 border-red-300 text-red-800',
  },
  'Risiko Rendah': {
    icon: <FaCheckCircle className="text-green-600 w-6 h-6" />,
    color: 'bg-green-50 border-green-300 text-green-800',
  },
};

export default function DeskripsiRisikoCard({ status, markdown }) {
  const style = statusStyle[status] || statusStyle['Risiko Rendah'];

  return (
    <div className={`rounded-3xl p-6 shadow-xl border-2 ${style.color}`}>
      <div className="flex items-center gap-3 mb-4">
        {style.icon}
        <h2 className="text-xl font-extrabold text-[#AC1754]">
          Status Kehamilan: {status}
        </h2>
      </div>
      <div className="prose prose-sm max-w-none text-gray-800">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
}
