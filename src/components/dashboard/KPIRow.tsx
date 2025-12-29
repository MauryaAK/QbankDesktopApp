interface KPIRowProps {
  label: string;
  value: number | string;
}

const KPIRow: React.FC<KPIRowProps> = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-white/40 last:border-none">
      <span className="text-[11px] font-medium text-primary uppercase tracking-wide">
        {label}
      </span>

      <span className="text-sm font-semibold text-primary bg-white px-2 py-0.5 rounded-md">
        {value}
      </span>
    </div>
  );
};

export default KPIRow;
