type BackdropProp = {
  onClose?: () => void;
};

const Backdrop: React.FC<BackdropProp> = ({ onClose }) => {
  return (
    <div
      onClick={onClose}
      className='h-[100vh] w-[100vw] fixed bg-[#00000070] top-0 left-0 z-20'
    />
  );
};

export default Backdrop;
