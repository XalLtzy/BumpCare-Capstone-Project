import ReactMarkdown from 'react-markdown';
import { FaExclamationTriangle, FaSmile, FaExclamationCircle } from 'react-icons/fa';

const statusStyle = {
  'Gizi Kurang': {
    icon: <FaExclamationTriangle className="text-yellow-600 w-6 h-6" />,
    color: 'bg-yellow-50 border-yellow-300 text-yellow-800',
  },
  'Gizi Normal': {
    icon: <FaSmile className="text-green-600 w-6 h-6" />,
    color: 'bg-green-50 border-green-300 text-green-800',
  },
  'Gizi Lebih': {
    icon: <FaExclamationCircle className="text-red-600 w-6 h-6" />,
    color: 'bg-red-50 border-red-300 text-red-800',
  },
};

export default function DeskripsiGiziCard({ status, markdown }) {
  const style = statusStyle[status] || statusStyle['Gizi Normal'];

  return (
    <div className={`rounded-3xl p-6 shadow-xl border-2 ${style.color}`}>
      <div className="flex items-center gap-3 mb-4">
        {style.icon}
        <h2 className="text-xl font-extrabold text-[#AC1754]">
          Status Gizi: {status}
        </h2>
      </div>
      <div className="prose prose-sm max-w-none text-gray-800">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
}
