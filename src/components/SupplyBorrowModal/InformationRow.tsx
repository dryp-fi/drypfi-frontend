type InformationRowProps = {
  label: string;
  value: string | number;
  isGreen?: boolean;
};

const InformationRow: React.FC<InformationRowProps> = ({
  label,
  value,
  isGreen = false,
}) => (
  <div className='flex items-center justify-between text-sm'>
    <p>{label}</p>
    <p className={isGreen ? 'text-green-600' : ''}>{value}</p>
  </div>
);

export default InformationRow;
