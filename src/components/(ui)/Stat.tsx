import { IoMdInformationCircle } from 'react-icons/io';
import { Tooltip } from '@mui/material';

type StatProps = {
  label: string;
  value: string | number;
  valueColor?: string;
  description: string;
};

const Stat: React.FC<StatProps> = ({
  label,
  value,
  valueColor = 'text-white',
  description,
}) => (
  <div>
    <div className='flex items-center gap-2'>
      <p className='text-[#707070]'>{label}</p>
      <Tooltip title={description} placement='right'>
        <div>
          <IoMdInformationCircle className='cursor-pointer text-gray-500 ' />
        </div>
      </Tooltip>
    </div>
    <p className={`font-semibold ${valueColor} text-xl mt-1`}>{value}</p>
  </div>
);

export default Stat;
