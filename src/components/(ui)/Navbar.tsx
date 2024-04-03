'use client';

const Navbar: React.FC = () => {
  return (
    <nav className='flex justify-between px-6 py-2 w-full items-center  text-white'>
      <p className='text-xl font-semibold'>Dryp.fi</p>

      <div className='flex gap-4 items-center'>
        <w3m-network-button />
        <w3m-button />
      </div>
    </nav>
  );
};

export default Navbar;
