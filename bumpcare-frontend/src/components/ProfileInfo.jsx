export default function ProfileInfo({ icon, label, value }) {
  return (
    <div className="flex items-center space-x-3 bg-[#FFDCDC] rounded-xl p-3 sm:p-4 shadow-md border border-[#E53888]">
      <div>{icon}</div>
      <div>
        <p className="text-xs sm:text-sm font-semibold text-[#AC1754]">{label}</p>
        <p className="text-lg sm:text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}
