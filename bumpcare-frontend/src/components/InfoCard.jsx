export default function InfoCard({ label, value, icon }) {
  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-lg border border-[#E53888] hover:shadow-xl transition cursor-default">
      {icon}
      <p className="text-sm sm:text-md text-[#AC1754] font-semibold mb-1">{label}</p>
      <p className="text-xl sm:text-2xl font-extrabold">{value}</p>
    </div>
  );
}
